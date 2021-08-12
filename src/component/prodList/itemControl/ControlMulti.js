import React, { useState, useEffect } from "react";
import ControlMultiSkus from "./ControlMultiSkus";
import { useSelector } from "react-redux";
import { selectCurProdInCart } from "../../../redux/cart/cartSlice";

export default function ControlMulti(props) {
  const { skus, onSkuChange, prodId, shop } = props;
  const [showSkuList, setShowSkuList] = useState(false);
  const [totCount, setTotCount] = useState();
  console.log('MULTI')
  const curProdInCart = useSelector(selectCurProdInCart(prodId, shop));

  useEffect(() => {
    
    const displayTotalCount = () => {
      if (curProdInCart) {
        //sum sku quantity
        let count = 0;
        for (let i = 0; i < curProdInCart.OrderSkus.length; i++) {
          if (skus.find((sku) => sku._id === curProdInCart.OrderSkus[i].Sku)) {
            count += curProdInCart.OrderSkus[i].quantity;
          }
        }
        setTotCount(count);
      }
    };
    displayTotalCount();
  }, [skus, curProdInCart]);

  return (
    <div>
      {showSkuList === false && (
        <button
          onClick={() => {
            setShowSkuList(true);
          }}>
          选 {curProdInCart && totCount && `(${totCount})`}
        </button>
      )}

      {showSkuList === true && (
        <ControlMultiSkus
          skus={skus}
          curProdInCart={curProdInCart}
          showSkuList={showSkuList}
          onHide={() => setShowSkuList(false)}
          onSkuChange={onSkuChange}
        />
      )}
    </div>
  );
}
