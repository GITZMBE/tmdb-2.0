import React from "react";
import Poster from "./Poster";
import Draggable from "./Draggable";
import { useRecoilValue } from "recoil";
import { FavoriteMoviesState } from "../states";

function Favorites() {
  const favorites = useRecoilValue(FavoriteMoviesState);
  console.log(favorites)

  return (favorites && favorites.length > 0) ? (
    <div className='py-4 px-4 sm:px-12'>
      <h2 className='font-bold text-3xl'>Favorites</h2>
      <Draggable>
        <div className='flex gap-4'>
          {favorites.map((movie) => (
            <Poster key={movie.id} movie={movie} />
          ))}
        </div>
      </Draggable>
    </div>
  ) : (<></>);
}

export default Favorites;
