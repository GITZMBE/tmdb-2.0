import React, { useEffect, useMemo, useState } from "react";
import { AiOutlineArrowUp, AiOutlineArrowDown, AiFillPlayCircle } from "react-icons/ai";
import { fetchInfo, fetchVideoKey } from "../api/fetch";
import Related from "../components/Related";
import { BsDot } from "react-icons/bs";
import Credits from "../components/Credits";
// import Reviews from "../components/Reviews";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Genre, Video, VideoType } from "../models";

const genresData: Genre[] = [
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
  const [searchParams] = useSearchParams();
  const type: VideoType = searchParams.get("type") as VideoType || "movie";
  const [video, setVideo] = useState<Video | null>(null);
  const [videoInfo, setVideoInfo] = useState({});
  const [genres, setGenres] = useState<Genre[]>([]);
  const [votes, setVotes] = useState(0);

  const streamUrl = "https://multiembed.mov/";
  const externalStreamUrl = "https://getsuperembed.link";

  let { title, description, posterPath, backdropPath, releaseDate, rating, genreIds } = useMemo(() => video || {}, [video]) as Video;

  const getPopularity = ( voteAverage = 1 ) => {return (voteAverage * 10).toString().substring(0, 2)};

  useEffect(() => {
    setGenres(genresData);
    // fetchGenres().then((genres) => setGenres(genres));
  }, []);

  useEffect(() => {
    if (!id) return;

    fetchInfo(+id, type).then(setVideo);
    fetchVideoKey(+id, type).then(setVideoInfo);
  }, [id]);

  useEffect(() => {
    setVotes(rating);
  }, [rating]);

  return video && (
    <div id='moviePoster'>
      <div className='w-full min-h-screen pb-4 bg-primary text-white space-y-4'>
        {/* <Banner topMovie={movie}> */}
          {/* <Trailer videoKey={videoInfo && videoInfo.key} className='hidden' /> */}
          <iframe
            src={streamUrl + `?video_id=${video.id}&tmdb=1`}
            title={`Stream for ${title || video.title || `movie-${video.id}`}`}
            frameBorder="0"
            className="w-full aspect-video"
            allowFullScreen
          />
        {/* </Banner> */}
        <div className='px-12 space-y-4'>
          <div className="flex items-end gap-2">
            <h1 className='text-3xl font-bold'>{title}</h1>
            <Link
              // to={externalStreamUrl + `?video_id=${id}&tmdb=1`}
              to={`/movie/${id}/redirect`}
              target='_blank'
              rel='noreferrer'
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 w-fit text-lg font-semibold px-3 py-1 rounded-full bg-secondary text-white"
            >
              <span>Play</span>
              <AiFillPlayCircle
                size={32}
              />
            </Link>            
          </div>
          <div>
            <h2 className='text-xl font-bold'>Genres</h2>
            <p className='flex gap-2'>
              {genreIds?.map((genreId, index) => (
                <React.Fragment key={index}>
                  <span>{genres.find((genreItem) => genreItem.id === genreId)?.name}</span>&nbsp;
                  {index !== genreIds.length - 1 && <BsDot size={22} />}
                </React.Fragment>
              ))}
            </p>
          </div>
          <div className='pb-4'>
            <h2 className='text-xl font-bold'>Description</h2>
            <p>{description}</p>
          </div>
          <div className='pb-4'>
            <h2 className='text-xl font-bold'>Release Date</h2>
            <p>{releaseDate}</p>
          </div>
          {/* <div className='flex items-center gap-4'>
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
          </div> */}
          <div className='relative flex w-full h-12 border-white border-2'>
            <div style={{ width: `${getPopularity(rating)}%` }} className='bg-green-500 h-full'></div>
            <p className='absolute w-full text-center leading-12 tracking-[16px]'>
              Popularity {getPopularity(rating)}%
            </p>
          </div>
          <Credits id={id ? +id : 0} type={type} />
          {/* <Reviews id={id} /> */}
          <Related id={id ? +id : 0} type={type} />
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
