import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSkuPut } from "../../redux/cart/cartSlice";

export default function CartSkuCtrl({ oSku }) {
  const dispatch = useDispatch();
  const skuPutStatus = useSelector((state) => state.cart.skuPutStatus);
  return (
    <div>
      <button
        disabled={skuPutStatus === "loading"}
        onClick={() =>
          dispatch(
            fetchSkuPut({ orderSkuId: oSku._id, Qty: oSku.quantity - 1 })
          )
        }>
        {oSku.quantity === 1 ? "删除" : "-"}
      </button>
      <input
        value={oSku.quantity}
        onChange={(e) =>
          dispatch(fetchSkuPut({ orderSkuId: oSku._id, Qty: e.target.value }))
        }
      />
      <button
        disabled={skuPutStatus === "loading"}
        onClick={() =>
          dispatch(
            fetchSkuPut({ orderSkuId: oSku._id, Qty: oSku.quantity + 1 })
          )
        }>
        +
      </button>
    </div>
  );
}
