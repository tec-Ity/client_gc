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
    }
  }, [_id, curOrder, curOrderStatus, dispatch]);

  return (
    <>
      {curOrderStatus === "succeed" && (
        <DetailCard
          isOrder
          order={curOrder}
          fetchStatus={curOrderStatus}
          // handleConfirmOrder={handleConfirmOrder}
          // // _id={_id}
          header={{ backLink: "DIETRO", nextLink: "CHECK OUT" }}
          // isCart
        />
      )}
    </>
  );
}
