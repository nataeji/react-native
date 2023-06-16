import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth";
import modalSlice from "./modal";
import favoriteMovieSlice from "./favoriteMovie";
import playingMovieSlice from "./playingMovie";

const rootReducer = combineReducers({
  auth: authSlice,
  modal: modalSlice,
  favoriteMovie: favoriteMovieSlice,
  playingMovie: playingMovieSlice,
});

export default rootReducer;
