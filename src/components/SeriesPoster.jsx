import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { BiLike } from "react-icons/bi";
import { LiaPlusCircleSolid, LiaTimesCircle } from "react-icons/lia";
import { BsDot } from "react-icons/bs";
import { fetchGenres } from "../api/fetch";
import { useRecoilState } from "recoil";
import { FavoriteMoviesState } from "../states";
import { getYear, twoDigitRating } from "../utils";
import { getFavoritMovies, saveFavoritMovies } from "../storage";

export const SeriesPoster = ({ series }) => {
  const baseUrl = "https://image.tmdb.org/t/p/w1280";
  const [seriesObject, setSeriesObject] = useState({});
  useEffect(() => {
    setSeriesObject(series);
  }, [series]);

  const [genresList, setGenresList] = useState([]);
  useEffect(() => {
    fetchGenres(setGenresList);
  }, []);
  const genreIds = seriesObject.genre_ids || [];

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [favorites, setFavorites] = useRecoilState(FavoriteMoviesState);
  useEffect(() => {
    const favs = getFavoritMovies();
    setFavorites(favs);
  }, [setFavorites]);
  const addToFavorites = () => {
    const isAllreadyAdded = favorites?.some((favorite) => favorite.id === series.id);

    if (isAllreadyAdded) return;

    setFavorites([...favorites, series]);
    saveFavoritMovies([...favorites, series]);
  };
  const removeFromFavorites = () => {
    const isFavorite = favorites.some((favorite) => favorite.id === series.id);
    if (isFavorite) {
      setFavorites(favorites.filter((favorite) => favorite.id !== series.id));
      saveFavoritMovies(favorites.filter((favorite) => favorite.id !== series.id));
    }
  };

  const name = seriesObject.name;
  const firstAirDate = getYear(seriesObject.first_air_date);
  const rating = twoDigitRating(seriesObject.vote_average * 10);
  const url = seriesObject.poster_path;
  const bgStyle = {
    backgroundImage: url
      ? `url('${baseUrl + url}')`
      : `url('data:image/png;base64,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')`,
  };

  const [detailsStyle, setDetailsStyle] = useState("");
  const showDetails = () => {
    setDetailsStyle("animate-show-details");
  };
  const hideDetails = () => {
    setDetailsStyle("animate-hide-details");
  };

  return (
    <div className='relative flex rounded w-posterWidth aspect-poster'>
      <Link to={`/series/${series.id}`} onClick={handleClick} className='w-posterWidth'>
        <div
          style={bgStyle}
          className='group relative w-posterWidth aspect-poster background-center rounded overflow-hidden transitioning'
          onMouseOver={showDetails}
          onMouseLeave={hideDetails}
        ></div>
      </Link>
      <div
        id='details'
        className={`absolute -left-4 top-0 z-10 space-y-2 text-white bg-primary hover:px-4 hover:py-2 h-full w-0 hover:w-posterWidth aspect-poster overflow-hidden transitioning ${detailsStyle}`}
        onMouseOver={showDetails}
        onMouseLeave={hideDetails}
      >
        <div className='flex justify-between w-full'>
          <button
            className='rounded-full'
            onClick={() => addToFavorites(series)}
          >
            <LiaPlusCircleSolid
              size={32}
              className='opacity-50 hover:opacity-100'
            />
          </button>
          <button className='rounded-full' onClick={removeFromFavorites}>
            <LiaTimesCircle
              size={32}
              className='opacity-50 hover:opacity-100 '
            />
          </button>
          <button className='rounded-full' onClick={addToFavorites}>
            <BiLike
              size={26}
              className='opacity-50 hover:opacity-100 p-1 mx-1 border-white border-2 rounded-full'
            />
          </button>
        </div>
        <Link to={`/series/${series.id}`} onClick={handleClick}>
          <h2 className='py-2 font-bold text-base'>{name}</h2>
        </Link>
        <p className='flex flex-wrap gap-2 font-bold text-white text-sm uppercase'>
          <span className='px-1 sm:px-2 py-[2px] sm:py-[1px] text-xs sm:text-sm rounded bg-green-600'>
            {rating} %
          </span>
          <span className='px-1 sm:px-2 py-[2px] sm:py-[1px] text-xs sm:text-sm rounded bg-gray-800'>
            HD
          </span>
          <span className='px-1 sm:px-2 py-[2px] sm:py-[1px] text-xs sm:text-sm rounded bg-gray-800'>
            {firstAirDate}
          </span>
        </p>
        <p className='flex flex-wrap text-sm'>
          {Object.keys(genreIds).length > 0
            ? genreIds.map((genreId, i) =>
                genresList.map((genreItem, index) =>
                  genreId === genreItem.id ? (
                    <React.Fragment key={index}>
                      <span className='text-xs sm:text-sm'>
                        {genreItem.name}
                      </span>
                      {i !== genreIds.length - 1 && <BsDot size={22} />}
                    </React.Fragment>
                  ) : null
                )
              )
            : null}
        </p>
      </div>
    </div>
  );
}

export default SeriesPoster;
