import React from "react";

export default function ProdExpandTilte(props) {
  const { title } = props;
  return (
    <div>
      <div>{title.desp}</div>
      <div>
        <img src={title.img} alt={title.desp} />
      </div>
    </div>
  );
}
