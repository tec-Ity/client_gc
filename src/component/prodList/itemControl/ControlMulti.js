import React, { useState, useEffect } from "react";
import ControlMultiSkus from "./ControlMultiSkus";
import CustomShoppingButton from "../../global/button/CustomShoppingButton";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowAddrSel,
  setShowLogin,
} from "../../../redux/curClient/curClientSlice";
import { useLocation } from "react-router-dom";
export default function ControlMulti(props) {
  const {
    skus, //shopslice prodlistQuery .prod .skus
    onSkuChange,
    curProdInCart,
    large = false,
  } = props;
  const dispatch = useDispatch();
  const param = new URLSearchParams(useLocation().search);
  const [showSkusModal, setShowSkusModal] = useState(false);
  const [totCount, setTotCount] = useState();
  const isLogin = useSelector((state) => state.curClient.isLogin);
  const userSelectedLocation = useSelector(
    (state) => state.curClient.userSelectedLocation
  );
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

  const handleShowSkuMulti = () => {
    if (!isLogin) dispatch(setShowLogin(true));
    else if (!userSelectedLocation) dispatch(setShowAddrSel(true));
    else setShowSkusModal(true);
  };

  return (
    <div>
      {showSkusModal === false && (
        <CustomShoppingButton
          large={large}
          multi
          handleFunc={handleShowSkuMulti}
          count={curProdInCart && totCount && totCount}
          disabled={
            param.get("disabled") === "true" ||
            !isLogin ||
            !userSelectedLocation
          }
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
