import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  view: "web",
};
export const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    setView: (state, action) => {
      const { width } = action.payload;
      if (width) {
        if (width < 600) state.view = "mobile";
        else state.view = "web";
      }
    },
  },
});

export const { setView } = rootSlice.actions;

export default rootSlice.reducer;
