import React, { lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import { fetchSkuPost, fetchSkuPut } from "../../../redux/cart/cartSlice";

const ControlMulti = lazy(() => import("./ControlMulti"));
const ControlSimple = lazy(() => import("./ControlSimple"));

export default function ProdListItemControl(props) {
  const {
    Skus: skus,
    is_simple: isSimple,
    _id: prodId,
    Shop: shop,
  } = props.prod;
  // console.log('prod', props.prod)
  //return only when the current prod is in the cart

  const dispatch = useDispatch();

  const onSkuChange = (orderSku = null, sku, Qty) => {
    console.log(sku)
    console.log("qty", Qty);
    if (orderSku) {
      dispatch(fetchSkuPut({ orderSku, Qty }));
    } else {
      dispatch(fetchSkuPost({ sku, Qty }));
    }
  };

  return (
    <Suspense fallback={<div>Loading......</div>}>
      {isSimple === true ? (
        <ControlSimple
          prodId={prodId}
          skus={skus}
          shop={shop}
          onSkuChange={onSkuChange}
        />
      ) : (
        <ControlMulti
          prodId={prodId}
          skus={skus}
          shop={shop}
          onSkuChange={onSkuChange}
        />
      )}
    </Suspense>
  );
}
