import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requestAPI from "../../request/requestApi";
import EncryptedStorage from "react-native-encrypted-storage";
import {ApiURL} from '../../contants'
const initialState = {
  loading: false,
  favoriteMovieList: [],
  error: null,
};

//인기있는 무비.
export const getFavoriteProc = createAsyncThunk("/favoriteMovie/LIST", async (sendData, thunkAPI) => {
  try {
    const response = await requestAPI.get(ApiURL.favoriteMovie, { params: sendData});
    const responseResult = response.data.results;
    console.log("response :", responseResult.data);
    return responseResult;
  } catch (error) {
    console.log("error : ", error);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const favoriteMovieSlice = createSlice({
  name: "favoriteMovie",
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder
      .addCase(getFavoriteProc.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFavoriteProc.fulfilled, (state, action) => {
        console.log("action.payload : ", action.payload);
        state.loading = false;
        state.favoriteMovieList = action.payload;
        state.error = null;
      })
      .addCase(getFavoriteProc.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  },
});

export default favoriteMovieSlice.reducer;
export const {} = favoriteMovieSlice.actions;
