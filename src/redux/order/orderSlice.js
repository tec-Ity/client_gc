import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetch_Prom } from "../../api";

const initialState = {
  orders: [],
  orderStatus: "idle",
};

const populateObjs = [
  {
    path: "OrderProds",
    select: "OrderSkus nome unit",
    populate: { path: "OrderSkus", select: "price" },
  },
];

export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async ({ queryURL, isReload = false }, { getState }) => {
    const Orders_res = await fetch_Prom(
      "/Orders?populateObjs=" + JSON.stringify(populateObjs) + queryURL
    );
    // console.log(Orders_res)
    if (Orders_res.status === 200) {
      if (isReload) {
        return Orders_res.data.objects;
      } else {
        return [...getState.orders, ...Orders_res.data.objects];
      }
    } else {
      console.log("Orders", Orders_res.message);
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchOrders.pending]: (state, action) => {
      state.orderStatus = "loading";
    },
    [fetchOrders.fulfilled]: (state, action) => {
      state.orderStatus = "succeed";
      state.orders = action.payload;
    },
    [fetchOrders.rejected]: (state, action) => {
      state.orderStatus = "error";
    },
  },
});



export default orderSlice.reducer;
