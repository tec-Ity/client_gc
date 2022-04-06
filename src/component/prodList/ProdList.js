import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import { fetchProdListQuery } from "../../redux/shop/shopSlice";
import ProdListItem from "./ProdListItem";

export default function ProdList(props) {
  const {
    style = "card",
    queryURL,
    type = "expand",
    prods,
    isReload = true,
  } = props;
  const dispatch = useDispatch();
  const prodListQuery = useSelector((state) => state.shop.prodListQuery);
  const prodListQueryStatus = useSelector(
    (state) => state.shop.prodListQueryStatus
  );
  //   const prodErrorQuery = useSelector((state) => state.shop.prodErrorQuery);

  const [list, setList] = useState();
  const expandRule = { xs: 6, sm: 6, md: 4 };
  const notExpRule = { xs: 6, sm: 4, md: 3 };

  useEffect(() => {
    queryURL && dispatch(fetchProdListQuery({ queryURL, isReload }));
  }, [queryURL, dispatch]);

  const getProdList = React.useCallback((prodListQuery) => {
    if (style === "card") {
      const prodListTemp = prodListQuery?.map((prod) => {
        return (
          prod && (
            <ProdListItem
              prod={prod}
              key={prod?._id}
              rule={type === "expand" ? expandRule : notExpRule}
            />
          )
        );
      });

      if (type === "expand") {
        if (prodListTemp.length % 3 > 1) {
          prodListTemp.push(
            <ProdListItem
              key="empty"
              empty={true}
              rule={type === "expand" ? expandRule : notExpRule}
            />
          );
        }
      }
      return prodListTemp;
    }
  }, []);

  useEffect(() => {
    const displayResult = () => {
      if (prodListQueryStatus === "loading") {
        isReload === true && setList(<Grid item></Grid>);
      } else if (prodListQueryStatus === "succeed") {
        prodListQuery?.length > 0
          ? setList(getProdList(prodListQuery))
          : setList(<Grid item>暂无产品</Grid>);
      }
    };
    displayResult();
  }, [getProdList, isReload, prodListQuery, prodListQueryStatus]);

  // const displayProdsFromParent = () => {};

  return (
    <Grid container alignItems="center" justifyContent="space-between">
      {queryURL ? list : getProdList(prods)}
    </Grid>
  );
}
