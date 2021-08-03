import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get_Prom, post_Prom, put_Prom } from "../../api";

const initialState = {
  //carts
  carts: [],
  cartsStatus: "idle",
  //curCart
  curCart: {},
  curCartStatus: "idle",
  //sku post
  skuPostStatus: "idle",
  //sku put
  skuPutStatus: "idle",
};

export const fetchCarts = createAsyncThunk("cart/fetchCarts", async () => {
  const cartsResult = await get_Prom("/Carts");
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
        /*if carts called and no cart found, return [] directly without call API*/
        return [];
      }
    } else {
      const cartsResult = await get_Prom("/Carts?Shop=" + shopId);
      console.log(cartsResult);
      if (cartsResult.status === 200) {
        return cartsResult.data.objects[0];
      }
    }
  }
);

export const fetchSkuPost = createAsyncThunk(
  "cart/fetchSkuPost",
  async (skuId, quantity) => {
    const skuPostRes = await post_Prom("/OrderSkuPost", { skuId, quantity });
    if (skuPostRes.status === 200) {
      return skuPostRes.data.object;
    }
  }
);

export const fetchSkuPut = createAsyncThunk(
  "cart/fetchSkuPut",
  async (skuId, quantity) => {
    const skuPutRes = await put_Prom("/OrderSkuPut/" + skuId, { quantity });
    if (skuPutRes.status === 200) {
      return skuPutRes.data.object;
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: {
    /*carts */
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
    /*curCart */
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
    /*add first sku */
    [fetchSkuPost.pending]: (state) => {
      state.skuPostStatus = "loading";
    },
    [fetchSkuPost.fulfilled]: (state, action) => {
      state.skuPostStatus = "succeed";
      state.curCart = action.payload;
    },
    [fetchSkuPost.rejected]: (state, action) => {
      state.skuPostStatus = "error";
    },
    /*update sku quantity*/
    [fetchSkuPut.pending]: (state) => {
      state.skuPutStatus = "loading";
    },
    [fetchSkuPut.fulfilled]: (state, action) => {
      state.skuPutStatus = "succeed";
      state.curCart = action.payload;
    },
    [fetchSkuPut.rejected]: (state, action) => {
      state.skuPutStatus = "error";
    },
  },
});

export default cartSlice.reducer;
