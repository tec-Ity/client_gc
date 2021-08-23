import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../../component/global/modal/CustomModal";
import {
  setShowCarts,
  fetchCarts,
  setIsExpand,
} from "../../redux/cart/cartSlice";
import CartCard from "./CartCard";
import CardWraper from "../../component/global/modal/component/CardWraper";

export default function CartModal() {
  const showCarts = useSelector((state) => state.cart.showCarts);
  const cartsStatus = useSelector((state) => state.cart.cartsStatus);
  const carts = useSelector((state) => state.cart.carts);
  const curCart = useSelector((state) => state.cart.curCart);
  const curCartStatus = useSelector((state) => state.cart.curCartStatus);
  const isExpand = useSelector((state) => state.cart.isExpand);
  const dispatch = useDispatch();
  const cartsSkuCount = 3;
  const CartSkuCountShop = 100;

  const handleClose = () => {
    console.log("close");
    dispatch(setShowCarts(false));
  };

  const handleCollapse = () => {
    dispatch(setIsExpand(null));
  };

  useEffect(() => {
    if (cartsStatus === "idle" || cartsStatus === "error") {
      if (cartsStatus === "error") {
        setTimeout(() => {
          dispatch(fetchCarts());
        }, 2000);
      } else {
        dispatch(fetchCarts());
      }
    }
  }, []);

  const displayCarts = () => {
    let cartsTemp;
    if (isExpand) {
      if (curCartStatus === "error") {
        cartsTemp = <div>加载错误，请重试</div>;
      } else if (curCartStatus === "succeed") {
        cartsTemp =
          curCart && curCart.OrderProds?.length > 0 ? (
            <CartCard
              cart={curCart}
              count={CartSkuCountShop}
              isExpand={isExpand}
            />
          ) : (
            <div>此门店暂无购物车</div>
          );
      }
    } else {
      //show carts
      if (cartsStatus === "succeed") {
        console.log(1111111)
        if (carts?.length > 0) {
          const cartsValid = carts.filter((cart) => {
            return cart.OrderProds.length > 0;
          });
          cartsTemp = cartsValid.map((cart) => {
            return (
              <CartCard
                key={cart._id}
                cart={cart}
                count={cartsSkuCount}
                isExpand={isExpand}
              />
            );
          });
        } else {
          cartsTemp = <div>暂无购物车</div>;
        }
      } else if (cartsStatus === "loading") {
        cartsTemp = <div>Loading......</div>;
      } else if (cartsStatus === "error") {
        cartsTemp = <div>加载错误，请重试</div>;
      }
    }

    return cartsTemp;
  };

  return (
    <CustomModal show={showCarts} handleClose={handleClose}>
      <CardWraper
        isExpand={isExpand}
        handleCollapse={handleCollapse}
        title={"Cart"}>
        {displayCarts()}
      </CardWraper>
    </CustomModal>
  );
}
