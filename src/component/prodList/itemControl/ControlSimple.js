import React from "react";
import { useSelector } from "react-redux";
import CartSkuCtrl from "../../../modal/cart/CartSkuCtrl";
import { selectCurProdInCart } from "../../../redux/cart/cartSlice";
import CustomShoppingButton from "../../global/button/CustomShoppingButton";

export default function ControlSimple(props) {
  const { skus, prodId, shop, onSkuChange } = props;
  const skuPostStatus = useSelector((state) => state.cart.skuPostStatus);

  console.log(shop)
  const curSkuInCart = useSelector(selectCurProdInCart(prodId, shop._id))
    ?.OrderSkus[0];
// console.log(prodId)
  console.log(curSkuInCart);

  return (
    <div>
      {curSkuInCart ? (
        <CartSkuCtrl oSku={curSkuInCart} />
      ) : (
        <CustomShoppingButton
          disabled={skuPostStatus === "loading"}
          handleFunc={() => onSkuChange(null, skus[0]._id, 1)}
        />
      )}
    </div>
  );
}
