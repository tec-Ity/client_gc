import { createAsyncThunk, createSlice, current} from "@reduxjs/toolkit";
import { fetch_Prom } from "../../api";

const initialState = {
  //show
  showCarts: false,
  //is in single shop
  inShop: false,
  //expand?
  isExpand: null, // sotre shopId for expand
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

  //proof
  proofStatus: "idle",
  proofObjs: [],
};

const oSkuObj = {
  path: "OrderSkus",
  select: "Sku price quantity price_regular attrs",
};

//why img url????????
const prodObj = {
  path: "Prod",
  select: "img_urls",
};

const ShopObj = {
  path: "Shop",
  select: "nome addr",
};

const cartObj = [
  {
    path: "OrderProds",
    select: "Prod OrderSkus nome unit Shop",
    populate: [oSkuObj, prodObj],
  },
  ShopObj,
];

export const fetchCarts = createAsyncThunk(
  "cart/fetchCarts",
  async (foo = null, { rejectWithValue }) => {
    const cartsResult = await fetch_Prom(
      "/Carts?populateObjs=" + JSON.stringify(cartObj)
    );
    if (cartsResult.status === 200) {
      return cartsResult.data.objects;
    } else {
      // console.log(cartsResult);
      return rejectWithValue(cartsResult.message);
    }
  }
);

export const fetchCartByShop = createAsyncThunk(
  "cart/fetchCartByShop",
  async (shopId, { getState, rejectWithValue }) => {
    const carts = getState().cart.carts;
    //check existing carts
    // console.log(111);
    // console.log(object);
    if (carts.length > 0) {
      // console.log("carts", carts);
      const foundCart = carts.find((cart) => cart.Shop._id === shopId);
      if (foundCart) {
        return foundCart;
      } else {
        /*if carts called and no cart found, return [] directly without call API*/
        return {};
      }
    } else if (
      !getState().cart.curCart.Shop ||
      getState().cart.curCart.Shop._id !== shopId
    ) {
      // console.log(222);
      const cartsResult = await fetch_Prom(
        "/Carts?Shop=" + shopId + "&populateObjs=" + JSON.stringify(cartObj)
      );

      // console.log("cartResultByShop", cartsResult);
      if (cartsResult.status === 200) {
        // console.log(333);
        return cartsResult.data.objects?.length > 0
          ? cartsResult.data.objects[0]
          : {};
      } else {
        // console.log("error", cartsResult.message);
        return rejectWithValue(cartsResult.message);
      }
    }
  }
);

export const fetchCartById = createAsyncThunk(
  "cart/fetchCartById",
  async (_id, { rejectWithValue }) => {
    const cartResult = await fetch_Prom(
      "/Carts?includes=" + _id + "&populateObjs=" + JSON.stringify(cartObj)
    );
    // console.log(cartResult);
    if (cartResult.status === 200) {
      if (cartResult.data.objects?.length > 0) {
        return cartResult.data.objects[0];
      } else {
        return {};
      }
    } else {
      return rejectWithValue(cartResult.message);
    }
  }
);

export const fetchSkuPost = createAsyncThunk(
  "cart/fetchSkuPost",
  async ({ skuId, Qty }, { rejectWithValue }) => {
    // console.log("quanti", Qty);
    const obj = {};
    obj.Sku = skuId;
    obj.quantity = Qty;
    const skuPostRes = await fetch_Prom("/OrderSkuPost", "POST", { obj });
    // console.log("skuPostRes", skuPostRes);
    if (skuPostRes.status === 200) {
      return skuPostRes.data;
    } else {
      // console.log(skuPostRes.message);
      return rejectWithValue(skuPostRes.message);
    }
  }
);

