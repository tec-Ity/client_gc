import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootSlice";
import curClientReducer from "./curClient/curClientSlice";
import cartReducer, { checkCartsUpdate } from "./cart/cartSlice";
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
    const { carts, cartsUpdateTime } = store.getState().cart;
    // const storageTime = localStorage.getItem("cartsUpdateTime");

    // console.log(storageTime, cartsUpdateTime, storageTime === cartsUpdateTime);
    // if (storageTime !== cartsUpdateTime) {
    //   const storageCarts = JSON.parse(localStorage.getItem("carts"));
    //   store.dispatch(checkCartsUpdate({ storageCarts, storageTime }));
    // } else {
    //   saveState(carts, "carts");
    //   // store.dispatch(checkCartsUpdate(false));
    // }
    saveState(carts, "carts");
  }, 1000)
);
