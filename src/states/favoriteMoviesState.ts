import { atom } from "recoil";
import type { Favorite } from "../models";

export const FavoriteMoviesState = atom<Favorite[]>({
  key: "favoriteMovies",
  default: [],
});
