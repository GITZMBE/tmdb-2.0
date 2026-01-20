import React, { useState, useEffect } from "react";
import Poster from "./MoviePoster";
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
          {Object.keys(movies).length > 0
            ? movies.map((movie) => <Poster key={movie.id} movie={movie} />)
            : null}
        </div>
      </Draggable>
    </div>
  );
}

export default MoviesContainer;
