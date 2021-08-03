import React, { useState, useEffect } from "react";
import ControlMultiSkus from "./ControlMultiSkus";

export default function ControlMulti(props) {
  const { curProdInCart, Skus, onSkuChange } = props;
  const [showSkuList, setShowSkuList] = useState(false);
  const [totCount, setTotCount] = useState(0);

  useEffect(() => {
    const displayTotalCount = () => {
      if (curProdInCart) {
        //sum sku quantity
        let count = 0;
        for (let i = 0; i < curProdInCart.OrderSkus.length; i++) {
          if (Skus.find((sku) => sku._id === curProdInCart.OrderSkus[i].Sku)) {
            count += curProdInCart.OrderSkus[i].Sku.quantity;
          }
        }
        setTotCount(count);
      }
    };
    displayTotalCount();
  }, [Skus, curProdInCart]);

  return (
    <div>
      <button
        onClick={() => {
          setShowSkuList(true);
        }}>
        选{curProdInCart && `(${totCount})`}
      </button>

      {showSkuList === true && (
        <ControlMultiSkus
          Skus={Skus}
          curProdInCart={curProdInCart}
          showSkuList={showSkuList}
          onHide={() => setShowSkuList(false)}
          onSkuChange={onSkuChange}
        />
      )}
    </div>
  );
}
