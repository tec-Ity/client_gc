import {
  createAsyncThunk,
  createSlice,
  // current
} from "@reduxjs/toolkit";
import { fetch_Prom } from "../../api";
import moment from "moment";

const initialState = {
  //show
  showCarts: false,
  //is in single shop
  inShop: false,
  //expand?
  isExpand: null, // sotre shopId for expand
  //carts
  carts: localStorage.getItem("carts")
    ? JSON.parse(localStorage.getItem("carts"))
    : [],

  //curCart
  curCart: {},

  //proof
  proofStatus: "idle",
  proofObjs: [],
  orderPutStatus: "idle",

  cartsUpdateTime: localStorage.getItem("cartsUpdateTime"),
};

export const fetchOrderChangeStatus = createAsyncThunk(
  "cart/fetchOrderChangeStatus",
  async ({ id }) => {
    const statusRes = await fetch_Prom(`/Order_change_status/${id}`, "PUT", {
      action: "PLACE",
    });
    console.log(statusRes);
    if (statusRes.status === 200) {
      return true;
    }
  }
);

// export const cartSkuPost = (sku, qty, prod) => (dispatch, getState) => {
//   try {
//     //create new sku template
//     const oSkuTemp = {
//       //--Sku
//       Sku: sku._id,
//       //--price_sale
//       price_sale: sku.price_regular,
//       //--attrs ---desp
//       attrs: sku.attrs
//         ? sku.attrs.map((attr) => attr.nome + ":" + attr.option + " ")
//         : "",
//       //--quantity
//       quantity: qty,
//       //--price_tot
//       price_tot: sku.price_regular * qty,
//     };

//     //create new prod template
//     const opTemp = {
//       //-Prod
//       Prod: prod._id,
//       img_url: prod.img_urls[0],
//       nome: prod.nome,
//       //-OrderSkus[{}]
//       OrderSkus: [oSkuTemp],
//       //Shop
//     };

//     const curCart = getState().cart.curCart;
//     let curCartTemp = {};

//     //------------add new cart if empty cart or existing cart is other shop's--------------
//     if (!curCart.OrderProds || curCart.Shop !== sku.Shop) {
//       //console.log("new cart");
//       //Shop
//       curCartTemp.Shop = sku.Shop;
//       //Client
//       curCartTemp.Client = getState().curClient.curClientInfo?._id;
//       //OrderProds[{}]
//       curCartTemp.OrderProds = [opTemp];
//       //totPrice
//       curCartTemp.totPrice = sku.price_regular * qty;
//       //totItem
//       curCartTemp.totItem = qty;
//     } else if (curCart.OrderProds) {
//       //modify orderProds
//       curCartTemp = { ...curCart };
//       let foundProd = false;
//       for (let i = 0; i < curCartTemp.OrderProds.length; i++) {
//         const oProd = curCartTemp.OrderProds[i];
//         if (oProd.Prod === prod._id) {
//           //--------- add new sku -----------
//           //console.log("new sku");
//           oProd.OrderSkus.push(oSkuTemp);
//           foundProd = true;
//           break;
//         }
//       }
//       //--------- add new prod -----------
//       if (!foundProd) {
//         //console.log("new prod");
//         curCartTemp.OrderProds.push(opTemp);
//       }
//       //--------------modify cart properties --------------
//       curCartTemp.totPrice += oSkuTemp.price_tot;
//       curCartTemp.totItem += oSkuTemp.quantity;
//     } else {
//       throw new Error("failed adding sku");
//     }
//     //console.log(curCartTemp);
//     dispatch(updateCurCart(curCartTemp));
//   } catch (e) {
//     //console.log(e);
//   }
// };

// export const cartSkuPut = (oSkuId, qty, prodId) => (dispatch, getState) => {
//   //console.log(qty);
//   try {
//     if (getState().cart.curCart.OrderProds) {
//       const curCartTemp = { ...getState().cart.curCart };
//       for (let i = 0; i < curCartTemp.OrderProds.length; i++) {
//         const oProd = curCartTemp.OrderProds[i];
//         //find existing prod
//         if (oProd.Prod === prodId) {
//           for (let j = 0; j < oProd.OrderSkus.length; j++) {
//             const oSku = oProd.OrderSkus[j];
//             //find existing sku
//             if (oSku.Sku === oSkuId) {
//               //console.log(111);
//               //modify quantity
//               oSku.quantity = qty;
//               //temporaryly remove this sku's tot price
//               curCartTemp.totPrice -= oSku.price_tot;
//               //change to new tot price
//               oSku.price_tot = oSku.price_regular * qty;
//               //add to cart again
//               curCartTemp.totPrice += oSku.price_tot;
//               break;
//             }
//           }
//         }
//       }
//       dispatch(updateCurCart(curCartTemp));
//     }
//   } catch (e) {
//     //console.log(e);
//   }
// };

