import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchGet_Prom } from "../../api";

const initialState = {
  carts: [],
  cartsStatus: "idle",
  curCart: {},
  curCartStatus: "idle",
};

export const fetchCarts = createAsyncThunk("cart/fetchCarts", async () => {
  const cartsResult = await fetchGet_Prom("/Carts");
  console.log(cartsResult);
  if (cartsResult.status === 200) {
    return cartsResult.data.objects;
  }
});

export const fetchCartByShop = createAsyncThunk(
  "cart/fetchCartByShop",
  async (shopId, { getState }) => {
    const carts = getState().carts;
    //check existing carts
    if (carts.length > 0) {
      const foundCart = carts.find((cart) => cart._id === shopId);
      if (foundCart) {
        return foundCart;
      } else {
        /*if carts called and no cart found, 
        return [] directly without call API*/
        return [];
      }
    } else {
      const cartsResult = await fetchGet_Prom("/Carts?Shop=" + shopId);
      console.log(cartsResult);
      if (cartsResult.status === 200) {
        return cartsResult.data.objects[0];
      }
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCarts.pending]: (state) => {
      state.cartsStatus = "loading";
    },
    [fetchCarts.fulfilled]: (state, action) => {
      state.cartsStatus = "succeed";
      state.carts = action.payload;
    },
    [fetchCarts.rejected]: (state, action) => {
      state.cartsStatus = "error";
    },
    [fetchCartByShop.pending]: (state) => {
      state.curCartStatus = "loading";
    },
    [fetchCartByShop.fulfilled]: (state, action) => {
      state.curCartStatus = "succeed";
      state.curCart = action.payload;
    },
    [fetchCartByShop.rejected]: (state, action) => {
      state.curCartStatus = "error";
    },
  },
});

export default cartSlice.reducer;
