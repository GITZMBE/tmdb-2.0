import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMoviesByGenre } from "../api";
import { Poster } from "../components";

export const Genre = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetchMoviesByGenre(setMovies, id, page);
  }, [id, page]);
  return movies && movies.results ? (
    <div id='genre' className='py-4 text-white'>
      <div className='min-w-screen py-4'>
        <div className='flex flex-wrap gap-4'>
          {movies.results.length > 0
            ? movies.results.map((movie) => <Poster key={movie.id} movie={movie} />)
            : null}
        </div>
      </div>
      <div className="flex gap-8 justify-center items-center">
        <button onClick={page > 1 ? () => {setPage(page - 1)} : null} className="text-gray-500 hover:text-white">{'<<'}</button>
        <p className="text-white">{page}</p>
        <button onClick={page < movies.total_pages ? () => {setPage(page + 1)} : null} className="text-gray-500 hover:text-white">{'>>'}</button>
      </div>
    </div>
  ) : null;
}

export default Genre;
