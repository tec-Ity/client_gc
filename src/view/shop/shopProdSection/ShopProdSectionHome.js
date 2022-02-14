import React, { Fragment } from "react";
// import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import ProdExpand from "../../../component/prodExpand/ProdExpand";

export default function ShopProdSectionHome(props) {
  // const hist = useHistory();
  const prodList = useSelector((state) => state.shop.prodList);
  const prodListStatus = useSelector((state) => state.shop.prodStatus);
  const prodListerror = useSelector((state) => state.shop.prodError);

  const expandList =
    prodList &&
    prodList.map((categ) => {
      return (
        categ.list.length > 0 && (
          <ProdExpand
            prods={categ.list}
            title={{ desp: categ.far.code, img: categ.img }}
            far={categ.far}
            key={categ.id}
          />
        )
      );
    });

  return expandList;

  // return (
  //   <>
  //     {prodListStatus === "loading" && <div>loading......</div>}
  //     {prodListStatus === "failed" && <div>{prodListerror}</div>}
  //     {prodListStatus === "succeed" && <div>{expandList}</div>}
  //   </>
  // );
}
