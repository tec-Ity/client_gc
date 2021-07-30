import React from "react";
import ProdSectionHome from "./ShopProdSectionHome";
import ProdSectionExpand from "../../../component/prodExpand/ProdExpand";
import { useSelector, useDispatch } from "react-redux";

export default function ShopProdSection(props) {
  const isHome = useSelector((state) => state.filter.isHome);
  



  return (
    <>
      ProdSection
      {isHome === false ? (
        <ProdSectionExpand />
      ) : (
        <ProdSectionHome />
      )}
    </>
  );
}
