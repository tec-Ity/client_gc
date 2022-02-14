import React from "react";
import CartSkuCtrl from "./CartSkuCtrl";
import CustomShoppingButton from "../../global/button/CustomShoppingButton";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  setShowAddrSel,
  setShowLogin,
} from "../../../redux/curClient/curClientSlice";
import { setShowOutOfRangeAlert } from "../../../redux/shop/shopSlice";

export default function ControlSimple(props) {
  const { sku, onSkuChange, curSkuInCart, large = false } = props;
  const dispatch = useDispatch();
  const param = new URLSearchParams(useLocation().search);
  const isLogin = useSelector((state) => state.curClient.isLogin);
  const userSelectedLocation = useSelector(
    (state) => state.curClient.userSelectedLocation
  );
  const handleClickAddSku = () => {
    if (!isLogin) dispatch(setShowLogin(true));
    else if (!userSelectedLocation) dispatch(setShowAddrSel(true));
    else if (param.get("disabled") === "true")
      dispatch(setShowOutOfRangeAlert(true));
    else onSkuChange(null, sku, 1);
  };
  return (
    <>
      {curSkuInCart && curSkuInCart.quantity > 0 ? (
        <CartSkuCtrl
          oSku={curSkuInCart}
          handleFunc={onSkuChange}
          large={large}
        />
      ) : (
        <CustomShoppingButton
          large={large}
          handleFunc={handleClickAddSku}
          disabled={
            param.get("disabled") === "true" ||
            !isLogin ||
            !userSelectedLocation
          }
        />
      )}
    </>
  );
}
