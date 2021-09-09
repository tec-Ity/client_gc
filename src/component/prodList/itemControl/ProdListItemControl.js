import React, { lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import {
  cartSkuPost,
  cartSkuPut,
  cartSkuDelete,
} from "../../../redux/cart/cartSlice";

const ControlMulti = lazy(() => import("./ControlMulti"));
const ControlSimple = lazy(() => import("./ControlSimple"));

export default function ProdListItemControl(props) {
  const { prod } = props;
  const { Skus: skus, is_simple: isSimple, _id: prodId, Shop: shop } = prod;
  // console.log('prod', props.prod)
  //return only when the current prod is in the cart

  const dispatch = useDispatch();

  const onSkuChange = (oSkuId = null, sku, qty) => {
    if (oSkuId) {
      if (qty > 0) dispatch(cartSkuPut({ oSkuId, qty, prodId: prod._id }));
      else dispatch(cartSkuDelete({ oSkuId, prodId: prod._id }));
    } else {
      dispatch(cartSkuPost({ sku, qty, prod }));
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
