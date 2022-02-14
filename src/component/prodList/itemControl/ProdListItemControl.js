import React, { lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cartSkuPost,
  cartSkuPut,
  cartSkuDelete,
} from "../../../redux/cart/cartSlice";
import { selectCurProdInCart } from "../../../redux/cart/cartSlice";

const ControlMulti = lazy(() => import("./ControlMulti"));
const ControlSimple = lazy(() => import("./ControlSimple"));

export default function ProdListItemControl(props) {
  const { prod, large = false } = props;
  const { Skus: skus, is_simple: isSimple, _id: prodId, Shop: shop } = prod;
  //   const curCart = useSelector((state) => state.cart.curCart);
  //   const userSelectedLocation = useSelector(
  //     (state) => state.curClient.userSelectedLocation
  //   );
  const dispatch = useDispatch();

  const onSkuChange = (oSkuId = null, sku, qty) => {
    if (oSkuId) {
      if (qty > 0) dispatch(cartSkuPut({ oSkuId, qty, prodId: prod._id }));
      else dispatch(cartSkuDelete({ oSkuId, prodId: prod._id }));
    } else {
      dispatch(cartSkuPost({ sku, qty, prod }));
    }
  };
  const curProdInCart = useSelector(selectCurProdInCart(prodId, shop));
  // console.log(curProdInCart);
  // console.log(shop);

  return (
    <Suspense fallback={<div>Loading......</div>}>
      {isSimple === true ? (
        <ControlSimple
          large={large}
          sku={skus[0]}
          onSkuChange={onSkuChange}
          curSkuInCart={curProdInCart?.OrderSkus[0]}
        />
      ) : (
        <ControlMulti
          large={large}
          skus={skus}
          onSkuChange={onSkuChange}
          curProdInCart={curProdInCart}
        />
      )}
    </Suspense>
  );
}
