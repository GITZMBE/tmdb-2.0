
export interface SeriesDTO {
  id: number;
  name: string;
  overview: string;
  first_air_date: string;
  vote_average: number;
  poster_path: string;
  backdrop_path: string;
  genre_ids: number[];
};

export interface Series {
  id: number;
  name: string;
  first_air_date: string;
  vote_average: number;
  poster_path: string;
  genre_ids: number[];
};
