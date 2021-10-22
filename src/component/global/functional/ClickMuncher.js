import React from "react";

export default function ClickMuncher({ children }) {
  return <div onClick={(e) => e.stopPropagation()}>{children}</div>;
}
