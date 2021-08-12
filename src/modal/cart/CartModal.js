import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../../component/global/modal/CustomModal";
import { setShowCarts, fetchCarts } from "../../redux/cart/cartSlice";
import { makeStyles } from "@material-ui/core/styles";
import CartCard from "./CartCard";
import CardWraper from "../../component/global/modal/component/CardWraper";

const useStyle = makeStyles((theme) => ({
  root: {},
}));

export default function CartModal() {
  const showCarts = useSelector((state) => state.cart.showCarts);
  const cartsStatus = useSelector((state) => state.cart.cartsStatus);
  const carts = useSelector((state) => state.cart.carts);
  const inShop = useSelector((state) => state.cart.inShop);
  const classes = useStyle();
  const dispatch = useDispatch();

  const handleClose = () => {
    console.log("close");
    dispatch(setShowCarts(false));
  };

  useEffect(() => {
    if (cartsStatus === "idle" || cartsStatus === "error") {
      dispatch(fetchCarts());
    }
  }, [dispatch, cartsStatus]);

  const displayCarts = () => {
    let cartsTemp;
    if (inShop === false) {
      //show carts
      if (cartsStatus === "succeed") {
        if (carts?.length > 0) {
          cartsTemp = carts.map((cart) => {
            return <CartCard key={cart._id} cart={cart}/>;
          });
        } else {
          cartsTemp = <div>暂无购物车</div>;
        }
      } else if (cartsStatus === "loading") {
        cartsTemp = <div>Loading......</div>;
      } else if (cartsStatus === "error") {
        cartsTemp = <div>加载错误，请重试</div>;
      }
    } else if (inShop === true) {
      //show cart
    }

    return cartsTemp;
  };

  return (
    <CustomModal show={showCarts} handleClose={handleClose}>
      <CardWraper>{displayCarts()}</CardWraper>
    </CustomModal>
  );
}
