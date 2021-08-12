import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get_Prom, post_Prom, put_Prom } from "../../api";

const initialState = {
  //show
  showCarts: false,
  //is in single shop
  inShop: false,
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

const oSkusPop =
  '"populate":{"path":"OrderSkus", "select":"Sku price quantity price_regular "}';

const ShopPop = '{"path":"Shop", "select":"nome"}';

const cartPop =
  '&populateObjs=[{"path":"OrderProds", "select":"Prod OrderSkus nome unit Shop", ' +
  oSkusPop +
  "}," +
  ShopPop +
  "]";

  /**
   * 
   * '&populateObjs=[{
   * "path":"OrderProds", 
   * "select":"Prod OrderSkus nome unit Shop",
  *   "populate":{
  *       "path":"OrderSkus", 
  *        "select":"Sku price quantity price_regular "
  *         }
  *   },
  * {
  * "path":"Shop",
  *  "select":"nome"
  * }];
   */

export const fetchCarts = createAsyncThunk("cart/fetchCarts", async () => {
  const cartsResult = await get_Prom("/Carts?" + cartPop);
  console.log(cartsResult);
  if (cartsResult.status === 200) {
    return cartsResult.data.objects;
  }
});

export const fetchCartByShop = createAsyncThunk(
  "cart/fetchCartByShop",
  async (shopId, { getState }) => {
    const carts = getState().cart.carts;
    //check existing carts
    console.log("carts", carts);
    if (carts.length > 0) {
      const foundCart = carts.find((cart) => cart._id === shopId);
      if (foundCart) {
        return foundCart;
      } else {
        /*if carts called and no cart found, return [] directly without call API*/
        return [];
      }
    } else {
      const cartsResult = await get_Prom("/Carts?Shop=" + shopId + cartPop);
      if (cartsResult.status === 200) {
        console.log("cartResult", cartsResult.data.objects[0]);
        return cartsResult.data.objects?.length > 0
          ? cartsResult.data.objects[0]
          : {};
      } else console.log(cartsResult.message);
    }
  }
);

export const fetchSkuPost = createAsyncThunk(
  "cart/fetchSkuPost",
  async ({ skuId, Qty }) => {
    // console.log("quanti", Qty);
    const obj = {};
    obj.Sku = skuId;
    obj.quantity = Qty;
    const skuPostRes = await post_Prom("/OrderSkuPost", { obj });
    console.log("skuPostRes", skuPostRes);
    if (skuPostRes.status === 200) {
      return skuPostRes.data;
    } else console.log(skuPostRes.message);
  }
);

export const fetchSkuPut = createAsyncThunk(
  "cart/fetchSkuPut",
  async ({ orderSkuId, Qty }) => {
    console.log("orderSkuID", orderSkuId);
    const obj = {};
    obj.quantity = Qty;
    const skuPutRes = await put_Prom("/OrderSkuPut/" + orderSkuId, { obj });
    console.log("skuPutRes", skuPutRes);
    if (skuPutRes.status === 200) {
      return skuPutRes.data;
    } else console.log(skuPutRes.message);
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setShowCarts: (state, action) => {
      state.showCarts = action.payload;
    },
  },
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
      // console.log('payload', action.payload)
      const { Order, OrderProd, OrderSku, type_postSku: type } = action.payload;
      let curCart = state.curCart;
      switch (type) {
        case 1:
          console.log('case "1"');
          if (Order._id === curCart._id) {
            curCart.OrderProds.forEach((op) => {
              if (op._id === OrderProd._id) {
                op.OrderSkus.unshift(OrderSku);
                return;
              }
            });
          }
          break;
        case 2:
          console.log('case "2"');
          if (Order._id === curCart._id) {
            OrderProd.OrderSkus = [OrderSku];
            curCart.OrderProds.unshift(OrderProd);
          }
          break;
        case 3:
          console.log("case 3");
          if (Order.Shop === curCart.Shop) {
            OrderProd.OrderSkus = [OrderSku];
            Order.OrderProds = [OrderProd];
            curCart = Order;
          }
          break;
        default:
          break;
      }
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
      const curCart = state.curCart;
      const { Order, OrderProd, OrderSku, type_putSku, type_delSku } =
        action.payload;
      // state.curCart = action.payload;
      if (type_putSku === 1) {
        if (Order._id === curCart._id) {
          curCart.OrderProds.forEach((op) => {
            if (op._id === OrderProd._id) {
              op.OrderSkus.forEach((os) => {
                if (os._id === OrderSku._id) {
                  os.quantity = OrderSku.quantity;
                  return;
                }
              });
            }
          });
        }
      } else if (type_delSku === 2) {
        if (Order === curCart._id) {
          for (let i = 0; i < curCart.OrderProds.length; i++) {
            if (curCart.OrderProds[i]._id === OrderProd) {
              curCart.OrderProds.splice(i, 1);
              return;
            }
          }
          delete curCart.OrderProds[OrderProd];
        }
      } else if (type_delSku === 1) {
        if (Order === curCart._id) {
          for (let i = 0; i < curCart.OrderProds.length; i++) {
            const curPord = curCart.OrderProds[i];
            if (curPord._id === OrderProd) {
              for (let j = 0; j < curPord.OrderSkus.length; j++) {
                if (curPord.OrderSkus[j]._id === OrderSku) {
                  curCart.OrderProds[i].OrderSkus.splice(j, 1);
                }
              }
            }
          }
        }
      }
    },
    [fetchSkuPut.rejected]: (state, action) => {
      state.skuPutStatus = "error";
    },
  },
});

export const selectCurProdInCart = (prodId, shop) => (state) => {
  console.log("call select prod");
  console.log(state.cart.curCart.OrderProds);
  const prod = state.cart.curCart.OrderProds?.find((op) => op.Prod === prodId);
  console.log("prod", prod);
  if (prod?.Shop === shop) return prod;
  else return null;
};

export const { setShowCarts } = cartSlice.actions;

export default cartSlice.reducer;
