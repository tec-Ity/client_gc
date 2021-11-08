import React from "react";
import CartSkuCtrl from "./CartSkuCtrl";
import CustomShoppingButton from "../../global/button/CustomShoppingButton";
import { useSelector, useDispatch } from "react-redux";
import {
  setShowAddrSel,
  setShowLogin,
} from "../../../redux/curClient/curClientSlice";

export default function ControlSimple(props) {
  const { sku, onSkuChange, curSkuInCart, large = false } = props;
  const dispatch = useDispatch();

  const isLogin = useSelector((state) => state.curClient.isLogin);
  const userSelectedLocation = useSelector(
    (state) => state.curClient.userSelectedLocation
  );
  const handleClickAddSku = () => {
    if (!isLogin) dispatch(setShowLogin(true));
    else if (!userSelectedLocation) dispatch(setShowAddrSel(true));
    else onSkuChange(null, sku, 1);
  };
  return (
    <div>
      {curSkuInCart && curSkuInCart.quantity > 0 ? (
        <CartSkuCtrl
          oSku={curSkuInCart}
          handleFunc={onSkuChange}
          large={large}
        />
      ) : (
        <CustomShoppingButton large={large} handleFunc={handleClickAddSku} />
      )}
    </div>
  );
}
