import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get_Prom } from "../../api";

const initialState = {
  curShop: "",
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
};
/**Populate ProdList */
const ProdPop = '&populateObjs=[{"path":"Skus", "select":"attrs"}]';

export const fetchCategList = createAsyncThunk(
  "shop/fetchCategList",
  async () => {
    const categListResult = await get_Prom(
      '/Categs?populateObjs=[{"path":"Categ_sons", "select":"code"}]'
    );
    // console.log(categListResult);
    if (categListResult.status === 200) {
      return categListResult.data.objects;
    } else {
      console.log(categListResult.message);
      return categListResult.message;
    }
  }
);

export const fetchProdListHome = createAsyncThunk(
  "shop/fetchProdListHome",
  async (categs) => {
    const prodsArr = [];
    // console.log("categs", categs);
    for (let i = 0; i < categs?.length; i++) {
      // console.log("index", i);
      // console.log(categs[i].Categ_sons[0]._id);
      if (categs[i].Categ_sons.length > 0) {
        const prodListResult = await get_Prom(
          "/Prods?pagesize=6&Categs=" + categs[i].Categ_sons[0]._id + ProdPop
        );
        // console.log(prodListResult);

        if (prodListResult.status === 200) {
          prodsArr.push({
            [categs[i].Categ_sons[0]._id]: {
              far: categs[i].code,
              list: prodListResult.data.objects,
            },
          });
        } else {
          return prodListResult.message;
        }
      }
    }
    return prodsArr;
  }
);

export const fetchProdListQuery = createAsyncThunk(
  "shop/fetchProdListQuery",
  async (query) => {
    console.log(ProdPop);
    if (query) {
      // console.log('query', query)
      const prodsRes = await get_Prom("/Prods" + query + ProdPop);
      console.log(prodsRes.data.objects);
      if (prodsRes.status === 200) {
        return prodsRes.data.objects;
      } else {
        // console.log([]);
        return prodsRes.message;
      }
    } else {
      return [];
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
  },
  extraReducers: {
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
    [fetchProdListHome.pending]: (state) => {
      state.prodStatus = "loading";
    },
    [fetchProdListHome.fulfilled]: (state, action) => {
      state.prodStatus = "succeed";
      // console.log("fulfilled", action.payload);
      state.prodList = action.payload;
    },
    [fetchProdListHome.rejected]: (state, action) => {
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
  },
});

export const { setCurShop } = shopSlice.actions;

export default shopSlice.reducer;
