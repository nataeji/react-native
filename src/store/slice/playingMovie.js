import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requestAPI from "../../request/requestApi";
import EncryptedStorage from "react-native-encrypted-storage";
import {ApiURL} from '../../contants'
const initialState = {
  loading: false,
  playingMovieList: [],
  filter: {
    include_adult: false,
    include_video:false,
    language:"ko-KR",
    page: 1,
    sort_by: "popularity.desc",
    with_release_type: "2|3",
  },
  error: null,
};

//최신상영작
export const getPlaingMovieProc = createAsyncThunk("/playingMovie/LIST", async (sendData, thunkAPI) => {

  try {
    const response = await requestAPI.get(ApiURL.nowPlayingMovie, { params: sendData});
    const responseResult = response.data;
    console.log("response playing movie:", response.data);
    return responseResult;
  } catch (error) {
    console.log("error : ", error);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const playingMovieSlice = createSlice({
  name: "playingMovie",
  initialState,
  reducers: {
    setPage:(state, action) =>{
      state.filter.page = 1;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getPlaingMovieProc.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPlaingMovieProc.fulfilled, (state, action) => {
        console.log("action.payload : ", action.payload);
        state.loading = false;
        state.playingMovieList = state.playingMovieList.concat(action.payload.results);
        state.filter.page = action.payload.page;
        state.error = null;
      })
      .addCase(getPlaingMovieProc.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  },
});

export default playingMovieSlice.reducer;
export const {} = playingMovieSlice.actions;
