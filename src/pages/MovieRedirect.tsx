import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

export const MovieRedirect = () => {
  const { id } = useParams();
  const externalStreamUrl = "https://getsuperembed.link";
  const initialSrc = `${externalStreamUrl}?video_id=${id}&tmdb=1`;
  const redirectUrl = "https://streamingnow.mov";
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const skipInitialRef = useRef(true);
  const redirectTriggeredRef = useRef(false);
  const loggedDocRef = useRef(false);

  useEffect(() => {
    console.log('render')
    const iframe: HTMLIFrameElement | null = iframeRef.current;
    if (!iframe?.contentDocument) return;
    console.log(iframe?.contentDocument)
    if (!iframe) return;

    // prevent multiple redirects
    redirectTriggeredRef.current = false;

    // Ensure we skip the mutation caused by setting the initial src on mount.
    skipInitialRef.current = true;

    const makeRedirect = (url: string) => {
      if (!url || redirectTriggeredRef.current) return;
      if (!url.startsWith(redirectUrl)) return;
      redirectTriggeredRef.current = true;
      try {
        window.location.href = url;
      } catch (e) {
        window.location.assign(url);
      }
    };

    const extractUrlFromDoc = (doc: any) => {
      try {
        if (!doc) return null;
        // Prefer location.href when same-origin
        if (doc.location && typeof doc.location.href === "string") {
          const href = doc.location.href;
          if (href && href.startsWith(redirectUrl)) return href;
        }

        // Otherwise inspect text content for the first occurrence of redirectUrl
        const text = doc.documentElement?.textContent || "";
        const idx = text.indexOf(redirectUrl);
        if (idx !== -1) {
          // extract until whitespace or quote or <
          const rest = text.slice(idx);
          const match = rest.match(/^[^\s'"<>]+/);
          if (match) return match[0];
        }
      } catch (e) {
        // access denied (cross-origin)
        return null;
      }
      return null;
    };

    const logIframeContent = (doc: any) => {
      if (!doc) return;
      try {
        const href = doc.location?.href || null;
        const html = doc.documentElement?.outerHTML || "";
        const text = doc.documentElement?.textContent || "";
        const max = 2000;
        console.debug("[MovieRedirect] iframe href:", href);
        console.debug(
          "[MovieRedirect] iframe html (truncated):",
          html.slice(0, max),
        );
        console.debug(
          "[MovieRedirect] iframe text (truncated):",
          text.slice(0, max),
        );
      } catch (e) {
        console.debug(
          "[MovieRedirect] cannot access iframe document (cross-origin)",
        );
      }
    };

    // Polling: sometimes the iframe updates its document after load; poll for a few seconds
    let pollHandle: any = null;
    const startPolling = (timeoutMs = 15000, intervalMs = 400) => {
      const start = Date.now();
      pollHandle = setInterval(() => {
        if (redirectTriggeredRef.current) return;
        try {
          const doc = iframe.contentDocument || iframe.contentWindow?.document;
          const found = extractUrlFromDoc(doc);
          if (doc && !loggedDocRef.current) {
            loggedDocRef.current = true;
            logIframeContent(doc);
          }
          if (found) {
            clearInterval(pollHandle);
            makeRedirect(found);
            return;
          }
        } catch (e) {
          // cross-origin: cannot access document
        }
        if (Date.now() - start > timeoutMs) {
          clearInterval(pollHandle);
        }
      }, intervalMs);
    };

    // Observe src attribute changes as a fallback: if parent changes src to target URL, redirect.
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "attributes" && m.attributeName === "src") {
          const newSrc = iframe.getAttribute("src");
          const oldSrc = m.oldValue;

          if (skipInitialRef.current) {
            skipInitialRef.current = false;
            continue;
          }

          if (newSrc && newSrc !== oldSrc) {
            console.debug("[MovieRedirect] iframe src changed:", {
              oldSrc,
              newSrc,
            });
            makeRedirect(newSrc);
          }
        }
      }
    });

    observer.observe(iframe, {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: ["src"],
    });

    // On iframe load, try to inspect the document immediately and start polling
    const onLoad = () => {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (doc) logIframeContent(doc);
        const found = extractUrlFromDoc(doc);
        if (found) {
          makeRedirect(found);
          return;
        }
      } catch (e) {
        // cross-origin
      }
      startPolling();
    };

    iframe.addEventListener("load", onLoad);

    // start an initial poll in case load already fired before listener added
    startPolling();

    return () => {
      observer.disconnect();
      iframe.removeEventListener("load", onLoad);
      if (pollHandle) clearInterval(pollHandle);
    };
  }, [id, redirectUrl]);

  return (
    // <>redirect</>
    <iframe
      ref={iframeRef}
      src={initialSrc}
      title={id ? `External stream ${id}` : "External stream"}
      frameBorder='0'
      className='w-full aspect-video'
      allowFullScreen
    />
  );
};

export default MovieRedirect;