export const fetchProofOrder = createAsyncThunk(
  "cart/fetchProofOrder",
  async (_id, { rejectWithValue }) => {
    const proofRes = await fetch_Prom("/Order_proof/" + _id, "PUT");
    // //console.log("proofRes", proofRes);
    if (proofRes.status === 200) {
      return proofRes.data.changeObjs;
    } else return rejectWithValue(proofRes.message);
  }
);

export const calCartPrice = (OrderProds) => {
  for (let i = 0; i < OrderProds.length; i++) {
    // //console.log(33);
    const op = OrderProds[i];
    if (op.OrderSkus?.length > 0)
      for (let j = 0; j < op.OrderSkus.length; j++) {
        const oSku = op.OrderSkus[j];
        if (oSku.price_tot) {
          return -1;
        }
        // //console.log("osku", oSku);
        const totSkuPrice = oSku.price_sale * oSku.quantity;
        oSku.price_tot = totSkuPrice;
      }
  }
};

// const unshiftCart = (carts, curCart) => {
//   if (carts.length > 0) {
//     for (let i = 0; i < carts.length; i++) {
//       if (carts[i]._id === curCart._id) {
//         carts.splice(i, 1);
//         carts.unshift(curCart);
//       }
//     }
//   }
// };

// export const setCartsUpdateTime = createAsyncThunk(
//   "cart/setCartsUpdateTime",
//   async (date) => {
//     return date;
//   }
// );

// export const checkCartsUpdate = createAsyncThunk(
//   "cart/checkCartsUpdate",
//   (foo = true, { getState, rejectWithValue }) => {
//     console.log(111);

