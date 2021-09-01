import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetch_Prom, refreshToken_Prom } from "../../api";

const initialState = {
  isLogin: Boolean(localStorage.getItem("refreshToken")?.length > 0),
  showLogin: false,
  showRegister: false,
  showSelfCenter: false,
  accessToken: null,
  curClientInfo: {},
  curClientInfoStatus: "idle",
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

export const fetchCurClientInfo = createAsyncThunk(
  "curClient/fetchCurClientInfo",
  async (foo, { rejectWithValue }) => {
    const curClientRes = await fetch_Prom("/Client");
    console.log(curClientRes);
    if (curClientRes.status === 200) {
      return curClientRes.data.object;
    } else return rejectWithValue(curClientRes.message);
  }
);

export const fetchPutCurClient = createAsyncThunk(
  'curClient/fetchPutCurClient',
  async({type,value},{rejectWithValue})=>{
    switch (type) {
      case 'name':
        const nameRes = await fetch_Prom('/ClientPut', 'PUT', )
        break;
    
      default:
        break;
    }

  }
)

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
    setShowSelfCenter: (state, action) => {
      state.showSelfCenter = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setCurClientInfo: (state, action) => {
      state.curClientInfo = action.payload;
    },
  },
  extraReducers: {
    [fetchCurClientInfo.pending]: (state) => {
      state.curClientInfoStatus = "loading";
    },
    [fetchCurClientInfo.fulfilled]: (state, action) => {
      state.curClientInfoStatus = "succeed";
      state.curClientInfo = action.payload;
    },
    [fetchCurClientInfo.rejected]: (state, action) => {
      state.curClientInfoStatus = "error";
    },
  },
});

export const {
  setIsLogin,
  setShowLogin,
  setShowRegister,
  setShowSelfCenter,
  setAccessToken,
  setCurClientInfo,
} = curClientSlice.actions;

export default curClientSlice.reducer;
