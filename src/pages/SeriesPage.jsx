import React, { useEffect, useMemo, useState } from "react";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { FaChevronDown } from "react-icons/fa6";
import { fetchGenres, fetchSeriesInfo, fetchSeriesSeasonInfo } from "../api/fetch";
import Related from "../components/Related";
import { BsDot } from "react-icons/bs";
import Credits from "../components/Credits";
import Reviews from "../components/Reviews";
import { useParams } from "react-router-dom";

export const SeriesPage = () => {
  const { id } = useParams();
  const [series, setSeries] = useState(null);
  const [genres, setGenres] = useState([]);
  const [votes, setVotes] = useState(0);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);

  const streamUrl = "https://multiembed.mov/";

  let { title, overview, release_date, genre_ids, vote_count, vote_average } = useMemo(() => series || { title: '', overview: '', release_date: '', genre_ids: [], vote_count: 0, vote_average: 0 }, [series]);

  const getPopularity = ( voteAverage = 1 ) => {return (voteAverage * 10).toString().substring(0, 2)};

  useEffect(() => {
    fetchGenres().then((genres) => setGenres(genres));
  }, []);

  useEffect(() => {
    if (!id) return;

    fetchSeriesInfo(id).then((selectedSeries) => setSeries(selectedSeries));
    // fetchVideoKey(id).then((vid) => setVideoInfo(vid));
  }, [id]);

  useEffect(() => {
    setVotes(vote_count);
  }, [vote_count]);

  let [season, setSeason] = useState(null);

  useEffect(() => id && selectedSeason && fetchSeriesSeasonInfo(id, selectedSeason).then((season) => setSeason(season)), [id, selectedSeason]);
  let [showSeasonSelector, setShowSeasonSelector] = useState(false);

  return series && (
    <div id='moreInfo'>
      <div className='w-full min-h-screen pb-4 bg-primary text-white space-y-4'>
        {/* <Banner topMovie={series}> */}
          {/* <Trailer videoKey={videoInfo && videoInfo.key} className='hidden' /> */}
          <iframe
            src={streamUrl + `?video_id=${series.id}&tmdb=1&s=${selectedSeason}&e=${selectedEpisode}`}
            title={`Stream for ${title || series.title || `series-${series.id}`}`}
            frameBorder="0"
            className="w-full aspect-video"
            allowFullScreen
          />
        {/* </Banner> */}
        <div className='px-12 space-y-4'>
          <div className="w-full flex gap-4">
            <div className="">
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
            </div>
            <div className="min-w-[150px]">
              <div className="relative bg-secondary w-full">
                <button onClick={() => setShowSeasonSelector(!showSeasonSelector)} className="w-full p-2">
                  Season {selectedSeason} <FaChevronDown className="text-tertiary" />
                </button>
                
                {showSeasonSelector && (
                  <div className="flex flex-col abnsolute top-20 left-0">
                    {series.seasons?.map((season) => (
                      <button key={season.season_number} value={season.season_number} onClick={() => {setSelectedSeason(season.season_number); setShowSeasonSelector(false)}} className="w-full p-2">  
                        Season {season.season_number}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="w-full">
                {/* {season?.episodes?.map((episode) => (
                  <button key={episode.episode_number} value={episode.episode_number} onClick={() => setSelectedEpisode(episode.episode_number)} className="w-full p-2 bg-tertiary">
                    Episode {episode.episode_number}
                  </button>
                ))} */}
              </div>
            </div>
          </div>
          <Credits id={id} type='series' />
          <Reviews id={id} type='series' />
          <Related id={id} type='series' />
        </div>
      </div>
    </div>
  );
}

export default SeriesPage;
