import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProdListQuery } from "../../redux/shop/shopSlice";
import ProdListItem from "./ProdListItem";
export default function ProdList(props) {
  const { style = "card", queryURL } = props;
  const dispatch = useDispatch();
  const prodListQuery = useSelector((state) => state.shop.prodListQuery);
  const prodStatusQuery = useSelector((state) => state.shop.prodStatusQuery);
  const prodErrorQuery = useSelector((state) => state.shop.prodErrorQuery);

  useEffect(() => {
    queryURL && dispatch(fetchProdListQuery(queryURL));
  }, [queryURL, dispatch]);

  const displayResult = () => {
    // console.log("status", prodStatusQuery);
    if (prodStatusQuery === "loading") {
      return <div>Loading......</div>;
    } else if (prodStatusQuery === "succeed") {
      return prodListQuery.length > 0 ? (
        getProdList(prodListQuery)
      ) : (
        <div>暂无产品</div>
      );
    } else if (prodStatusQuery === "error") {
      return <div>{prodErrorQuery}</div>;
    }
  };

  const getProdList = (prodList) => {
    if (style === "card") {
      return prodList.map((prod) => {
        return <ProdListItem prod={prod} key={prod._id} />;
      });
    }
  };

  // const displayProdsFromParent = () => {};

  return <div>{queryURL ? displayResult() : getProdList(props.prods)}</div>;
}
