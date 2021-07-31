import React from "react";

export default function ProdListItem(props) {
  const { prod } = props;
  return (
    <div>
      <div>-Name:{prod.nome}</div>
      <div>
        <ItemControl Skus={prod.Skus} />
      </div>
    </div>
  );
}

function ItemControl(props) {
  const { Skus } = props;
  return (
    <>
      <div>
        Sku:
        {Skus.length > 1
          ? Skus.map((sku) =>
              sku.attrs?.map((attr) => attr.nome + ":" + attr.option + " , ")
            )
          : "默认"}
      </div>

      <div>{Skus.length > 1 ? <button >选</button> : <button>+</button>}</div>
    </>
  );
}
