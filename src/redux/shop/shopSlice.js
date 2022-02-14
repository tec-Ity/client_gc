import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetch_Prom } from "../../api";

const initialState = {
  shops: [],
  shopsStatus: "idle",
  curShop: "",
  curShopInfo: {},
  curShopInfoStatus: "idle",

  showOutOfRangeAlert: false,
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
  prodListQueryTot: 0,
  prodListQueryStatus: "idle",
  prodErrorQuery: "",

  /*prodSelection */
  // prodListSel: [],
  // prodListSelStatus: "idle",
  // prodListSelError: "",

  /*prodSelection */
  curProd: {},
  curProdStatus: "idle",

  searchProds: [],
  searchProdsCount: 0,
  searchProdsStatus: "idle",
};

const prodPopObj = [
  {
    path: "Skus",
    select: "attrs price_regular price_sale Shop",
  },
  { path: "Attrs", select: "nome options" },
  {
    path: "Categ",
    select: "code Categ_far",
    populate: [{ path: "Categ_far", select: "code" }],
  },
  { path: "Shop", select: "nome addr" },
];

const shopsPopObj = [
  { path: "Cita", select: "code nome" },
  { path: "serve_Citas.Cita", select: "code nome" },
];

export const fetchShops = createAsyncThunk("shop/fetchShops", async () => {
  const shopsRes = await fetch_Prom(
    "/Shops?populateObjs=" + JSON.stringify(shopsPopObj)
  );
  if (shopsRes.status === 200) {
    return shopsRes.data.objects;
  }
});

export const fetchCurShopInfo = createAsyncThunk(
  "shop/fetchCurShopInfo",
  async (_id, { rejectWithValue }) => {
    const shopInfoRes = await fetch_Prom("/Shop/" + _id);
    // //console.log("shopInfoRes", shopInfoRes);
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
    // //console.log(categListResult);
    if (categListResult.status === 200) {
      return categListResult.data.objects;
    } else {
      //console.log(categListResult.message);
      // return categListResult.message;
    }
  }
);

export const fetchProdList = createAsyncThunk(
  "shop/fetchProdList",
  async (foo = true, { getState, rejectWithValue }) => {
    const prodsArr = [];
    const duration = 6;
    // //console.log("categs", categs);
    const categs = getState().shop.categList;
    const prodList = getState().shop.prodList;
    let startIndex = prodList.length - 1 > 0 ? prodList.length - 1 : 0;
    const endIndex = startIndex + duration;
    for (
      startIndex;
      startIndex < categs?.length && startIndex < endIndex;
      startIndex++
    ) {
      //   //console.log("index", startIndex);
      //   //console.log(categs[startIndex].Categ_sons[0]._id);
      //   //console.log(getState().shop.curShop);
      if (categs[startIndex].Categ_sons.length > 0) {
        const prodListResult = await fetch_Prom(
          "/Prods?pagesize=6&page=1&Categs=" +
            categs[startIndex].Categ_sons?.map((cs) => cs._id) +
            "&Shops=" +
            [getState().shop.curShop] +
            "&populateObjs=" +
            JSON.stringify(prodPopObj)
        );
        // //console.log("prodListResult", prodListResult);

        if (prodListResult.status === 200) {
          // //console.log(startIndex);
          prodsArr.push({
            id: categs[startIndex].Categ_sons[0]._id,
            far: { id: categs[startIndex]._id, code: categs[startIndex].code },
            img: categs[startIndex].img_url,
            list: prodListResult.data.objects,
          });
          // //console.log("g", prodsArr);
        } else {
          // //console.log(prodListResult.message);
          return rejectWithValue(prodListResult.message);
        }
      }
    }
    // //console.log("test", prodsArr);
    return prodsArr;
  }
);

