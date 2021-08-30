import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { fetchOrderById } from "../../redux/order/orderSlice";
import DetailCard from "./component/DetailCard";

export default function OrderDetailPage() {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const curOrder = useSelector((state) => state.order.curOrder);
  const curOrderStatus = useSelector((state) => state.order.curOrderStatus);

  React.useEffect(() => {
    if (Object.keys(curOrder).length === 0) {
      if (curOrderStatus === "idle") {
        dispatch(fetchOrderById(_id));
      } else if (curOrderStatus === "error") {
        setTimeout(() => {
          dispatch(fetchOrderById(_id));
        }, 2000);
      }
    } else {
      if (curOrderStatus === "succeed" && curOrder._id !== _id) {
        dispatch(fetchOrderById(_id));
      }
    }
  }, [_id, curOrder, curOrderStatus, dispatch]);

  const handleFunc = ()=>{
    window.scrollTo(0,document.body.scrollHeight);
  }

  return (
    <>
      {curOrderStatus === "succeed" && curOrder && (
        <DetailCard
          isOrder
          order={curOrder}
          orderLogo={curOrder.status === 100 ? "pay" : "paid"}
          fetchStatus={curOrderStatus}
          // handleConfirmOrder={handleConfirmOrder}
          // // _id={_id}
          handleFunc={handleFunc}
          header={{ backLink: "DIETRO", nextLink: "CHECK OUT" }}
          // isCart
        />
      )}
    </>
  );
}
