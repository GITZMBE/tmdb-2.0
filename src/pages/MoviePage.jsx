import React, { useEffect, useMemo, useState } from "react";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { fetchMovieInfo, fetchVideoKey } from "../api/fetch";
import Trailer from "../components/Trailer";
import Banner from "../components/Banner";
import Related from "../components/Related";
import { BsDot } from "react-icons/bs";
import Credits from "../components/Credits";
import Reviews from "../components/Reviews";
import { useParams } from "react-router-dom";

const genresData = [
  {
      "id": 28,
      "name": "Action"
  },
  {
      "id": 12,
      "name": "Adventure"
  },
  {
      "id": 16,
      "name": "Animation"
  },
  {
      "id": 35,
      "name": "Comedy"
  },
  {
      "id": 80,
      "name": "Crime"
  },
  {
      "id": 99,
      "name": "Documentary"
  },
  {
      "id": 18,
      "name": "Drama"
  },
  {
      "id": 10751,
      "name": "Family"
  },
  {
      "id": 14,
      "name": "Fantasy"
  },
  {
      "id": 36,
      "name": "History"
  },
  {
      "id": 27,
      "name": "Horror"
  },
  {
      "id": 10402,
      "name": "Music"
  },
  {
      "id": 9648,
      "name": "Mystery"
  },
  {
      "id": 10749,
      "name": "Romance"
  },
  {
      "id": 878,
      "name": "Science Fiction"
  },
  {
      "id": 10770,
      "name": "TV Movie"
  },
  {
      "id": 53,
      "name": "Thriller"
  },
  {
      "id": 10752,
      "name": "War"
  },
  {
      "id": 37,
      "name": "Western"
  }
]

export const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [videoInfo, setVideoInfo] = useState({});
  const [genres, setGenres] = useState([]);
  const [votes, setVotes] = useState(0);

  const streamUrl = "https://multiembed.mov/";

  let { title, overview, release_date, genre_ids, vote_count, vote_average } = useMemo(() => movie || { title: '', overview: '', release_date: '', genre_ids: [], vote_count: 0, vote_average: 0 }, [movie]);

  const getPopularity = ( voteAverage = 1 ) => {return (voteAverage * 10).toString().substring(0, 2)};

  useEffect(() => {
    setGenres(genresData);
    // fetchGenres().then((genres) => setGenres(genres));
  }, []);

  useEffect(() => {
    if (!id) return;

    fetchMovieInfo(id).then((selectedMovie) => setMovie(selectedMovie));
    fetchVideoKey(id).then((vid) => setVideoInfo(vid));
  }, [id]);

  useEffect(() => {
    setVotes(vote_count);
  }, [vote_count]);

  return movie && (
    <div id='moviePoster'>
      <div className='w-full min-h-screen pb-4 bg-primary text-white space-y-4'>
        {/* <Banner topMovie={movie}> */}
          {/* <Trailer videoKey={videoInfo && videoInfo.key} className='hidden' /> */}
          <iframe
            src={streamUrl + `?video_id=${movie.id}&tmdb=1`}
            title={`Stream for ${title || movie.title || `movie-${movie.id}`}`}
            frameBorder="0"
            className="w-full aspect-video"
            allowFullScreen
          />
        {/* </Banner> */}
        <div className='px-12 space-y-4'>
          <h1 className='text-3xl font-bold'>{title}</h1>
          <div>
            <h2 className='text-xl font-bold'>Genres</h2>
            <p className='flex gap-2'>
              {genre_ids?.map((genreId, index) => (
                <React.Fragment key={index}>
                  <span>{genres.find((genreItem) => genreItem.id === genreId).name}</span>&nbsp;
                  {index !== genre_ids.length - 1 && <BsDot size={22} />}
                </React.Fragment>
              ))}
            </p>
          </div>
          <div className='pb-4'>
            <h2 className='text-xl font-bold'>Description</h2>
            <p>{overview}</p>
          </div>
          <div className='pb-4'>
            <h2 className='text-xl font-bold'>Release Date</h2>
            <p>{release_date}</p>
          </div>
          <div className='flex items-center gap-4'>
            <h2 className='text-xl font-bold'>Votes: </h2>
            <div className='space-y-2'>
              <AiOutlineArrowUp
                className='fill-green-500 hover:fill-green-800 cursor-pointer'
                onClick={() => setVotes(votes + 1)}
              />
              <p className='selection:bg-transparent'>{votes}</p>
              <AiOutlineArrowDown
                className='fill-red-500 hover:fill-red-800 cursor-pointer'
                onClick={() => setVotes(votes - 1)}
              />
            </div>
          </div>
          <div className='relative flex w-full h-12 border-white border-2'>
            <div style={{ width: `${getPopularity(vote_average)}%` }} className='bg-green-500 h-full'></div>
            <p className='absolute w-full text-center leading-[48px] tracking-[16px]'>
              Popularity {getPopularity(vote_average)}%
            </p>
          </div>
          <Credits id={id} />
          <Reviews id={id} />
          <Related id={id} />
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
