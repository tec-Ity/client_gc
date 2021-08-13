import React, { useEffect, useState } from "react";
import { fetchOrders } from "../../redux/order/orderSlice";
import { useSelector, useDispatch } from "react-redux";

export default function OrdersPage() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);
  const orderStatus = useSelector((state) => state.order.orderStatus);

  const getOrders = async (queryURL = "", isReload = false) => {
    if (orderStatus === "idle") {
      dispatch(fetchOrders(queryURL, isReload));
    }
  };
  useEffect(() => {
    getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
}