export const fetchProdListQuery = createAsyncThunk(
  "shop/fetchProdListQuery",
  async ({ queryURL, isReload = true }, { getState, rejectWithValue }) => {
    // //console.log(ProdPop);
    if (queryURL) {
      console.log("queryURL", queryURL);
      //   console.log("reload", isReload);
      console.log("shop", getState().shop.curShop);
      const prodsRes = await fetch_Prom(
        "/Prods?" +
          queryURL +
          "&Shops=" +
          [getState().shop.curShop] +
          "&populateObjs=" +
          JSON.stringify([prodPopObj[0]])
      );
      // //console.log(prodsRes.data.objects);
      //   console.log("prodsRes", prodsRes);
      if (prodsRes.status === 200) {
        return {
          objects: prodsRes.data.objects,
          isReload,
          tot: prodsRes.data.count,
        };
      } else {
        // //console.log([]);
        //console.log(prodsRes.message);
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
    // //console.log(prodList);
    if (prodList.length > 0) {
      for (let i = 0; i < prodList.length; i++) {
        const foundProd = prodList[i].list.find((prod) => {
          return prod._id === _id;
        });

        if (foundProd) {
          //console.log("found in home");
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
        //console.log("found in query");
        return foundProd;
      }
    }

    //neither found in redux, call server
    const prodRes = await fetch_Prom(
      "/Prod/" + _id + "?populateObjs=" + JSON.stringify(prodPopObj)
    );
    // //console.log("prodRes", prodRes);
    if (prodRes.status === 200) {
      return prodRes.data.object;
    } else return rejectWithValue(prodRes.message);
  }
);

export const fetchSearchProds = createAsyncThunk(
  "shop/fetchSearchProds",
  async ({ searchValue, pageNum }, { getState, rejectWithValue }) => {
    console.log(searchValue, getState().shop.curShop);
    const api = `/prods?search=${searchValue}&page=${pageNum}&Shops=${
      getState().shop.curShop
    }`;
    const result = await fetch_Prom(api);
    if (result.status === 200) {
      return {
        prods: result.data.objects,
        pageNum,
        totalCount: result.data.count,
      };
    } else {
      alert(result.message);
    }
  }
);

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setCurShop: (state, action) => {
      state.curShop = action.payload;
    },
    setShowOutOfRangeAlert: (state, action) => {
      state.showOutOfRangeAlert = action.payload;
    },
  },
  extraReducers: {
    [fetchSearchProds.pending]: (state) => {
      state.searchProdsStatus = "loading";
    },
    [fetchSearchProds.fulfilled]: (state, action) => {
      state.searchProdsStatus = "succeed";
      const { prods, pageNum, totalCount } = action.payload;
      state.searchProdsCount = totalCount;
      if (pageNum === 1) state.searchProds = prods;
      else state.searchProds = [...state.searchProds, ...prods];
    },
    [fetchSearchProds.rejected]: (state) => {
      state.searchProdsStatus = "error";
    },
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
      // //console.log("fulfilled", action.payload);
      state.prodList = [...state.prodList, ...action.payload];
    },
    [fetchProdList.rejected]: (state, action) => {
      //console.log("error");
      state.prodStatus = "error";
      state.prodList = [];
      state.prodError = action.payload;
    },
    /*prodListQuery */
    [fetchProdListQuery.pending]: (state) => {
      state.prodListQueryStatus = "loading";
    },
    [fetchProdListQuery.fulfilled]: (state, action) => {
      state.prodListQueryStatus = "succeed";
      // //console.log("fulfilled", action.payload);
      const { objects, isReload, tot } = action.payload;
      if (isReload === true) {
        state.prodListQuery = objects;
      } else {
        state.prodListQuery.push(...objects);
      }
      state.prodListQueryTot = tot;
    },
    [fetchProdListQuery.rejected]: (state, action) => {
      //console.log("error");
      state.prodListQueryStatus = "error";
      state.prodListQuery = [];
      state.prodErrorQuery = action.error.message;
    },
    /*prodListQuery */
    [fetchProdById.pending]: (state) => {
      state.curProdStatus = "loading";
    },
    [fetchProdById.fulfilled]: (state, action) => {
      state.curProdStatus = "succeed";
      // //console.log("fulfilled", action.payload);
      state.curProd = action.payload;
    },
    [fetchProdById.rejected]: (state, action) => {
      //console.log("error");
      state.curProdStatus = "error";
      state.curProd = {};
      // state.prodErrorQuery = action.error.message;
    },
    [fetchShops.pending]: (state) => {
      state.shopsStatus = "loading";
    },
    [fetchShops.fulfilled]: (state, action) => {
      state.shops = action.payload;
      state.shopsStatus = "succeed";
    },
  },
});

export const { setCurShop, setShowOutOfRangeAlert } = shopSlice.actions;

export default shopSlice.reducer;
