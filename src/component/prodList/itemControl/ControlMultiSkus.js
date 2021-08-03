import React, { useEffect, useState } from "react";

export default function ControlMultiSkus(props) {
  const { Skus, curProdInCart, showSkuList, onHide, onSkuChange } = props;
  const [skuList, setSkuList] = useState([]);
  useEffect(() => {
    const generateList = () => {
      if (showSkuList === true && Skus.length > 0) {
        const tempSkuList = [];
        Skus.forEach((sku) => {
          let curSkuQtyInCart = 0;
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
            orderSkuId: curSkuInCartTemp._id,
          });
        });
        setSkuList(tempSkuList);
      }
    };
    generateList();
  }, [Skus, curProdInCart, showSkuList]);

  const modifySkuCount = (skuId, qty) => {
    /**
     * sku = {
          id: sku._id,
          quantity: curSkuQtyInCart,
          attrs: sku.attrs,
          orderSkuId: curSkuInCartTemp._id,
        }
     */
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
      onClick={() => {
        onSkuChange(sku.orderSkuId, null, sku.quantity - 1);
        modifySkuCount(sku.id, sku.quantity - 1);
      }}>
      -
    </button>
  );

  const buttonInc = (sku) => (
    <button
      onClick={() => {
        onSkuChange(sku.orderSkuId, null, sku.quantity + 1);
        modifySkuCount(sku.id, sku.quantity - 1);
      }}>
      +
    </button>
  );

  const buttonNew = (sku) => (
    <button
      onClick={() => {
        onSkuChange(null, sku.id, 1);
        modifySkuCount(sku.id, 1);
      }}>
      +
    </button>
  );

  return (
    <>
      {skuList?.map((sku) => {
        return (
          <React.Fragment key={sku.id}>
            <span>
              {sku.attrs.map((attr) => {
                return (
                  <span key={attr.nome}>
                    <span>{attr.nome}</span>
                    <span>{attr.option}</span>
                  </span>
                );
              })}
            </span>
            {sku.orderSkuId}
            {buttonDec(sku)}
            {sku.quantity}
            {buttonInc(sku)}
          </React.Fragment>
        );
      })}
      <button onClick={onHide}>确认</button>
    </>
  );
}
