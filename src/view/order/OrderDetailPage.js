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

  //initial fetch
  React.useEffect(() => {
    dispatch(fetchOrderById(_id));
  }, [_id, dispatch]);
  //error fetch
  React.useEffect(() => {
    if (curOrderStatus === "error") {
      setTimeout(() => {
        dispatch(fetchOrderById(_id));
      }, 2000);
    }
  }, [_id, curOrderStatus, dispatch]);

  const handleFunc = () => {
    window.document.getElementsByTagName("html")[0].style.scrollBehavior =
      "smooth";
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 100);
    // window.document.html.style.scrollBehavior='smooth';
  };

  return (
    <>
      {curOrderStatus === "succeed" && curOrder && (
        <DetailCard
          isOrder
          order={curOrder}
          orderLogo={curOrder.status === 200 && "paid"}
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
