import React, { Fragment } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import ProdExpand from "../../../component/prodExpand/ProdExpand";

export default function ShopProdSectionHome(props) {
  const hist = useHistory();
  const prodList = useSelector((state) => state.shop.prodList);
  const prodListStatus = useSelector((state) => state.shop.prodStatus);
  const prodListerror = useSelector((state) => state.shop.prodError);

  const expandList =
    prodList &&
    prodList.map((categ) => {
      return (
        <ProdExpand
          prods={categ.list}
          title={{ desp: categ.far.code }}
          far={categ.far}
          key={categ.id}
        />
      );
    });

  return (
    <>
      {prodListStatus === "loading" && <div>loading......</div>}
      {prodListStatus === "failed" && <div>{prodListerror}</div>}
      {prodListStatus === "succeed" && <div>{expandList}</div>}
      {console.log(prodList)}
    </>
  );
}

/**&&
        prodList.length > 0 &&
        prodList.map((prodsObj) => {
          //gets the value of prodsObj and then get list attr
          const prods = Object.values(prodsObj)[0].list;
          let prodsLine =
            prods.length > 0 ? (
              prods.map((prod) => {
                return (
                  <li
                    key={prod._id}
                    onClick={() => hist.push("/prod/" + prod._id)}>
                    {prod.nome}
                  </li>
                );
              })
            ) : (
              <li>empty</li>
            );

          return (
            <Fragment key={Object.keys(prodsObj)[0]}>
              <li>
                {Object.values(prodsObj)[0].far}
                <ul>{prodsLine}</ul>
              </li>
            </Fragment>
          );
        }) */
