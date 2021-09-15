import React from "react";
import CartSkuCtrl from "../../../modal/cart/CartSkuCtrl";
import CustomShoppingButton from "../../global/button/CustomShoppingButton";

export default function ControlSimple(props) {
  const { sku, onSkuChange, curSkuInCart, large=false } = props;

  return (
    <div>
      {curSkuInCart && curSkuInCart.quantity > 0 ? (
        <CartSkuCtrl
          oSku={curSkuInCart}
          handleFunc={onSkuChange}
          large={large}
        />
      ) : (
        <CustomShoppingButton
          large={large}
          handleFunc={() => onSkuChange(null, sku, 1)}
        />
      )}
    </div>
  );
}
