import React from "react";
import ShopProdSectionHome from "./ShopProdSectionHome";
import ProdSectionExpand from "../../../component/prodExpand/ProdExpand";
import { useSelector } from "react-redux";

export default function ShopProdSection(props) {
  const isHome = useSelector((state) => state.filter.isHome);

  return (
    <div>
      {isHome === false ? <ProdSectionExpand /> : <ShopProdSectionHome />}
    </div>
  );
}
