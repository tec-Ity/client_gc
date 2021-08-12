import React from "react";
import { useSelector } from "react-redux";
import { selectCurProdInCart } from "../../../redux/cart/cartSlice";

export default function ControlSimple(props) {
  const { skus, prodId, shop, onSkuChange } = props;
  const skuPostStatus = useSelector((state) => state.cart.skuPostStatus);
  const skuPutStatus = useSelector((state) => state.cart.skuPutStatus);

  console.log("SIMPLE");

  const curSkuInCart = useSelector(selectCurProdInCart(prodId, shop))
    ?.OrderSkus[0];

  console.log("curPord", curSkuInCart);
  console.log("skus", skus);
  return (
    <div>
      {curSkuInCart ? (
        <>
          <button
            disabled={skuPutStatus === "loading"}
            onClick={() => {
              onSkuChange(curSkuInCart?._id, null, curSkuInCart.quantity - 1);
            }}>
            {curSkuInCart.quantity === 1 ? "删除" : "-"}
          </button>
          {curSkuInCart.quantity}
          <button
            disabled={skuPutStatus === "loading"}
            onClick={() => {
              onSkuChange(curSkuInCart?._id, null, curSkuInCart.quantity + 1);
            }}>
            +
          </button>
        </>
      ) : (
        <button
          disabled={skuPostStatus === "loading"}
          onClick={() => onSkuChange(null, skus[0]._id, 1)}>
          +
        </button>
      )}
    </div>
  );
}
