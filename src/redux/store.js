import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootSlice";
import curClientReducer from "./curClient/curClientSlice";
import cartReducer from "./cart/cartSlice";
import orderReducer from "./order/orderSlice";
import shopReducer from "./shop/shopSlice";
import filterReducer from "./filter/filterSlice";
import {
  // loadState,
  saveState,
} from "./localStorage";
import throttle from "lodash/throttle";
// const preloadedState = loadState();
// //console.log(preloadedState);
export const store = configureStore({
  reducer: {
    root: rootReducer,
    curClient: curClientReducer,
    cart: cartReducer,
    order: orderReducer,
    shop: shopReducer,
    filter: filterReducer,
  },
});

store.subscribe(
  throttle(() => {
    const { carts } = store.getState().cart;
    // //console.log("store", carts);
    saveState(carts);
  }, 1000)
);
