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
import EmptyLogo from "../Component/EmptyLogo";
import { useTranslation } from "react-i18next";

export default function CartModal() {
  const { t } = useTranslation();
  const showCarts = useSelector((state) => state.cart.showCarts);
  const carts = useSelector((state) => state.cart.carts);
  const curCart = useSelector((state) => state.cart.curCart);
  const isExpand = useSelector((state) => state.cart.isExpand);
  const [isEmptyCart, setIsEmptyCart] = React.useState(false);
  const [cartList, setCartList] = React.useState();
  // const curShop = useSelector((state) => state.shop.curShop);
  const inShop = useSelector((state) => state.cart.inShop);
  const dispatch = useDispatch();
  const cartsSkuCount = 3;
  const CartSkuCountShop = 100;
  // //console.log("carts", carts);
  const handleClose = () => {
    dispatch(setShowCarts(false));
  };

  const handleCollapse = () => {
    dispatch(setIsExpand(null));
  };

  React.useEffect(() => {
    dispatch(setCurCartByShop(isExpand));
  }, [dispatch, isExpand]);

  //   //console.log(isExpand);

  React.useEffect(() => {
    let cartsTemp;
    console.log("isExpand", isExpand, "curCart", curCart);
    if (isExpand) {
      // show expand cart
      if (curCart && curCart.OrderProds?.length > 0) {
        cartsTemp = (
          <CartCard
            cart={curCart}
            count={CartSkuCountShop}
            isExpand={isExpand}
          />
        );
        setIsEmptyCart(false);
      } else {
        cartsTemp = (
          <EmptyLogo
            type="cart"
            label={t("cart.modal.emptyTitle")}
            text={t("cart.modal.emptyMsg")}
          />
        );
        setIsEmptyCart(true);
      }
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
        setIsEmptyCart(false);
      } else {
        setIsEmptyCart(true);
        cartsTemp = (
          <EmptyLogo
            type="cart"
            label="CARRELLO VUOTO"
            text="Vai nei negozi a riempire i tuoi carrelli ora!"
          />
        );
      }
    }
    setCartList(cartsTemp);
  }, [carts, curCart, isExpand]);
  //   //console.log(isEmptyCart);
  return (
    <CustomModal show={showCarts} handleClose={handleClose}>
      <CardWraper
        isExpand={isExpand}
        handleCollapse={!inShop && handleCollapse}
        type={isEmptyCart === false && "cart"}
      >
        {cartList}
      </CardWraper>
    </CustomModal>
  );
}
