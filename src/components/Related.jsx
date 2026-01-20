import { useState, useEffect } from "react";
import { fetchRelatedMovies, fetchRelatedSeries } from "../api/fetch";
import Draggable from "./Draggable";
import MoviePoster from "./MoviePoster";
import SeriesPoster from "./SeriesPoster";

function Related({ id, type = 'movie' }) {
  const [movies, setMovies] = useState({});
  useEffect(() => {
    type === "movie" ? fetchRelatedMovies(id, setMovies) : fetchRelatedSeries(id, setMovies);
  }, [id]);

  return (
    <div className='py-4'>
      <h2 className='font-bold text-3xl'>Related</h2>
      <Draggable>
        <div className='flex gap-4'>
          {Object.keys(movies).length > 0
            ? movies.map((movie) => type === "movie" ? <MoviePoster key={movie.id} movie={movie} /> : <SeriesPoster key={movie.id} series={movie} />)
            : null}
        </div>
      </Draggable>
    </div>
  );
}

export default Related;
