import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
export default function ControlMultiSkus(props) {
  const { skus, curProdInCart, showSkuList, onHide, onSkuChange } = props;
  const [skuList, setSkuList] = useState();
  const skuPostStatus = useSelector((state) => state.cart.skuPostStatus);
  const skuPutStatus = useSelector((state) => state.cart.skuPutStatus);

  useEffect(() => {
    const generateList = () => {
      if (showSkuList === true && skus.length > 0) {
        const tempSkuList = [];
        skus.forEach((sku) => {
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
            });
          }
        });
        setSkuList(tempSkuList);
      }
    };
    generateList();
  }, [skus, curProdInCart, showSkuList]);

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
    <div style={{ border: "1px solid" }}>
      {skuList?.map((sku) => {
        console.log(sku);
        return (
          <div key={sku.id}>
            {sku.attrs &&
              sku.attrs.map((attr) => {
                return (
                  <span key={attr.nome}>
                    <span>{attr.nome}</span>:<span>{attr.option}</span>
                    &nbsp;
                  </span>
                );
              })}

            {sku.orderSkuId && sku.quantity > 0 ? (
              <>
                <>{buttonDec(sku)}</>
                <>{sku.quantity}</>
                <>{buttonInc(sku)}</>
              </>
            ) : (
              <>{buttonNew(sku)}</>
            )}
          </div>
        );
      })}
      <button onClick={onHide}>确认</button>
    </div>
  );
}
