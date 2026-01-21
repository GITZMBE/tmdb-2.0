import React from "react";
import MoviePoster from "./MoviePoster";
import Draggable from "./Draggable";
import { useRecoilValue } from "recoil";
import { FavoriteMoviesState } from "../states";
import SeriesPoster from "./SeriesPoster";

function Favorites() {
  const favorites = useRecoilValue(FavoriteMoviesState);

  return favorites && favorites.length ? (
    <div className='py-4 px-4 sm:px-12'>
      <h2 className='font-bold text-3xl'>Favorites</h2>
      <Draggable>
        <div className='flex gap-4'>
          {favorites.map((fav) => fav.type === 'movie' ? (
            <MoviePoster key={fav.id} movie={fav} />
          ) : (
            <SeriesPoster key={fav.id} series={fav} />
          ))}
        </div>
      </Draggable>
    </div>
  ) : (
    <></>
  );
}

export default Favorites;
