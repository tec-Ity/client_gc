import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetch_Prom } from "../../api";
import { calCartPrice } from "../cart/cartSlice";

const initialState = {
  //orders
  orders: [],
  ordersStatus: "idle",

  //curOrder
  curOrder: {},
  curOrderStatus: "idle",

  //show modal
  showOrders: false,

  //expand?
  isExpand: null, // sotre order ID for expand

  //change status status
  changeStatusStatus: "idle",
  //order post status
  orderPostStatus: "idle",

  //order selection button status
  orderBtnSwitch: {
    paid: true,
    toPay: true,
    inProgress: true,
    completed: false,
    canceled: false,
  },
};

const oSkuObj = {
  path: "OrderSkus",
  select: "Sku price quantity price_regular attrs",
};
const prodObj = {
  path: "Prod",
  select: "img_urls desp",
};
const ShopObj = {
  path: "Shop",
  select: "nome addr",
};

const orderObj = [
  {
    path: "OrderProds",
    select: "Prod OrderSkus nome unit Shop desp",
    populate: [oSkuObj, prodObj],
  },
  ShopObj,
];

// export const fetchOrderPay = createAsyncThunk(
//   "order/fetchOrderPay",
//   async ({ paymentType = "Stripe" }, {rejectWithValue}) => {

//   }
// );

export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async ({ queryURL = "", isReload = true }, { getState, rejectWithValue }) => {
    const Orders_res = await fetch_Prom(
      "/Orders?populateObjs=" + JSON.stringify(orderObj) + queryURL
    );
    console.log("orderRes", queryURL);
    console.log("orderRes", Orders_res);
    if (Orders_res.status === 200) {
      if (isReload) {
        return Orders_res.data.objects;
      } else {
        return [...getState().order.orders, ...Orders_res.data.objects];
      }
    } else {
      console.log("Orders", Orders_res.message);
      rejectWithValue(Orders_res.message);
    }
  }
);

export const fetchOrderById = createAsyncThunk(
  "order/fetchOrderById",
  async (_id, { getState, rejectWithValue }) => {
    const OrderRes = await fetch_Prom(
      "/Orders?includes=" + [_id] + "&populateObjs=" + JSON.stringify(orderObj)
    );
    console.log(OrderRes);
    if (OrderRes.status === 200) {
      if (OrderRes.data.objects?.length > 0) {
        return OrderRes.data.objects[0];
      } else {
        return {};
      }
    } else {
      return rejectWithValue(OrderRes.message);
    }
  }
);

export const fetchChangeStatus = createAsyncThunk(
  "order/fetchChangeStatus",
  async ({ _id, action }, { rejectWithValue }) => {
    const statusRes = await fetch_Prom("/Order_change_status/" + _id, "PUT", {
      action,
    });
    console.log("statusRes", statusRes);

    if (statusRes.status === 200) {
      return statusRes.data; 
    } else return rejectWithValue(statusRes.message);
  }
);
export const fetchOrderPost = createAsyncThunk(
  "order/fetchOrderPost",
  async ({ cartObj, typeShip = 1 }, { getState, rejectWithValue }) => {
    const obj = {};
    if (cartObj) {
      //get user selected location from curclient slice as the ship info to pass
      const userAddr = getState().curClient.userSelectedLocation;
      obj.Shop = cartObj.Shop;
      obj.OrderProds = cartObj.OrderProds;
      obj.type_ship = typeShip;
      if (typeShip === 1) {
        obj.ship_info = {
          Cita_code: userAddr?.city,
          Client_nome: userAddr?.personalInfo?.name,
          address: userAddr?.addr,
          postcode: userAddr?.zip,
          phone: userAddr?.phone,
        };
      }
      console.log(obj);
      const orderPostRes = await fetch_Prom("/Order", "POST", {
        obj,
      });
      console.log("orderPostRes", orderPostRes);

      if (orderPostRes.status === 200) {
        return orderPostRes.data.object;
      } else return rejectWithValue(orderPostRes.message);
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setShowOrders: (state, action) => {
      state.showOrders = action.payload;
    },
    setIsExpand: (state, action) => {
      state.isExpand = action.payload;
    },
    setOrderBtnSwitch: (state, action) => {
      console.log("orderRes", action.payload);
      state.orderBtnSwitch[action.payload.type] = action.payload.value;
    },
  },
  extraReducers: {
    [fetchOrders.pending]: (state) => {
      state.ordersStatus = "loading";
    },
    [fetchOrders.fulfilled]: (state, action) => {
      state.ordersStatus = "succeed";
      // state.orders = action.payload;
      let ordersObjs = [];
      if (action.payload?.length > 0) {
        ordersObjs = [...action.payload];
        for (let i = 0; i < ordersObjs.length; i++) {
          const order = ordersObjs[i];
          if (order.OrderProds.length > 0) {
            calCartPrice(order.OrderProds);
          }
        }
      }
      state.orders = ordersObjs;
    },
    [fetchOrders.rejected]: (state, action) => {
      state.ordersStatus = "error";
    },
    [fetchOrderById.pending]: (state) => {
      state.curOrderStatus = "loading";
    },
    [fetchOrderById.fulfilled]: (state, action) => {
      state.curOrderStatus = "succeed";
      // state.curOrder = action.payload;
      const orderObj = { ...action.payload };
      if (Object.keys(orderObj).length > 0) {
        if (orderObj.OrderProds?.length > 0) {
          //return -1 if sku.price_tot and totPrice has been init
          calCartPrice(orderObj.OrderProds);
        }
        state.curOrder = orderObj;
      }
    },
    [fetchOrderById.rejected]: (state, action) => {
      state.curOrderStatus = "error";
    },
    [fetchChangeStatus.pending]: (state) => {
      state.changeStatusStatus = "loading";
    },
    [fetchChangeStatus.fulfilled]: (state, action) => {
      state.changeStatusStatus = "succeed";
      // state. = action.payload;
    },
    [fetchChangeStatus.rejected]: (state, action) => {
      state.changeStatusStatus = "error";
    },
    [fetchOrderPost.pending]: (state) => {
      state.orderPostStatus = "loading";
    },
    [fetchOrderPost.fulfilled]: (state, action) => {
      state.orderPostStatus = "succeed";
      state.curOrder = action.payload;
    },
    [fetchOrderPost.rejected]: (state, action) => {
      state.orderPostStatus = "error";
    },
  },
});

export const { setShowOrders, setIsExpand, setOrderBtnSwitch } =
  orderSlice.actions;

export default orderSlice.reducer;
