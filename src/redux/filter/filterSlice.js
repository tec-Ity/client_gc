import { createSlice } from "@reduxjs/toolkit";

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
};

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
        ? { ...state.query, ...action.payload }
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
} = filterSilce.actions;

export default filterSilce.reducer;
