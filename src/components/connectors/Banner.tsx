import React, { useEffect, useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import { Link } from "react-router-dom";
import { fetchGenres, fetchLogo } from "../../api/fetch";
import { getYear, twoDigitRating } from "../../utils";

function Banner({ topMovie, children }) {
  const [genresList, setGenresList] = useState([]);
  const [logo, setLogo] = useState(null);
  useEffect(() => {
    fetchGenres(setGenresList);
  }, []);
  useEffect(() => {
    topMovie && fetchLogo(topMovie.id, 'movie').then((data) => setLogo(data));
  }, [topMovie]);

  // const { vote_average, release_date, ...rest } = topMovie || { backdrop_path: '', title: '', vote_average: '', release_date: '', overview: '', genre_ids: [] };
  // const movie = { vote_average: twoDigitRating(topMovie.vote_average * 10), release_date: getYear(topMovie.release_date), ...rest };
  // const { backdrop_path, title, vote_average, release_date, overview, genre_ids } = movie;

  const baseUrl = "https://image.tmdb.org/t/p/w1280";
  const streamUrl = "https://multiembed.mov/";
  const url = topMovie && topMovie.backdrop_path ? topMovie.backdrop_path : "";
  const title = topMovie && topMovie.title ? topMovie.title : "";
  const rating = twoDigitRating(
    topMovie && topMovie.vote_average ? topMovie.vote_average * 10 : "",
  );
  const releaseDate = getYear(
    topMovie && topMovie.release_date ? topMovie.release_date : "",
  );
  const synopsis = topMovie && topMovie.overview ? topMovie.overview : "";
  const genreIds = topMovie && topMovie.genre_ids ? topMovie.genre_ids : [];

  return (
    <div
      id='banner'
      style={{
        backgroundImage: baseUrl && url ? `url('${baseUrl + url}')` : "",
      }}
      className='relative w-full aspect-video min-h-[50vh] max-h-screen background-center'
    >
      {children}
      <Link to={topMovie && topMovie.id ? `/movie/${topMovie.id}` : "/"}>
        <div
          id='filter'
          className='absolute top-0 left-0 bottom-0 right-0 text-white pt-[60px] pb-8 px-4 sm:px-12 w-full bg-gradient-to-r from-black from-30% opacity-90'
        >
          <div className='hidden xs:flex flex-col justify-center gap-2  md:w-3/5 lg:w-2/5 h-full'>
            <div id='title-container' className='flex items-center gap-4 py-2'>
              {/* <h1 className='text-3xl sm:text-5xl font-bold'>{title}</h1> */}
              {logo?.file_path && (
                <img
                  src={baseUrl + logo.file_path}
                  alt={title}
                  className='w-64 rounded'
                  style={{ aspect: logo.aspect_ratio }}
                />
              )}
              {/* {topMovie && topMovie?.id && (
                <Link
                  to={streamUrl + `?video_id=${topMovie.id}&tmdb=1`}
                  target='_blank'
                  rel='noreferrer'
                  onClick={(e) => e.stopPropagation()}
                >
                  <AiFillPlayCircle
                    size={36}
                    className='text-secondary min-w-[36px]'
                  />
                </Link>
              )} */}
            </div>
            <p className='space-x-2 font-bold text-white text-sm uppercase'>
              <span className='px-1 sm:px-2 py-[2px] sm:py-1 text-sm sm:text-base rounded bg-green-600'>
                {rating} %
              </span>
              <span className='px-1 sm:px-2 py-[2px] sm:py-1 text-sm sm:text-base rounded bg-gray-800'>
                HD
              </span>
              <span className='px-1 sm:px-2 py-[2px] sm:py-1 text-sm sm:text-base rounded bg-gray-800'>
                {releaseDate}
              </span>
            </p>
            <p className='max-h-16 sm:max-h-none overflow-y-hidden text-sm sm:text-base'>
              {synopsis}
            </p>
            <p className='flex flex-wrap gap-2'>
              {Object.keys(genreIds).length > 0
                ? genreIds.map((genreId, index) =>
                    genresList.map((genreItem) =>
                      genreId === genreItem.id ? (
                        <React.Fragment key={index}>
                          <span>{genreItem.name}</span>{" "}
                          {index !== genreIds.length - 1 && <BsDot size={22} />}
                        </React.Fragment>
                      ) : null,
                    ),
                  )
                : null}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Banner;