//   }
// );

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    checkCartsUpdate: (state, action) => {
      // console.log(222222222222, action.payload);
      if (action.payload) {
        const { storageCarts, storageTime } = action.payload;
        state.carts = storageCarts;
        state.cartsUpdateTime = storageTime;
        // console.log(3333333333);
        for (let i = 0; i < storageCarts.length; i++) {
          const cart = storageCarts[i];
          if (cart.Shop === state.curCart.Shop) {
            // console.log(cart);
            state.curCart = cart;
            break;
          }
        }
      }
    },
    setCarts: (state, action) => {
      state.carts = action.payload;
    },
    setShowCarts: (state, action) => {
      state.showCarts = action.payload;
    },
    setIsExpand: (state, action) => {
      state.isExpand = action.payload;
    },
    setInShop: (state, action) => {
      state.inShop = action.payload;
    },
    updateCurCart: (state, action) => {
      const cartReturn = action.payload;
      let foundCart = false;
      for (let i = 0; i < state.carts.length; i++) {
        let cartTemp = state.carts[i];
        if (cartTemp.Shop === cartReturn.Shop) {
          cartTemp = cartReturn;
          foundCart = true;
          break;
        }
      }
      if (!foundCart) {
        state.carts.push(cartReturn);
      }
      state.curCart = cartReturn;
    },
    setCurCartByShop: (state, action) => {
      const cart = state.carts?.find((cart) => {
        return cart.Shop === action.payload;
      });
      state.curCart = cart || {};
    },
    setCurCartById: (state, action) => {
      const cart = state.carts.find((cart) => {
        return cart._id === action.payload;
      });
      state.curCart = cart || {};
    },
    cartSkuPost: {
      reducer(state, action) {
        try {
          const { sku, qty, prod, date } = action.payload;
          state.cartsUpdateTime = date;
          //create new sku template
          const oSkuTemp = {
            //--Sku
            Sku: sku._id,
            //--price_sale
            price_sale: sku.price_sale,
            //--attrs ---desp
            attrs: sku.attrs
              ? sku.attrs.map((attr) => attr.nome + ":" + attr.option + " ")
              : "",
            //--quantity
            quantity: qty,
            //--price_tot
            price_tot: sku.price_sale * qty,
          };

          //create new prod template
          const opTemp = {
            //-Prod
            Prod: prod._id,
            img_url: prod.img_urls[0],
            nome: prod.nome,
            //-OrderSkus[{}]
            OrderSkus: [oSkuTemp],
            //Shop
          };

          const curCart = state.curCart;
          let curCartTemp = {};

          //------------add new cart if empty cart or existing cart is other shop's--------------
          if (!curCart.OrderProds || curCart.Shop !== sku.Shop) {
            // //console.log("new cart");
            curCartTemp._id = sku.Shop;
            //Shop
            curCartTemp.Shop = sku.Shop;
            //OrderProds[{}]
            curCartTemp.OrderProds = [opTemp];
            //totPrice
            curCartTemp.totPrice = sku.price_regular * qty;
            //totItem
            curCartTemp.totItem = qty;
            //initial location
            curCartTemp.clientInfo = JSON.parse(
              localStorage.getItem("userSelAddr")
            );
          } else if (curCart.OrderProds) {
            //modify orderProds
            curCartTemp = { ...curCart };
            let foundProd = false;
            for (let i = 0; i < curCartTemp.OrderProds.length; i++) {
              const oProd = curCartTemp.OrderProds[i];
              if (oProd.Prod === prod._id) {
                //--------- add new sku in exist prod-----------
                // //console.log("new sku");
                oProd.OrderSkus.push(oSkuTemp);
                foundProd = true;
                break;
              }
            }
            //--------- add new prod -----------
            if (!foundProd) {
              // //console.log("new prod");
              curCartTemp.OrderProds.push(opTemp);
            }
            //--------------modify cart properties --------------
            curCartTemp.totPrice += oSkuTemp.price_tot;
            curCartTemp.totItem += oSkuTemp.quantity;
          } else {
            throw new Error("failed adding sku");
          }
          //modify carts
          let foundCart = false;
          for (let i = 0; i < state.carts.length; i++) {
            // let test = state.carts[i];
            // make test = curCartTemp not working
            //must use  state.carts[i] = curCartTemp; to change
            if (state.carts[i].Shop === curCartTemp.Shop) {
              state.carts[i] = curCartTemp;
              foundCart = true;
              break;
            }
          }
          if (!foundCart) {
            state.carts.unshift(curCartTemp);
          }
          state.curCart = curCartTemp;

          // state.cartsUpdateTime = new Date();
        } catch (e) {
          //console.log(e);
        }
      },
      prepare(payload) {
        const date = JSON.stringify(new Date());
        localStorage.setItem("cartsUpdateTime", date);

        return {
          payload: { ...payload, date },
        };
      },
    },
    cartSkuPut: {
      reducer(state, action) {
        try {
          const { oSkuId, qty, prodId, date } = action.payload;
          state.cartsUpdateTime = date;

          if (state.curCart.OrderProds) {
            const curCartTemp = { ...state.curCart };
            for (let i = 0; i < curCartTemp.OrderProds.length; i++) {
              const oProd = curCartTemp.OrderProds[i];
              //find existing prod
              if (oProd.Prod === prodId) {
                for (let j = 0; j < oProd.OrderSkus.length; j++) {
                  const oSku = oProd.OrderSkus[j];
                  //find existing sku
                  if (oSku.Sku === oSkuId) {
                    //modify quantity
                    curCartTemp.totItem -= oSku.quantity;
                    curCartTemp.totItem += qty;
                    oSku.quantity = qty;
                    //modify price
                    curCartTemp.totPrice -= oSku.price_tot;
                    curCartTemp.totPrice += oSku.price_sale * qty;
                    oSku.price_tot = oSku.price_sale * qty;
                    break;
                  }
                }
                break;
              }
            }
            //modify carts
            let foundCart = false;
            for (let i = 0; i < state.carts.length; i++) {
              // let test = state.carts[i];
              // make test = curCartTemp not working
              //must use  state.carts[i] = curCartTemp; to change
              if (state.carts[i].Shop === curCartTemp.Shop) {
                state.carts[i] = curCartTemp;
                foundCart = true;
                break;
              }
            }
            if (!foundCart) {
              state.carts.push(curCartTemp);
            }
            state.curCart = curCartTemp;
            // state.cartsUpdateTime = new Date();
          }
        } catch (e) {
          //console.log(e);
        }
      },
      prepare(payload) {
        const date = JSON.stringify(new Date());
        localStorage.setItem("cartsUpdateTime", date);

        return {
          payload: { ...payload, date },
        };
      },
    },
    cartSkuDelete: {
      reducer(state, action) {
        const { oSkuId, prodId, date } = action.payload;
        state.cartsUpdateTime = date;
        const curCartTemp = state.curCart;
        let delProdIndex = -1;
        for (let i = 0; i < curCartTemp.OrderProds.length; i++) {
          const oProd = curCartTemp.OrderProds[i];
          if (oProd.Prod === prodId) {
            let delSkuIndex = -1;
            for (let j = 0; j < oProd.OrderSkus.length; j++) {
              const oSku = oProd.OrderSkus[j];
              if (oSku.Sku === oSkuId) {
                delSkuIndex = j;
                curCartTemp.totItem -= 1;
                curCartTemp.totPrice -= oSku.price_sale;
                break;
              }
            }
            if (delSkuIndex !== -1) {
              oProd.OrderSkus.splice(delSkuIndex, 1);
              if (oProd.OrderSkus.length <= 0) {
                delProdIndex = i;
              }
              break;
            }
          }
        }
        if (delProdIndex !== -1) {
          curCartTemp.OrderProds.splice(delProdIndex, 1);
        }
        //delete cart
        let delCartIndex = -1;
        //modify carts
        let foundCart = false;
        for (let i = 0; i < state.carts.length; i++) {
          // let test = state.carts[i];
          // make test = curCartTemp not working
          //must use  state.carts[i] = curCartTemp; to change
          if (state.carts[i].Shop === curCartTemp.Shop) {
            if (curCartTemp.OrderProds.length <= 0) {
              delCartIndex = i;
            } else {
              state.carts[i] = curCartTemp;
              foundCart = true;
            }
            break;
          }
        }
        if (delCartIndex !== -1) {
          state.carts.splice(delCartIndex, 1);
          state.curCart = {};
        } else {
          if (!foundCart) {
            state.carts.push(curCartTemp);
          }
          state.curCart = curCartTemp;
        }
        // state.cartsUpdateTime = new Date();
      },
      prepare(payload) {
        const date = JSON.stringify(new Date());
        localStorage.setItem("cartsUpdateTime", date);

        return {
          payload: { ...payload, date },
        };
      },
    },
    cartDelete: (state, action) => {
      const shopId = action.payload;
      let i = 0;
      //   console.log("DELETE", shopId);
      for (; i < state.carts.length; i++) {
        if (state.carts[i].Shop === shopId) {
          break;
        }
      }
      //console.log(shopId);
      //console.log(i);
      state.curCart = {};
      if (i < state.carts.length) {
        state.carts.splice(i, 1);
      }
      // state.cartsUpdateTime = new Date();
    },
    cartAddrPut: (state, action) => {
      const { addr, cartId } = action.payload;
      let cartTemp;
      if (state.curCart._id === cartId) cartTemp = { ...state.curCart };
      else {
        const foundCart = state.carts.find((c) => c._id === cartId);
        if (foundCart) cartTemp = { ...foundCart };
      }
      //   //console.log(addr);
      //update client info to new selected addrs
      if (cartTemp && addr) {
        cartTemp.clientInfo.addr = addr.address;
        cartTemp.clientInfo.city = addr.Cita?.code;
        cartTemp.clientInfo.zip = addr.postcode;
        cartTemp.clientInfo.personalInfo = {
          name: addr.name,
          phone: addr.phone,
        };
      }
      //update curCart
      state.curCart = cartTemp;
      //update carts list
      for (let i = 0; i < state.carts.length; i++) {
        const cart = state.carts[i];
        if (cart._id === cartId) state.carts[i] = cartTemp;
      }
      // state.cartsUpdateTime = new Date();
    },
  },
  extraReducers: {
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
    [fetchOrderChangeStatus.pending]: (state, action) => {
      state.orderPutStatus = "loading";
    },
    [fetchOrderChangeStatus.fulfilled]: (state, action) => {
      state.orderPutStatus = "succeed";
    },
  },
});

export const selectCurProdInCart = (prodId, shop) => (state) => {
  const shopId = state.shop.curShop;
  if (state.cart.curCart.Shop === shopId) {
    const foundOp = state.cart.curCart.OrderProds?.find((op) => {
      return op.Prod === prodId;
    });
    return foundOp;
  }
};

export const selectCurCart = (cartId) => (state) => {
  const foundCart = state.cart.carts.find((cart) => cart._id === cartId);
  return foundCart || {};
};

export const {
  checkCartsUpdate,
  setShowCarts,
  setIsExpand,
  setCurCartByShop,
  setCurCartById,
  updateCurCart,
  setInShop,
  cartSkuPost,
  cartSkuPut,
  cartSkuDelete,
  cartDelete,
  cartAddrPut,
} = cartSlice.actions;

export default cartSlice.reducer;
