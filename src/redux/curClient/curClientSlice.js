import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetch_Prom, refreshToken_Prom } from "../../api";

const initialState = {
  isLogin: Boolean(localStorage.getItem("refreshToken")?.length > 0),
  showLogin: false,
  showAddrSel: false,
  showRegister: false,
  showSelfCenter: false,
  accessToken: null,
  curClientInfo: {},
  curClientInfoStatus: "idle",
  curClientInfoUpdateStatus: "idle",
  userCurLocation: null,
  userSelectedLocation: JSON.parse(localStorage.getItem("userSelAddr")),
};

const clientPopObj = [{ path: "addrs.Cita", select: "code nome" }];

export const fetchAccessToken = createAsyncThunk(
  "curClient/fetchAccessToken",
  async (refreshToken) => {
    if (refreshToken) {
      const loginRes = await refreshToken_Prom();
      // console.log(loginRes);
      return loginRes;
    }
  }
);

export const fetchCurClientInfo = createAsyncThunk(
  "curClient/fetchCurClientInfo",
  async (foo, { rejectWithValue }) => {
    const curClientRes = await fetch_Prom(
      "/Client?populateObjs=" + JSON.stringify(clientPopObj)
    );
    // console.log(curClientRes);
    if (curClientRes.status === 200) {
      return curClientRes.data.object;
    } else return rejectWithValue(curClientRes.message);
  }
);

export const fetchPutCurClient = createAsyncThunk(
  "curClient/fetchPutCurClient",
  async ({ type, value }, { rejectWithValue }) => {
    // console.log("type", typeof type);
    console.log("value", value);
    console.log("type", type);
    const formData = {};
    formData[type] = value;
    // console.log(formData);
    const res = await fetch_Prom("/Client", "PUT", formData);
    // console.log(res);
    if (res.status === 200) {
      return res.data.object;
    } else {
      // console.log(res.message)
      return rejectWithValue(res.message);
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
    setShowAddrSel: (state, action) => {
      state.showAddrSel = action.payload;
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
    setUserCurLocation: (state, action) => {
      state.userCurLocation = action.payload;
    },
    setUserCurCity: (state, action) => {
      state.userCurCity = action.payload;
    },
    setUserSelectedLocation: (state, action) => {
      state.userSelectedLocation = action.payload;
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
    [fetchPutCurClient.pending]: (state) => {
      state.curClientInfoUpdateStatus = "loading";
    },
    [fetchPutCurClient.fulfilled]: (state, action) => {
      state.curClientInfoUpdateStatus = "succeed";
      state.curClientInfo = action.payload;
    },
    [fetchPutCurClient.rejected]: (state, action) => {
      state.curClientInfoUpdateStatus = "error";
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
  setShowAddrSel,
  setUserCurLocation,
  setUserSelectedLocation,
  setUserCurCity,
} = curClientSlice.actions;

export default curClientSlice.reducer;
