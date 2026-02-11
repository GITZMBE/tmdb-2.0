import { useEffect, useState } from "react";
import {
  fetchPopular,
  fetchTopVideo,
  fetchTopVideos,
  fetchUpcoming,
  fetchVideoKey,
} from "../api";
import Banner from "../components/connectors/Banner";
import VideosContainer from "../components/ui/VideosContainer";
import { Video } from "../models";
import Trailer from "../components/Trailer";
import Favorites from "../components/connectors/Lists/Favorites";

export const Dashboard = () => {
  const [bannerObject, setBannerObject] = useState<Video | null>(null);
  const [videoInfo, setVideoInfo] = useState<{ key: string } | null>(null);
  useEffect(() => {
    fetchTopVideo().then(setBannerObject);
  }, []);

  useEffect(() => {
    if (!bannerObject || !bannerObject.id) return;

    fetchVideoKey(bannerObject.id).then(setVideoInfo);
  }, [bannerObject]);

  return (
    <div
      id='dashboard'
      className='flex flex-col pb-headerHeight bg-primary min-h-screen'
    >
      {bannerObject && (
        <Banner topVideo={bannerObject}>
          {videoInfo?.key && <Trailer videoKey={videoInfo.key} className='hidden' />}
        </Banner>        
      )}
      <main className='w-full text-white'>
        <Favorites />
        <VideosContainer title='Top Rated' fetchFunction={fetchTopVideos} />
        <VideosContainer title='Popular' fetchFunction={fetchPopular} />
        <VideosContainer title='Upcoming' fetchFunction={fetchUpcoming} />
        <VideosContainer title='Top Series' fetchFunction={async () => await fetchTopVideos('series')} />
      </main>
    </div>
  );
};

export default Dashboard;
