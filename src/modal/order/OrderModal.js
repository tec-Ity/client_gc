import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomModal from "../../component/global/modal/CustomModal";
import CardWraper from "../../component/global/modal/component/CardWraper";
import { setShowOrders } from "../../redux/order/orderSlice";
import { setIsExpand } from "../../redux/cart/cartSlice";

export default function OrderModal() {
  const dispatch = useDispatch();
  const showOrders = useSelector((state) => state.order.showOrders);
  const isExpand = useSelector((state) => state.order.isExpand);
  // React.useEffect(() => {
  //     if (cartsStatus === "idle" || cartsStatus === "error") {
  //       if (cartsStatus === "error") {
  //         setTimeout(() => {
  //           dispatch(fetchCarts());
  //         }, 2000);
  //       } else {
  //         dispatch(fetchCarts());
  //       }
  //     }
  //   }, [dispatch, cartsStatus]);

  const handleClose = () => {
    dispatch(setShowOrders(false));
  };
  const handleCollapse = () => {
    dispatch(setIsExpand(true));
  };
  console.log(showOrders);
  return (
    <CustomModal show={showOrders} handleClose={handleClose}>
      <CardWraper
        isExpand={isExpand}
        handleCollapse={handleCollapse}
        title={"Order"}>
        {/* {displayCarts()} */}
      </CardWraper>
    </CustomModal>
  );
}
