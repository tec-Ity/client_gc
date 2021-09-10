import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProdListQuery } from "../../redux/shop/shopSlice";
import ProdListItem from "./ProdListItem";

export default function ProdList(props) {
  const { style = "card", queryURL, type = "expand", prods } = props;
  const dispatch = useDispatch();
  const prodListQuery = useSelector((state) => state.shop.prodListQuery);
  const prodStatusQuery = useSelector((state) => state.shop.prodStatusQuery);
  const prodErrorQuery = useSelector((state) => state.shop.prodErrorQuery);

  const expandRule = { xs: 6, sm: 6, md: 4 };
  const notExpRule = { xs: 6, sm: 4, md: 3 };

  useEffect(() => {
    queryURL && dispatch(fetchProdListQuery(queryURL));
  }, [queryURL, dispatch]);

  const displayResult = () => {
    // console.log("status", prodStatusQuery);
    if (prodStatusQuery === "loading") {
      return <Grid item>Loading......</Grid>;
    } else if (prodStatusQuery === "succeed") {
      return prodListQuery?.length > 0 ? (
        getProdList(prodListQuery)
      ) : (
        <Grid item>暂无产品</Grid>
      );
    } else if (prodStatusQuery === "error") {
      return <div>{prodErrorQuery}</div>;
    }
  };

  const getProdList = (prodListQuery) => {
    if (style === "card") {
      return prodListQuery?.map((prod) => {
        return (
          <ProdListItem
            prod={prod}
            key={prod._id}
            rule={type === "expand" ? expandRule : notExpRule}
          />
        );
      });
    }
  };

  // const displayProdsFromParent = () => {};

  return (
    <Grid container justifyContent='center' alignItems='center' spacing={5}>
      {queryURL ? displayResult() : getProdList(prods)}
    </Grid>
  );
}
