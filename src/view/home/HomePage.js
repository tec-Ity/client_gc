import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import { fetch_Prom } from "../../api";
// import { useSelector, useDispatch } from "react-redux";

import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import HomeList from "./HomeList";
import HomeBanner from "./HomeBanner";
import HomeActivity from "./HomeActivity";
import HomeBg from "./HomeBg";
import { useDispatch, useSelector } from "react-redux";
import { fetchShops } from "../../redux/shop/shopSlice";
import CustomBgText from "../../component/global/background/CustomBgText";
import ucShipInfo from "../../component/icon/unioncityhomeship.jpg";
import ucShipRange from "../../component/icon/unioncityhomerange.jpg";
const useStyle = makeStyles({
  root: { fontFamily: "Montserrat", position: "relative" },
  bg: {
    width: "200px",
    height: "24px",
  },
  txt: {
    fontSize: "30px",
    paddingBottom: "6px",
  },
});
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
      <div style={{ position: "relative", top: 200, left: 80 }}>
        <CustomBgText
          label={"配送须知"}
          style={{ bg: classes.bg, txt: classes.txt }}
        />
        <img
          src={ucShipInfo}
          alt=""
          style={{ width: 400, position: "absolute", top: 60 }}
        />
        <img
          src={ucShipRange}
          alt=""
          style={{ width: 500, position: "absolute", top: 60, left: 500 }}
        />
      </div>
    </Container>
  );
}
