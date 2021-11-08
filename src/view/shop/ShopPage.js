import React, { useEffect } from "react";
import { useParams } from "react-router";
import ShopSideBar from "./ShopSideBar/ShopSideBar";
import ShopBanner from "./ShopBanner";
import ShopProdSection from "./shopProdSection/ShopProdSection";
import { makeStyles } from "@material-ui/core/styles";
import {
  fetchProdList,
  fetchCategList,
  setCurShop,
  fetchCurShopInfo,
} from "../../redux/shop/shopSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurCartByShop,
  setInShop,
  setIsExpand,
} from "../../redux/cart/cartSlice";
import { Container, Grid } from "@material-ui/core";
import { goBack } from "../../redux/filter/filterSlice";
const useStyle = makeStyles((theme) => ({
  root: {
    position: "absolute",
    width: "100%",
    minWidth: "640px",
    left: "0",
    right: "0",
    // overflow: "hidden",
  },
  mainSecStyle: {
    padding: "50px",
  },
  gridItemStyle: {
    padding: "0",
    // border:'1px solid'
  },
}));

export default function ShopPage() {
  const classes = useStyle();
  const { _id } = useParams();
  //   const hist = useHistory();
  const dispatch = useDispatch();
  const categs = useSelector((state) => state.shop.categList);
  const prevShopId = useSelector((state) => state.shop.curShop);
  const categStatus = useSelector((state) => state.shop.categStatus);
  // const categError = useSelector((state) => state.shop.categError);
  //   const curShopInfoStatus = useSelector(
  //     (state) => state.shop.curShopInfoStatus
  //   );
  useEffect(() => {
    window.document.getElementsByTagName("html")[0].style.scrollBehavior =
      "smooth";
    window.scrollTo(0, 0);

    setTimeout(function () {
      window.scrollTo(0, 0);
    }, 500);
  }, []);
  useEffect(() => {
    // 会渲染好几次sideBar并console好几次
    dispatch(setInShop(true));

    if (prevShopId !== _id) {
      //shopInfo
      dispatch(fetchCurShopInfo(_id));
      //cart
      dispatch(setCurCartByShop(_id));

      //call categ only once for every shops
      (categStatus === "idle" || categStatus === "error") &&
        dispatch(fetchCategList());
      // console.log("status", categStatus);
      if (categStatus === "succeed") {
        dispatch(setCurShop(_id));
        dispatch(fetchProdList(categs));
        dispatch(setIsExpand(_id));
      }
    }
    return () => {
      dispatch(setInShop(false));
      dispatch(goBack());
    };
  }, [_id, categStatus, categs, dispatch, prevShopId]);

  //   const goBack = () => {
  //     hist.goBack();
  //   };

  return (
    <Container disableGutters maxWidth={false} className={classes.root}>
      <ShopBanner />
      {/* extract shop info from ShopBanner to new compo in the future */}
      <Container disableGutters>
        {/* <ShopSelection /> */}

        {/* <DemoSideBar /> */}
        {categs?.length > 0 && (
          <Grid container className={classes.mainSecStyle} spacing={3}>
            <Grid item sm={4} md={3} className={classes.gridItemStyle}>
              <ShopSideBar categs={categs} />
            </Grid>
            <Grid item xs={12} sm={8} md={9} className={classes.gridItemStyle}>
              <ShopProdSection />
            </Grid>
          </Grid>
        )}
      </Container>
    </Container>
  );
}
