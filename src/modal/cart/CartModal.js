import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../../component/global/modal/CustomModal";
import {
  setShowCarts,
  setIsExpand,
  setCurCartByShop,
} from "../../redux/cart/cartSlice";
import CartCard from "./CartCard";
import CardWraper from "../../component/global/modal/component/CardWraper";

export default function CartModal() {
  const showCarts = useSelector((state) => state.cart.showCarts);
  const carts = useSelector((state) => state.cart.carts);
  const curCart = useSelector((state) => state.cart.curCart);
  const isExpand = useSelector((state) => state.cart.isExpand);
  // const curShop = useSelector((state) => state.shop.curShop);
  const dispatch = useDispatch();
  const cartsSkuCount = 3;
  const CartSkuCountShop = 100;
  // console.log("carts", carts);
  const handleClose = () => {
    dispatch(setShowCarts(false));
  };

  const handleCollapse = () => {
    dispatch(setIsExpand(null));
  };

  React.useEffect(() => {
    dispatch(setCurCartByShop(isExpand));
  }, [dispatch, isExpand]);
  console.log(isExpand);
  const displayCarts = () => {
    let cartsTemp;
    if (isExpand) {
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
    } else {
      //show carts
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
