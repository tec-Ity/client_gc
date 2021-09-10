import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { fetch_Prom } from "../../api";

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
};

// export const cartSkuPost = (sku, qty, prod) => (dispatch, getState) => {
//   try {
//     //create new sku template
//     const oSkuTemp = {
//       //--Sku
//       Sku: sku._id,
//       //--price
//       price: sku.price_regular,
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
//       console.log("new cart");
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
//           console.log("new sku");
//           oProd.OrderSkus.push(oSkuTemp);
//           foundProd = true;
//           break;
//         }
//       }
//       //--------- add new prod -----------
//       if (!foundProd) {
//         console.log("new prod");
//         curCartTemp.OrderProds.push(opTemp);
//       }
//       //--------------modify cart properties --------------
//       curCartTemp.totPrice += oSkuTemp.price_tot;
//       curCartTemp.totItem += oSkuTemp.quantity;
//     } else {
//       throw new Error("failed adding sku");
//     }
//     console.log(curCartTemp);
//     dispatch(updateCurCart(curCartTemp));
//   } catch (e) {
//     console.log(e);
//   }
// };

// export const cartSkuPut = (oSkuId, qty, prodId) => (dispatch, getState) => {
//   console.log(qty);
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
//               console.log(111);
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
//     console.log(e);
//   }
// };

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

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
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
      const cart = state.carts.find((cart) => {
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
    cartSkuPost: (state, action) => {
      console.log(action.payload);
      const { sku, qty, prod } = action.payload;
      try {
        //create new sku template
        const oSkuTemp = {
          //--Sku
          Sku: sku._id,
          //--price
          price: sku.price_regular,
          //--attrs ---desp
          attrs: sku.attrs
            ? sku.attrs.map((attr) => attr.nome + ":" + attr.option + " ")
            : "",
          //--quantity
          quantity: qty,
          //--price_tot
          price_tot: sku.price_regular * qty,
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
          console.log("new cart");
          //Shop
          curCartTemp.Shop = sku.Shop;
          //OrderProds[{}]
          curCartTemp.OrderProds = [opTemp];
          //totPrice
          curCartTemp.totPrice = sku.price_regular * qty;
          //totItem
          curCartTemp.totItem = qty;
        } else if (curCart.OrderProds) {
          //modify orderProds
          curCartTemp = { ...curCart };
          let foundProd = false;
          for (let i = 0; i < curCartTemp.OrderProds.length; i++) {
            const oProd = curCartTemp.OrderProds[i];
            if (oProd.Prod === prod._id) {
              //--------- add new sku in exist prod-----------
              console.log("new sku");
              oProd.OrderSkus.push(oSkuTemp);
              foundProd = true;
              break;
            }
          }
          //--------- add new prod -----------
          if (!foundProd) {
            console.log("new prod");
            curCartTemp.OrderProds.push(opTemp);
          }
          //--------------modify cart properties --------------
          curCartTemp.totPrice += oSkuTemp.price_tot;
          curCartTemp.totItem += oSkuTemp.quantity;
        } else {
          throw new Error("failed adding sku");
        }
        console.log(curCartTemp);
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
      } catch (e) {
        console.log(e);
      }
    },
    cartSkuPut: (state, action) => {
      const { oSkuId, qty, prodId } = action.payload;
      try {
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
                  curCartTemp.totPrice += oSku.price * qty;
                  oSku.price_tot = oSku.price * qty;
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
        }
      } catch (e) {
        console.log(e);
      }
    },
    cartSkuDelete: (state, action) => {
      const { oSkuId, prodId } = action.payload;
      const curCartTemp = { ...state.curCart };
      let delProdIndex = -1;
      console.log(111);
      for (let i = 0; i < curCartTemp.OrderProds.length; i++) {
        const oProd = curCartTemp.OrderProds[i];
        if (oProd.Prod === prodId) {
          let delSkuIndex = -1;
          for (let j = 0; j < oProd.OrderSkus.length; j++) {
            const oSku = oProd.OrderSkus[j];
            if ((oSku.Sku = oSkuId)) {
              delSkuIndex = j;
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
  },
});

export const selectCurProdInCart = (prodId, shop) => (state) => {
  // console.log(state.cart.curCart);
  // console.log("op", state.cart.curCart.OrderProds);
  if (state.cart.curCart.Shop === shop) {
    const foundOp = state.cart.curCart.OrderProds?.find((op) => {
      return op.Prod === prodId;
    });
    foundOp && console.log("op", foundOp);
    return foundOp;
  }
};

export const {
  setShowCarts,
  setIsExpand,
  setCurCartByShop,
  setCurCartById,
  updateCurCart,
  setInShop,
  cartSkuPost,
  cartSkuPut,
  cartSkuDelete,
} = cartSlice.actions;

export default cartSlice.reducer;
