import React, { useState, useEffect } from "react";
import ControlMultiSkus from "./ControlMultiSkus";
import { useSelector } from "react-redux";
import { selectCurProdInCart } from "../../../redux/cart/cartSlice";
import CustomShoppingButton from "../../global/button/CustomShoppingButton";

export default function ControlMulti(props) {
  const { skus, //shopslice prodlistQuery .prod .skus
     onSkuChange, prodId, shop } = props;
  const [showSkusModal, setShowSkusModal] = useState(false);
  const [totCount, setTotCount] = useState();
  // console.log('MULTI')
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
      {showSkusModal === false && (
        <CustomShoppingButton
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
