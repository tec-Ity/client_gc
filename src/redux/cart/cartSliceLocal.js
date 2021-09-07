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

export const cartSkuPost =() =>(dispatch, getState)=>{
  
}

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
};

export const { setShowCarts, setIsExpand, setCurCart, setInShop } =
  cartSlice.actions;

export default cartSlice.reducer;
