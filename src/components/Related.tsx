import { useState, useEffect } from "react";
import { fetchRelatedMovies, fetchRelatedSeries } from "../api/fetch";
import Draggable from "./ui/Draggable";
import Poster from "./ui/Poster";
import type { Movie, VideoType } from '../models';

interface Props {
  id: number;
  type?: VideoType;
}

function Related({ id, type = "movie" }: Props) {
  const [videos, setVideos] = useState<Movie[]>([]);

  useEffect(() => {
    if (type === "movie") {
      fetchRelatedMovies(id, setVideos);
    } else if (type === "series") {
      fetchRelatedSeries(id, setVideos);
    }
  }, [id, type]);

  return (
    <div className='py-4'>
      <h2 className='font-bold text-3xl'>Related</h2>
      <Draggable>
        <div className='flex gap-4'>
          {Object.keys(videos).length > 0
            ? videos.map(({ id, title, poster_path, release_date, vote_average }) =>
                <Poster key={id} id={id} type='movie' title={title} imagePath={poster_path} releaseDate={release_date} rating={vote_average} />
              )
            : null}
        </div>
      </Draggable>
    </div>
  );
}

export default Related;