export const fetchSkuPut = createAsyncThunk(
  "cart/fetchSkuPut",
  async ({ orderSkuId, Qty }) => {
    // console.log("orderSkuID", orderSkuId);
    const obj = {};
    obj.quantity = Qty;
    const skuPutRes = await fetch_Prom("/OrderSkuPut/" + orderSkuId, "PUT", {
      obj,
    });
    // console.log("skuPutRes", skuPutRes);
    if (skuPutRes.status === 200) {
      return skuPutRes.data;
    } else console.log(skuPutRes.message);
  }
);

export const fetchProofOrder = createAsyncThunk(
  "cart/fetchProofOrder",
  async (_id, { rejectWithValue }) => {
    const proofRes = await fetch_Prom("/Order_proof/" + _id, "PUT");
    // console.log("proofRes", proofRes);
    if (proofRes.status === 200) {
      return proofRes.data.changeObjs;
    } else return rejectWithValue(proofRes.message);
  }
);

export const calCartPrice = (OrderProds) => {
  let totPrice = 0;
  let totProd = 0;
  for (let i = 0; i < OrderProds.length; i++) {
    // console.log(33);
    const op = OrderProds[i];
    if (op.OrderSkus?.length > 0)
      for (let j = 0; j < op.OrderSkus.length; j++) {
        const oSku = op.OrderSkus[j];
        if (oSku.price_tot) {
          return -1;
        }
        // console.log("osku", oSku);
        const totSkuPrice = oSku.price * oSku.quantity;
        oSku.price_tot = totSkuPrice;
        totPrice += totSkuPrice;
        totProd += oSku.quantity;
      }
  }
  return { totPrice, totProd };
};

