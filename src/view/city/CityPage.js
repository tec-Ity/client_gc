import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import { useHistory } from "react-router";
import HomeBanner from "../home/HomeBanner";
import HomeList from "../home/HomeList";
import { useSelector, useDispatch } from "react-redux";
import { fetchShops } from "../../redux/shop/shopSlice";

export default function City() {
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
  useEffect(() => {
    function getShops() {
      shopsStatus === "idle" && dispatch(fetchShops());
      if (shopsStatus === "succeed") {
        console.log(shops);
        console.log(userSelectedLocation);
        const shopWithCity = [];
        const shopWithServe = [];
        const shopNonValid = [];

        shops &&
          shops.length > 0 &&
          userSelectedLocation?.city &&
          shops.forEach((shop) => {
            if (shop.Cita.code === userSelectedLocation.city)
              shopWithCity.push(shop);
            else if (
              shop.serve_Citas.find(
                (sc) => sc.Cita.code === userSelectedLocation.city
              )
            ) {
              shopWithServe.push(shop);
            } else shopNonValid.push(shop);
          });
        setSortedShopList([...shopWithCity, ...shopWithServe, ...shopNonValid]);
        setDisableIndex(shopWithCity.length + shopWithServe.length);
      }
    }
    getShops();
  }, [dispatch, shops, shopsStatus, userSelectedLocation]);

  return (
    <Container maxWidth={false} disableGutters>
      <HomeBanner />
      <HomeList
        list={sortedShopList}
        disableIndex={disableIndex}
        containerId='shopContainer'
        handleFunc={(id) => () => {
          hist.push("/shop/" + id);
        }}
      />
    </Container>
  );
}
