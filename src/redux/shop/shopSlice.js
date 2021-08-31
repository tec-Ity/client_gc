import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { fetch_Prom } from "../../api";

const initialState = {
  curShop: "",
  curShopInfo: {},
  curShopInfoStatus: "idle",
  /*categList*/
  categList: [],
  categStatus: "idle",
  categError: "",

  /*prodList*/
  prodList: [],
  prodStatus: "idle",
  prodError: "",

  /*prodListQuery*/
  prodListQuery: [],
  prodStatusQuery: "idle",
  prodErrorQuery: "",

  /*prodSelection */
  // prodListSel: [],
  // prodListSelStatus: "idle",
  // prodListSelError: "",

  /*prodSelection */
  curProd: {},
  curProdStatus: "idle",
};

const prodPopObj = [
  {
    path: "Skus",
    select: "attrs price_regular price_sale",
  },
  { path: "Attrs", select: "nome options" },
  {
    path: "Categ",
    select: "code Categ_far",
    populate: [{ path: "Categ_far", select: "code" }],
  },
  { path: "Shop", select: "nome addr" },
];

export const fetchCurShopInfo = createAsyncThunk(
  "shop/fetchCurShopInfo",
  async (_id, { rejectWithValue }) => {
    const shopInfoRes = await fetch_Prom("/Shop/" + _id);
    console.log("shopInfoRes", shopInfoRes);
    if (shopInfoRes.status === 200) {
      return shopInfoRes.data.object;
    } else return rejectWithValue(shopInfoRes.message);
  }
);

export const fetchCategList = createAsyncThunk(
  "shop/fetchCategList",
  async () => {
    const categListResult = await fetch_Prom(
      '/Categs?populateObjs=[{"path":"Categ_sons", "select":"code"}]'
    );
    // console.log(categListResult);
    if (categListResult.status === 200) {
      return categListResult.data.objects;
    } else {
      console.log(categListResult.message);
      // return categListResult.message;
    }
  }
);

export const fetchProdList = createAsyncThunk(
  "shop/fetchProdList",
  async (categs, { rejectWithValue }) => {
    const prodsArr = [];
    console.log("categs", categs);
    for (let i = 0; i < categs?.length; i++) {
      // console.log("index", i);
      // console.log(categs[i].Categ_sons[0]._id);
      console.log(
        "/Prods?pagesize=6&Categs=" +
          categs[i].Categ_sons[0]._id +
          "&populateObjs=" +
          JSON.stringify(prodPopObj)
      );
      if (categs[i].Categ_sons.length > 0) {
        const prodListResult = await fetch_Prom(
          "/Prods?pagesize=6&Categs=" +
            categs[i].Categ_sons[0]._id +
            "&populateObjs=" +
            JSON.stringify(prodPopObj)
        );
        console.log("prodListResult", prodListResult);

        if (prodListResult.status === 200) {
          console.log(i);
          prodsArr.push({
            id: categs[i].Categ_sons[0]._id,
            far: { id: categs[i]._id, code: categs[i].code },
            list: prodListResult.data.objects,
          });
          console.log("g", prodsArr);
        } else {
          console.log(prodListResult.message);
          return rejectWithValue(prodListResult.message);
        }
      }
    }
    console.log("test", prodsArr);
    return prodsArr;
  }
);

export const fetchProdListQuery = createAsyncThunk(
  "shop/fetchProdListQuery",
  async (query) => {
    // console.log(ProdPop);
    if (query) {
      console.log("query", query);
      const prodsRes = await fetch_Prom(
        "/Prods?" + query + "&populateObjs=" + JSON.stringify(prodPopObj)
      );
      // console.log(prodsRes.data.objects);
      console.log("prodsRes", prodsRes);
      if (prodsRes.status === 200) {
        return prodsRes.data.objects;
      } else {
        // console.log([]);
        console.log(prodsRes.message);
      }
    } else {
      return [];
    }
  }
);

export const fetchProdById = createAsyncThunk(
  "shop/fetchProdById",
  async (_id, { getState, rejectWithValue }) => {
    //search prodListHome
    const prodList = getState().shop.prodList;
    console.log(prodList);
    if (prodList.length > 0) {
      for (let i = 0; i < prodList.length; i++) {
        const foundProd = prodList[i].list.find((prod) => {
          return prod._id === _id;
        });

        if (foundProd) {
          console.log("found in home");
          return foundProd;
        }
      }
    }

    //search ProdList Query
    const prodListQuery = getState().shop.prodListQuery;
    if (prodListQuery.length > 0) {
      const foundProd = prodListQuery.find((prod) => {
        return prod._id === _id;
      });

      if (foundProd) {
        console.log("found in query");
        return foundProd;
      }
    }

    //neither found in redux, call server
    const prodRes = await fetch_Prom(
      "/Prod/" + _id + "?populateObjs=" + JSON.stringify(prodPopObj)
    );
    console.log(prodRes);
    if (prodRes.status === 200) {
      return prodRes.data.object;
    } else return rejectWithValue(prodRes.message);
  }
);

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setCurShop: (state, action) => {
      state.curShop = action.payload;
    },
  },
  extraReducers: {
    /*shopInfo */
    [fetchCurShopInfo.pending]: (state) => {
      state.curShopInfoStatus = "loading";
    },
    [fetchCurShopInfo.fulfilled]: (state, action) => {
      state.curShopInfoStatus = "succeed";
      state.curShopInfo = action.payload;
    },
    [fetchCurShopInfo.rejected]: (state, action) => {
      state.curShopInfoStatus = "error";
      state.curShopInfo = {};
      // state.categError = action.payload;
    },
    /*categList */
    [fetchCategList.pending]: (state) => {
      state.categStatus = "loading";
    },
    [fetchCategList.fulfilled]: (state, action) => {
      state.categStatus = "succeed";
      state.categList = action.payload;
    },
    [fetchCategList.rejected]: (state, action) => {
      state.categStatus = "error";
      state.categList = [];
      state.categError = action.payload;
    },
    /*prodList*/
    [fetchProdList.pending]: (state) => {
      state.prodStatus = "loading";
    },
    [fetchProdList.fulfilled]: (state, action) => {
      state.prodStatus = "succeed";
      console.log("fulfilled", action.payload);
      state.prodList = action.payload;
    },
    [fetchProdList.rejected]: (state, action) => {
      console.log("error");
      state.prodStatus = "error";
      state.prodList = [];
      state.prodError = action.payload;
    },
    /*prodListQuery */
    [fetchProdListQuery.pending]: (state) => {
      state.prodStatusQuery = "loading";
    },
    [fetchProdListQuery.fulfilled]: (state, action) => {
      state.prodStatusQuery = "succeed";
      // console.log("fulfilled", action.payload);
      state.prodListQuery = action.payload;
    },
    [fetchProdListQuery.rejected]: (state, action) => {
      console.log("error");
      state.prodStatusQuery = "error";
      state.prodListQuery = [];
      state.prodErrorQuery = action.error.message;
    },
    /*prodListQuery */
    [fetchProdById.pending]: (state) => {
      state.curProdStatus = "loading";
    },
    [fetchProdById.fulfilled]: (state, action) => {
      state.curProdStatus = "succeed";
      // console.log("fulfilled", action.payload);
      state.curProd = action.payload;
    },
    [fetchProdById.rejected]: (state, action) => {
      console.log("error");
      state.curProdStatus = "error";
      state.curProd = {};
      // state.prodErrorQuery = action.error.message;
    },
  },
});

export const { setCurShop } = shopSlice.actions;

export default shopSlice.reducer;
