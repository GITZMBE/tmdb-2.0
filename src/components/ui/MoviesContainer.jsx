import { useState, useEffect } from "react";
import Poster from "./Poster";
import Draggable from "./Draggable";

function MoviesContainer({ title, fetchFunction }) {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetchFunction(setMovies);
  }, [fetchFunction]);

  return (
    <div className='min-w-screen py-4 px-4 sm:px-12'>
      <h2 className='font-bold text-3xl'>{title}</h2>
      <Draggable>
        <div className='flex gap-4'>
          {movies.length ? movies.map(({ id, title, poster_path, release_date, vote_average }) => (
            <Poster key={id} id={id} type='movie' title={title} imagePath={poster_path} releaseDate={release_date} rating={vote_average} />
          )) : null}
        </div>
      </Draggable>
    </div>
  );
}

export default MoviesContainer;
