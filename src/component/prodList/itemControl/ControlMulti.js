import React, { useState, useEffect } from "react";
import ControlMultiSkus from "./ControlMultiSkus";
import CustomShoppingButton from "../../global/button/CustomShoppingButton";

export default function ControlMulti(props) {
  const {
    skus, //shopslice prodlistQuery .prod .skus
    onSkuChange,
    curProdInCart,
    large = false,
  } = props;
  const [showSkusModal, setShowSkusModal] = useState(false);
  const [totCount, setTotCount] = useState();

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
      {showSkusModal === false && (
        <CustomShoppingButton
          large={large}
          multi
          handleFunc={() => {
            setShowSkusModal(true);
          }}
          count={curProdInCart && totCount && totCount}
        />
      )}

      {showSkusModal === true && (
        <ControlMultiSkus
          show={showSkusModal}
          handleClose={() => setShowSkusModal(false)}
          skus={skus}
          curProdInCart={curProdInCart}
          onSkuChange={onSkuChange}
        />
      )}
    </div>
  );
}
