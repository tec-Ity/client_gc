import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetch_Prom } from "../../api";

const initialState = {
  title: {
    desp: "",
    img: "",
  },
  query: {
    categs: [],
    nations: [],
    isDiscount: null,
  },
  search: null,
  /*select categs*/
  selFirstCateg: null,
  selSecondCateg: null,

  backToFirst: false,

  isHome: true,

  clickCategFromRemote: null,
  // scrollNav: false,
  nationIds: [],
  nationIdsStatus: "idle",
};

export const fetchNationIds = createAsyncThunk(
  "filter/fetchNationIds",
  async (nationCode, { rejectWithValue }) => {
    if (nationCode && Array.isArray(nationCode) && nationCode.length > 0) {
      const nationId = [];
      for (let i = 0; i < nationCode.length; i++) {
        const nationRes = await fetch_Prom("/Nations?search=" + nationCode[i]);
        // console.log(nationRes);
        if (nationRes?.status === 200)
          nationId.push({
            code: nationCode[i],
            id: nationRes.data?.object?._id,
          });
      }

      return nationId;
    } else rejectWithValue("nation code data type not valid");
  }
);

export const filterSilce = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setBackToFirst: (state, action) => {
      state.backToFirst = action.payload;
    },
    setTitle: (state, action) => {
      state.title = action.payload
        ? { ...state.title, ...action.payload }
        : initialState.title;
    },
    setQuery: (state, action) => {
      state.query = action.payload
        ? { ...initialState.query, ...action.payload }
        : initialState.query;
    },
    setSearch: (state, action) => {
      state.search = action.payload
        ? { ...state.search, ...action.payload }
        : initialState.search;
    },
    setSelFirstCateg: (state, action) => {
      state.selFirstCateg = action.payload;
    },
    setSelSecondCateg: (state, action) => {
      state.selSecondCateg = action.payload;
    },
    setIsHome: (state, action) => {
      state.isHome = action.payload;
    },
    goBack: (state) => {
      if (state.selSecondCateg !== null) {
        state.selSecondCateg = null;
        state.backToFirst = true;
      } else if (state.selFirstCateg !== null) {
        state.selFirstCateg = null;
        state.isHome = true;
        state.search = initialState.search;
        state.query = initialState.query;
        state.title = initialState.title;
      }
    },
    setClickCategFromRemote: (state, action) => {
      state.clickCategFromRemote = action.payload;
    },
    // setScrollNav:(state, action)=>{
    //   state.scrollNav = action.payload;
    // }
  },
  extraReducers: {
    [fetchNationIds.pendings]: (state) => {
      state.nationIdsStatus = "loading";
    },
    [fetchNationIds.fulfilled]: (state, action) => {
      state.nationIdsStatus = "succeed";
      state.nationIds = action.payload;
    },
    [fetchNationIds.rejected]: (state) => {
      state.nationIdsStatus = "error";
    },
  },
});

export const {
  setBackToFirst,
  setQuery,
  setSearch,
  setTitle,
  setSelFirstCateg,
  setSelSecondCateg,
  setIsHome,
  goBack,
  setClickCategFromRemote,
  // setScrollNav
} = filterSilce.actions;

export default filterSilce.reducer;
