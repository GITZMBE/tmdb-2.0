import { useEffect, useState } from "react";
import { fetchPopular, fetchTopMovie, fetchTopMovies, fetchTopSeries, fetchUpcoming, fetchVideoKey } from "../api";
import Banner from "../components/connectors/Banner";
import { Trailer } from "../components";
import Favorites from "../components/connectors/Lists/Favorites";
import MoviesContainer from "../components/ui/MoviesContainer";
import SeriesContainer from "../components/SeriesContainer";
import { Movie } from "../models";

export const Dashboard = () => {
  const [bannerObject, setBannerObject] = useState<Movie | null>(null);
  const [videoInfo, setVideoInfo] = useState<{ key: string } | null>(null);
  useEffect(() => {
    fetchTopMovie(setBannerObject);
  }, []);

  useEffect(() => {
    if (!bannerObject || !bannerObject.id) return;

    fetchVideoKey(bannerObject.id).then(setVideoInfo);
  }, [bannerObject]);

  return (
    <div
      id='dashboard'
      className='flex flex-col pb-headerHeight bg-primary min-h-screen'
    >
      <Banner topMovie={bannerObject}>
        <Trailer
          videoKey={
            videoInfo && videoInfo.key !== null ? videoInfo.key : undefined
          }
          className='hidden'
        />
      </Banner>
      <main className='w-full text-white'>
        <Favorites />
        <MoviesContainer title='Top Rated' fetchFunction={fetchTopMovies} />
        <MoviesContainer title='Popular' fetchFunction={fetchPopular} />
        <MoviesContainer title='Upcoming' fetchFunction={fetchUpcoming} />
        <SeriesContainer title='Top Series' fetchFunction={fetchTopSeries} />
      </main>
    </div>
  );
}

export default Dashboard;
