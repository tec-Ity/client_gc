import React, { useState } from "react";

export default function ControlSimple(props) {
  const { Skus, curProdInCart, onSkuChange } = props;

  const [skuQty, setSkuQty] = useState(curProdInCart?.OrderSkus[0].quantity);



  return (
    <div>
      {curProdInCart ? (
        <>
          <button
            onClick={() => {
              onSkuChange(curProdInCart.OrderSkus[0], skuQty - 1);
              setSkuQty((prev) => prev - 1);
            }}>
            -
          </button>
          {skuQty}
          <button
            onClick={() => {
              onSkuChange(curProdInCart.OrderSkus[0], skuQty + 1);
              setSkuQty((prev) => prev + 1);
            }}>
            +
          </button>
        </>
      ) : (
        <button onClick={() => onSkuChange(Skus[0]._id, 1)}>+</button>
      )}
    </div>
  );
}
