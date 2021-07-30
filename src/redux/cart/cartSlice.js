import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchGet_Prom } from "../../api";

const initialState = {
  carts: [],
  curCart: {},
};

export const fetchCarts = createAsyncThunk("cart/fetchCarts", async () => {
  const cartsResult = await fetchGet_Prom();
  if (cartsResult.status === 200) {
    return cartsResult;
  }
});

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCarts.fulfilled]: (state, action) => {
      state.carts = action.payload;
    },
  },
});

export default cartSlice.reducer;
