import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import { fetch_Prom } from "../../api";
// import { useSelector, useDispatch } from "react-redux";

import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import HomeList from "./HomeList";
import HomeBanner from "./HomeBanner";
import HomeActivity from "./HomeActivity";
import HomeBg from "./HomeBg";
import { useDispatch, useSelector } from "react-redux";
import { fetchShops } from "../../redux/shop/shopSlice";
import ucShipRange from "../../component/icon/unioncityhomerange.jpg";
const useStyle = makeStyles((theme) => ({
  root: { fontFamily: "Montserrat", position: "relative" },
  bg: {
    width: "200px",
    height: "24px",
  },
  txt: {
    fontSize: "30px",
    paddingBottom: "6px",
  },
  shipBox: {
    position: "absolute",
    top: "100vh",
    [theme.breakpoints.up("lg")]: {
      top: "110vh",
    },
    paddingLeft: 80,
  },
}));
export default function HomePage() {
  const { t } = useTranslation();
  //   const dispatch = useDispatch();
  const classes = useStyle();
  //   const isLogin = useSelector((state) => state.curClient.isLogin);
  const hist = useHistory();
  const [citys, setCitys] = useState();
  // useEffect(() => {
  //   async function getCitys() {
  //     try {
  //       const resultCitys = await fetch_Prom("/Citas");
  //       // //console.log("citas", resultCitys);
  //       if (resultCitys.status === 200) {
  //         setCitys(resultCitys.data.objects);
  //       } else {
  //         //console.log(resultCitys.message);
  //       }
  //     } catch (e) {
  //       //console.log(e);
  //     }
  //   }
  //   getCitys();
  // }, []);

  //   const handleFunc = () => {
  //     if (!isLogin) {
  //       dispatch(setShowLogin(true));
  //     } else {
  //       dispatch(setShowAddrSel(true));
  //     }
  //   };

  //citys

  // const { cityCode } = useParams();
  const dispatch = useDispatch();
  // user current city code (MI)
  const userSelectedLocation = useSelector(
    (state) => state.curClient.userSelectedLocation
  );
  const shops = useSelector((state) => state.shop.shops);
  const shopsStatus = useSelector((state) => state.shop.shopsStatus);
  const [sortedShopList, setSortedShopList] = useState([]);
  const [disableIndex, setDisableIndex] = useState();
  //   //console.log(cityCode);
  const cityCode = "PO";
  const view = useSelector((state) => state.root.view);
  useEffect(() => {
    function getShops() {
      shopsStatus === "idle" && dispatch(fetchShops());
      if (shopsStatus === "succeed") {
        // //console.log(shops);
        // //console.log(userSelectedLocation);
        const shopWithCity = [];
        const shopWithServe = [];
        const shopNonValid = [];
        const city = cityCode
          ? cityCode
          : userSelectedLocation
          ? userSelectedLocation.city
          : " ";
        shops &&
          shops.length > 0 &&
          city &&
          shops.forEach((shop) => {
            if (shop.Cita.code === city) shopWithCity.push(shop);
            else if (shop.serve_Citas.find((sc) => sc.Cita.code === city)) {
              shopWithServe.push(shop);
            } else shopNonValid.push(shop);
          });
        setSortedShopList([...shopWithCity, ...shopWithServe, ...shopNonValid]);
        setDisableIndex(shopWithCity.length + shopWithServe.length);
      }
    }
    getShops();
  }, [cityCode, dispatch, shops, shopsStatus, userSelectedLocation]);
  return (
    <Container disableGutters maxWidth={false} className={classes.root}>
      <HomeBg />

      {/* <div style={{ position: "relative" }}>
        <HomeActivity />
      </div> */}
      <HomeBanner />
      {/* <HomeList
        label={t("home.locals")}
        list={citys}
        containerId='cityContainer'
        handleFunc={(item) => () => hist.push("/city/" + item.code)}
      /> */}
      <HomeList
        label={t("home.shops")}
        list={sortedShopList}
        disableIndex={disableIndex}
        containerId="shopContainer"
        handleFunc={(item, disabled) => () => {
          hist.push(
            "/shop/" + item._id + (disabled === true ? "?disabled=true" : "")
          );
        }}
      />
      <div className={classes.shipBox}>
        {/* <CustomBgText
          label={"配送须知"}
          style={{ bg: classes.bg, txt: classes.txt }}
        /> */}
        <Grid
          container
          style={{
            width: "80%",
            borderRadius: "20px",
            backgroundColor: "#c0e57b30",
            padding: 20,
          }}
        >
          <Grid item xs={4}>
            <p style={{ fontSize: 18 }}>普拉托同城配送须知：</p>
            <p>同城配送运费为8€，</p>
            <p>购物满50€3公里内免运费，</p>
            <p>满100€的订单6公里内免运费。</p>
            <p>大袋米跟整提水不计算在免运份额内，</p>
            <p>下单后当日送达。</p>
            <br />
            <p>蔬菜、肉类、部分水果、海鲜等商品</p>
            <p>价格因无法准确重量，因此价格会稍有浮动，</p>
            <p>最终价格以收据小票的价格为准</p>
          </Grid>
          <Grid item xs={4}>
            <p style={{ fontSize: 18 }}>意大利境内配送货物：</p>
            <p>意大利全国快递寄送，2-4天送达。</p>
            <p>因疫情、地区原因，送达时间或有延长。</p>
            <p> 因运输时间问题，新鲜肉类、鸡蛋、果蔬、</p>
            <p>奶制品等商品无法寄送，请不要下单，</p>
            <p>以免给您带来不好的购物体验。</p>
            <br />
            <p>全境快递费用为15€</p>
            <p>（费用包含包装费、运费）</p>
            <p>我们为您的商品提供了保护性的打包，</p>
            <p>并为每份快递购买了保险，</p>
            <p>保险费用为每公斤赔付6欧元，</p>
            <p>请放心下单！</p>
          </Grid>
          <Grid
            container
            item
            xs={4}
            style={{
              flexdirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={ucShipRange}
              alt=""
              style={{ width: "90%", height: "90%", objectFit: "scale-down" }}
            />
            <p>配送范围</p>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
