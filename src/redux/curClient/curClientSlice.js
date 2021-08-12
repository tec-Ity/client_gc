import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { refreshToken_Prom } from "../../api";

const initialState = {
  isLogin: Boolean(localStorage.getItem("refreshToken")?.length > 0),
  showLogin: false,
  showRegister: false,
  showCurClient: false,
  accessToken: null,
  curClientInfo: {},
};

export const fetchAccessToken = createAsyncThunk(
  "curClient/fetchAccessToken",
  async (refreshToken) => {
    if (refreshToken) {
      const loginRes = await refreshToken_Prom();
      console.log(loginRes);
      return loginRes;
    }
  }
);

export const curClientSlice = createSlice({
  name: "curClient",
  initialState,
  reducers: {
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setShowLogin: (state, action) => {
      state.showLogin = action.payload;
    },
    setShowRegister: (state, action) => {
      state.showRegister = action.payload;
    },
    setShowCurClient: (state, action) => {
      state.showCurClient = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setCurClientInfo: (state, action) => {
      state.curClientInfo = action.payload;
    },
  },
});

export const {
  setIsLogin,
  setShowLogin,
  setShowRegister,
  setShowCurClient,
  setAccessToken,
  setCurClientInfo,
} = curClientSlice.actions;

export default curClientSlice.reducer;
