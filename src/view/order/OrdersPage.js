import React, { useEffect,  } from "react";
import { fetchOrders } from "../../redux/order/orderSlice";
import { useSelector, useDispatch } from "react-redux";

export default function OrdersPage() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);
  const ordersStatus = useSelector((state) => state.order.ordersStatus);

  const getOrders = async (queryURL = "", isReload = false) => {
    if (ordersStatus === "idle") {
      dispatch(fetchOrders(queryURL, isReload));
    }
  };
  useEffect(() => {
    getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (<>
  
  <div>hello</div>

  
  
  </>)
}
