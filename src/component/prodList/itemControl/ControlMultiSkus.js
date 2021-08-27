import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomModal from "../../global/modal/CustomModal";
import ControlMultiSkusUI from "./ControlMultiSkusUI";

export default function ControlMultiSkus(props) {
  const { skus, curProdInCart, show, handleClose, onSkuChange } = props;
  const [skuList, setSkuList] = useState();
  const skuPostStatus = useSelector((state) => state.cart.skuPostStatus);
  const skuPutStatus = useSelector((state) => state.cart.skuPutStatus);

  useEffect(() => {
    const generateList = () => {
      if (show === true && skus.length > 0) {
        const tempSkuList = [];
        skus.forEach((sku) => {
          console.log('sku', sku)
          if (sku.attrs) {
            let curSkuQtyInCart = null;
            let curSkuInCartTemp = null;
            if (curProdInCart) {
              curSkuInCartTemp = curProdInCart.OrderSkus.find(
                (os) => os.Sku === sku._id
              );
              if (curSkuInCartTemp) {
                curSkuQtyInCart = curSkuInCartTemp.quantity;
              }
            }
            tempSkuList.push({
              id: sku._id,
              quantity: curSkuQtyInCart,
              attrs: sku.attrs,
              orderSkuId: curSkuInCartTemp?._id,
              price_regular:sku.price_regular,
              price_sale:sku.price_sale,

            });
          }
        });
        setSkuList(tempSkuList);
      }
    };
    generateList();
  }, [skus, curProdInCart, show]);

  const modifySkuCount = (skuId, qty) => {
    const newSkuList = skuList.map((sku) => {
      if (sku.id === skuId) {
        return {
          ...sku,
          quantity: qty,
        };
      }
      return sku;
    });

    setSkuList(newSkuList);
  };

  const buttonDec = (sku) => (
    <button
      disabled={skuPutStatus === "loading"}
      onClick={() => {
        onSkuChange(sku.orderSkuId, null, sku.quantity - 1);
        modifySkuCount(sku.id, sku.quantity - 1);
      }}>
      {sku.quantity === 1 ? "删除" : "-"}
    </button>
  );

  const buttonInc = (sku) => (
    <button
      disabled={skuPutStatus === "loading"}
      onClick={() => {
        onSkuChange(sku.orderSkuId, null, sku.quantity + 1);
        modifySkuCount(sku.id, sku.quantity + 1);
      }}>
      +
    </button>
  );

  const buttonNew = (sku) => (
    <button
      disabled={skuPostStatus === "loading"}
      onClick={() => {
        onSkuChange(null, sku.id, 1);
        modifySkuCount(sku.id, 1);
      }}>
      +
    </button>
  );

  return (
    <CustomModal show={show} handleClose={handleClose} small>
      <ControlMultiSkusUI
        skuList={skuList}
        buttonInc={buttonInc}
        buttonDec={buttonDec}
        buttonNew={buttonNew}
        handleClose={handleClose}
      />
    </CustomModal>
  );
}
