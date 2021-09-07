import { configureStore } from "@reduxjs/toolkit";
import curClientReducer from "./curClient/curClientSlice";
// import cartReducer from "./cart/cartSlice";
import cartReducer from "./cart/cartSliceLocal";

import orderReducer from "./order/orderSlice";
import shopReducer from "./shop/shopSlice";
import filterReducer from "./filter/filterSlice";
import { loadState, saveState } from "./localStorage";
import throttle from "lodash/throttle";
// const preloadedState = loadState();
// console.log(preloadedState);
export const store = configureStore({
  reducer: {
    curClient: curClientReducer,
    cart: cartReducer,
    order: orderReducer,
    shop: shopReducer,
    filter: filterReducer,
  },
  // preloadedState,
});

store.subscribe(
  throttle(() => {
    const { carts } = store.getState().cart;
    console.log(carts);
    saveState({ carts });
  }, 1000)
);
