import React from "react";
import ProdListItemControl from './itemControl/ProdListItemControl'


export default function ProdListItem(props) {
  const { prod } = props;
  return (
    <div>
      <div>-Name:{prod.nome}</div>
      <div>
        <ProdListItemControl prod={prod}/>
      </div>
    </div>
  );
}


