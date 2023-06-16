import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requestAPI from "../../request/requestApi";
import EncryptedStorage from "react-native-encrypted-storage";
import {ApiURL} from '../../contants'
const initialState = {
  login: {
    loading: false,
    user: null,
    error: null,
  },
  register: {
    loading: false,
    error: null,
  },
};

//회원등록.
export const registerProc = createAsyncThunk("/register/CREATE", async (sendData, thunkAPI) => {
  console.log("sendData : ", sendData);
  try {
    const response = await requestAPI.post(ApiURL.register, sendData);
    const responseResult = response.data;
    console.log("response :", responseResult.data);
    return responseResult;
  } catch (error) {
    console.log("error : ", error);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const loginProc = createAsyncThunk("/login/LOGINPROC", async (sendData, thunkAPI) => {
  console.log("sendData : ", sendData);
  try {
    const response = await requestAPI.post(ApiURL.login, sendData);
    const responseResult = response.data;
    console.log("response :", responseResult.data);
    //accessToken 및 refreshToken 저장.
    //await EncryptedStorage.setItem("accessToken", responseResult.accessToken);
    //await EncryptedStorage.setItem("refreshToken", responseResult.refreshToken);
    //api테스트에서는 token만 저장.
    await EncryptedStorage.setItem("token", responseResult.token);
    return responseResult;
  } catch (error) {
    console.log("error : ", error);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder
      .addCase(registerProc.pending, (state, action) => {
        state.register.loading = true;
        state.register.error = null;
      })
      .addCase(registerProc.fulfilled, (state, action) => {
        console.log("action.payload : ", action.payload);
        state.register.loading = false;
        state.register.error = null;
      })
      .addCase(registerProc.rejected, (state, action) => {
        state.register.loading = false;
        state.register.error = action.payload;
      })
      .addCase(loginProc.pending, (state, action) => {
        state.login.loading = true;
        state.login.error = null;
      })
      .addCase(loginProc.fulfilled, (state, action) => {
        console.log("action.payload : ", action.payload);
        state.login.loading = false;
        state.login.user = action.payload;
        state.login.error = null;
      })
      .addCase(loginProc.rejected, (state, action) => {
        state.login.loading = false;
        state.login.error = action.payload;
      })
  },
});

export default authSlice.reducer;
export const {
} = authSlice.actions;
