import { atom } from "recoil";

export const FavoriteMoviesState = atom({
  key: "favoriteMovies",
  default: [],
});
