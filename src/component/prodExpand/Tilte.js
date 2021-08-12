import React from "react";

export default function ExpandTilte(props) {
  const { title } = props;
  return (
    <div>
      {title.desp && (
        <div>
          <div>---{title.desp}---</div>
          {title.img ? <img src={title.img} alt={title.desp} /> : <div></div>}
        </div>
      )}
    </div>
  );
}
