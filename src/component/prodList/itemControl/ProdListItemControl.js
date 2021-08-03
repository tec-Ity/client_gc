import React, { useEffect, useState, lazy, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSkuPost, fetchSkuPut } from "../../../redux/cart/cartSlice";

const ControlMulti = lazy(() => import("./ControlMulti"));
const ControlSimple = lazy(() => import("./ControlSimple"));

export default function ProdListItemControl(props) {
  const { Skus, is_simple: isSimple, _id: ProdId, Shop } = props.prod;

  //return only when the current prod is in the cart
  const curProdInCart = useSelector((state) => {
    const prod = state.cart.curCart.OrderProds?.find((op) => op.Prod === ProdId);
    if (prod?.Shop === Shop) return prod;
    else return null;
  });
  const dispatch = useDispatch();

  const onSkuChange = (orderSkuId=null, skuId, Qty) => {
    if (orderSkuId) {
      dispatch(fetchSkuPut(orderSkuId, Qty));
    } else {
      dispatch(fetchSkuPost(skuId, Qty));
    }
  };

  return (
    <Suspense fallback={<div>Loading......</div>}>
      {isSimple === true ? (
        <ControlSimple
          Skus={Skus}
          onSkuChange={onSkuChange}
          curProdInCart={curProdInCart}
        />
      ) : (
        <ControlMulti
          Skus={Skus}
          onSkuChange={onSkuChange}
          curProdInCart={curProdInCart}
        />
      )}
    </Suspense>
  );
}