const unshiftCart = (carts, curCart) => {
  if (carts.length > 0) {
    for (let i = 0; i < carts.length; i++) {
      if (carts[i]._id === curCart._id) {
        carts.splice(i, 1);
        carts.unshift(curCart);
      }
    }
  }
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setShowCarts: (state, action) => {
      state.showCarts = action.payload;
    },
    setIsExpand: (state, action) => {
      state.isExpand = action.payload;
    },
    setInShop: (state, action) => {
      state.inShop = action.payload;
    },
    setCurCart: (state, action) => {
      const cart = state.carts.find((cart) => {
        return cart.Shop._id === action.payload;
      });
      state.curCart = cart;
    },
  },
  extraReducers: {
    /*carts */
    [fetchCarts.pending]: (state) => {
      state.cartsStatus = "loading";
    },
    [fetchCarts.fulfilled]: (state, action) => {
      state.cartsStatus = "succeed";
      const cartsObjs = [...action.payload];
      for (let i = 0; i < cartsObjs.length; i++) {
        const cart = cartsObjs[i];
        if (cart.OrderProds.length > 0) {
          const { totPrice, totProd } = calCartPrice(cart.OrderProds);
          cart.totPrice = totPrice;
          cart.totProd = totProd;
        }
      }
      state.carts = cartsObjs;
    },
    [fetchCarts.rejected]: (state, action) => {
      state.cartsStatus = "error";
      // console.log("error", action.error.message);
    },
    /*curCart with Shop ID*/
    [fetchCartByShop.pending]: (state) => {
      state.curCartStatus = "loading";
    },
    [fetchCartByShop.fulfilled]: (state, action) => {
      state.curCartStatus = "succeed";
      // console.log("cart by shop succeed");
      const cartObj = { ...action.payload };
      // console.log(cartObj);
      if (cartObj.OrderProds?.length > 0) {
        const { totPrice, totProd } = calCartPrice(cartObj.OrderProds);
        cartObj.totPrice = totPrice;
        cartObj.totProd = totProd;
      }
      state.curCart = cartObj;
    },
    [fetchCartByShop.rejected]: (state, action) => {
      state.curCartStatus = "error";
    },
    //curCart with Cart ID
    [fetchCartById.pending]: (state) => {
      state.curCartStatus = "loading";
    },
    [fetchCartById.fulfilled]: (state, action) => {
      state.curCartStatus = "succeed";
      const cartObj = { ...action.payload };
      if (Object.keys(cartObj).length > 0) {
        if (cartObj.OrderProds?.length > 0) {
          const { totPrice, totProd } = calCartPrice(cartObj.OrderProds);
          cartObj.totPrice = totPrice;
          cartObj.totProd = totProd;
        }
        state.curCart = cartObj;
      }
    },
    [fetchCartById.rejected]: (state, action) => {
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
        // add new SKU
        case 1:
          // console.log('case "1"');
          if (Order._id === curCart._id) {
            for (const op of curCart.OrderProds) {
              if (op._id === OrderProd._id) {
                op.OrderSkus.unshift(OrderSku);
                break;
              }
            }
          }
          break;
        //add new Prod
        case 2:
          // console.log('case "2"');
          if (Order._id === curCart._id) {
            OrderProd.OrderSkus = [OrderSku];
            // console.log("case", OrderProd);
            curCart.OrderProds.unshift(OrderProd);
            console.log("case", current(curCart.OrderProds));
          }
          break;
        //add new Cart
        case 3:
          // console.log("case 3");
          if (Order.Shop === curCart.Shop) {
            OrderProd.OrderSkus = [OrderSku];
            Order.OrderProds = [OrderProd];
            curCart = Order;
          }
          break;
        default:
          break;
      }
      //finally unshift the curCart into carts
      unshiftCart(state.carts, curCart);
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
      //only sku quantity changed
      if (type_putSku === 1) {
        if (Order._id === curCart._id) {
          curCart.OrderProds.forEach((op) => {
            if (op._id === OrderProd._id) {
              op.OrderSkus.forEach((os) => {
                if (os._id === OrderSku._id) {
                  os.quantity = OrderSku.quantity;
                  //finally unshift the curCart into carts
                  unshiftCart(state.carts, curCart);
                  return;
                }
              });
            }
          });
        }
      } //delete whole product
      else if (type_delSku === 2) {
        if (Order === curCart._id) {
          for (let i = 0; i < curCart.OrderProds.length; i++) {
            if (curCart.OrderProds[i]._id === OrderProd) {
              curCart.OrderProds.splice(i, 1);
              //finally unshift the curCart into carts
              unshiftCart(state.carts, curCart);
              return;
            }
          }
          // delete curCart.OrderProds[OrderProd];
        }
      } //only delete one sku in a product
      else if (type_delSku === 1) {
        if (Order === curCart._id) {
          for (let i = 0; i < curCart.OrderProds.length; i++) {
            const curPord = curCart.OrderProds[i];
            if (curPord._id === OrderProd) {
              for (let j = 0; j < curPord.OrderSkus.length; j++) {
                if (curPord.OrderSkus[j]._id === OrderSku) {
                  curCart.OrderProds[i].OrderSkus.splice(j, 1);
                  //finally unshift the curCart into carts
                  unshiftCart(state.carts, curCart);
                  return;
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
    [fetchProofOrder.pending]: (state) => {
      state.proofStatus = "loading";
    },
    [fetchProofOrder.fulfilled]: (state, action) => {
      state.proofStatus = "succeed";
      state.proofObjs = action.payload;
    },
    [fetchProofOrder.rejected]: (state, action) => {
      state.proofStatus = "error";
    },
  },
});

export const selectCurProdInCart = (prodId, shop) => (state) => {
  if (
    (state.cart.skuPutStatus !== "loading" ||
      state.cart.skuPostStatus !== "loading") &&
    state.cart.curCartStatus === "succeed"
  ) {
    // console.log("call select prod", prodId);
    // console.log(state.cart.curCart.OrderProds);
    const prod = state.cart.curCart.OrderProds?.find((op) => {
      if (op.Prod._id) {
        return op.Prod._id === prodId;
      } else {
        return op.Prod === prodId;
      }
    });
    // console.log("prod", prod);
    if (prod?.Shop === shop) return prod;
    else return null;
  } else return null;
};

export const { setShowCarts, setIsExpand, setCurCart, setInShop } =
  cartSlice.actions;

export default cartSlice.reducer;
