import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: "",
  email: "",
  userName: "",
  phone: "",
};

export const curClientSlice = createSlice({
  name: "curClient",
  initialState,
  reducers: {},
});

export const selectToken = (state) => state.accessToken;

export default curClientSlice.reducer;
