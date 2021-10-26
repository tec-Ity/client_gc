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
  const [newFetch, setNewFetch] = React.useState(false);

  const handleClose = React.useCallback(() => {
    dispatch(setShowOrders(false));
  }, [dispatch]);

  //begining fetch
  useEffect(() => {
    dispatch(fetchOrders("&status=[100,200,400,700]"));
    setNewFetch(true);
  }, [dispatch]);

  //error fetch
  useEffect(() => {
    if (ordersStatus === "error")
      setTimeout(() => {
        dispatch(fetchOrders("&status=[100,200,400,700]"));
        setNewFetch(true);
      }, 2000);
  }, [dispatch, ordersStatus]);

  useEffect(() => {
    const getOrders = () => {
      let orderCardTemp;
      if (ordersStatus === "succeed" && newFetch === true) {
        orderCardTemp = orders.map((od, index) => {
          return (
            <CartCard
              key={od._id + index}
              cart={od}
              orderLogo='test'
              orderCard={true}
              orderExpandMore={() => {
                if (od.status === 100) {
                  hist.push("/order/" + od._id);
                  handleClose();
                }
              }}
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
      } else {
        orderCardTemp = <div>订单加载中</div>;
      }
    };
    getOrders();
  }, [dispatch, handleClose, hist, newFetch, orders, ordersStatus]);

  const handleCollapse = () => {
    dispatch(setIsExpand(true));
  };
//   console.log("order");
  return (
    <CustomModal show={showOrders} handleClose={handleClose}>
      <CardWraper
        isExpand={isExpand}
        handleCollapse={handleCollapse}
        type='order'
        handleFunc={handleClose}>
        {orderList}
      </CardWraper>
    </CustomModal>
  );
}
