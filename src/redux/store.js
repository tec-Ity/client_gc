import { configureStore } from "@reduxjs/toolkit";
import curClientReducer from "./curClient/curClientSlice";
import cartReducer from "./cart/cartSlice";
import orderReducer from "./order/orderSlice";
import shopReducer from "./shop/shopSlice";
import filterReducer from "./filter/filterSlice";

export const store = configureStore({
  reducer: {
    curClient: curClientReducer,
    cart: cartReducer,
    order: orderReducer,
    shop: shopReducer,
    filter:filterReducer,
  },
});
