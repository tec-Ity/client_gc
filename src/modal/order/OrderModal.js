import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomModal from "../../component/global/modal/CustomModal";
import CardWraper from "../../component/global/modal/component/CardWraper";
import { fetchOrders, setShowOrders } from "../../redux/order/orderSlice";
import { setIsExpand } from "../../redux/cart/cartSlice";
import CartCard from "../cart/CartCard";
import { useHistory } from "react-router";

export default function OrderModal() {
  const dispatch = useDispatch();
  const hist = useHistory();
  const showOrders = useSelector((state) => state.order.showOrders);
  const isExpand = useSelector((state) => state.order.isExpand);
  const ordersStatus = useSelector((state) => state.order.ordersStatus);
  const orders = useSelector((state) => state.order.orders);
  const [orderList, setOrderList] = useState();

  const handleClose = React.useCallback(() => {
    dispatch(setShowOrders(false));
  }, [dispatch]);

  useEffect(() => {
    console.log("fetchOrder");
    console.log(ordersStatus);
    const getOrders = () => {
      if (ordersStatus === "idle") {
        dispatch(fetchOrders("&status=[100,200,400,700]"));
      } else if (ordersStatus === "error") {
        setTimeout(() => {
          dispatch(fetchOrders("&status=[100,200,400,700]"));
        }, 2000);
      } else if (ordersStatus === "succeed") {
        const orderCardTemp = orders.map((od) => {
          return (
            <CartCard
              key={od._id}
              cart={od}
              orderLogo='test'
              orderCard={true}
              handleBtn={
                od.status === 100
                  ? {
                      label: "DA PAGARE",
                      background: "#fdd444",
                      handleFunc: () => {
                        handleClose();
                        hist.push("/order/" + od._id);
                      },
                    }
                  : {
                      label: "PAGATO",
                      background: "#c0e57b",
                      handleFunc: () => {
                        handleClose();
                        dispatch(setIsExpand(od._id));
                      },
                    }
              }
            />
          );
        });
        setOrderList(orderCardTemp);
      }
    };
    getOrders();
  }, [dispatch, handleClose, hist, orders, ordersStatus]);

  const handleCollapse = () => {
    dispatch(setIsExpand(true));
  };
  console.log("order");
  return (
    <CustomModal show={showOrders} handleClose={handleClose}>
      <CardWraper
        isExpand={isExpand}
        handleCollapse={handleCollapse}
        title={"Order"}
        handleFunc={handleClose}>
        {orderList}
      </CardWraper>
    </CustomModal>
  );
}
