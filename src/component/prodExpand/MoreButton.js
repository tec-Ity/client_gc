import React from "react";

export default function MoreButton(props) {
  return (
    <div>
      <button
        onClick={() => {
          document.getElementById(props.farId + "categBar").click();
        }}>
        display more
      </button>
    </div>
  );
}
