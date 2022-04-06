import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import { useHistory, useParams } from "react-router";
import HomeList from "../home/HomeList";
import { useSelector, useDispatch } from "react-redux";
import { fetchShops } from "../../redux/shop/shopSlice";
import HomeActivity from "../home/HomeActivity";
import HomeBanner from "../home/HomeBanner";
import HomeBg from "../home/HomeBg";
import { useTranslation } from "react-i18next";
export default function City() {
  const { t } = useTranslation();
  const { cityCode } = useParams();
  const dispatch = useDispatch();
  const hist = useHistory();
  // user current city code (MI)
  const userSelectedLocation = useSelector(
    (state) => state.curClient.userSelectedLocation
  );
  const shops = useSelector((state) => state.shop.shops);
  const shopsStatus = useSelector((state) => state.shop.shopsStatus);
  const [sortedShopList, setSortedShopList] = useState([]);
  const [disableIndex, setDisableIndex] = useState();
  //   //console.log(cityCode);
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
    <>
      <HomeBg style={view === "web" ? { top: "-200px" } : {}} />
      <div style={{ position: "relative", top: "-130px" }}>
        <HomeActivity />
      </div>
      <Container maxWidth={false} disableGutters>
        {sortedShopList.length === 0 && <HomeBanner />}
        <div style={{ height: "100px" }}></div>
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
      </Container>
    </>
  );
}
