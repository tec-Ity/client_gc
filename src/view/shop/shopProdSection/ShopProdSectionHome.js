import React, { useEffect, Fragment } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

export default function ShopProdSectionHome(props) {
  const hist = useHistory();
  const prodList = useSelector((state) => state.shop.prodList);
  const prodListStatus = useSelector((state) => state.shop.prodStatus);
  const prodListerror = useSelector((state) => state.shop.prodError);

  return (
    <>
      <ul>
        {prodListStatus === "loading" && <div>loading......</div>}
        {prodListStatus === "failed" && <div>{prodListerror}</div>}
        {prodListStatus === "succeed" &&
          prodList.length > 0 &&
          prodList.map((prodsObj) => {
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
          })}
      </ul>
    </>
  );
}
