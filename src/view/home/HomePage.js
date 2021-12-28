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

const useStyle = makeStyles({
  root: { fontFamily: "Montserrat", position: "relative" },
});
export default function HomePage() {
  const { t } = useTranslation();
  //   const dispatch = useDispatch();
  const classes = useStyle();
  //   const isLogin = useSelector((state) => state.curClient.isLogin);
  const hist = useHistory();
  const [citys, setCitys] = useState();
  useEffect(() => {
    async function getCitys() {
      try {
        const resultCitys = await fetch_Prom("/Citas");
        // //console.log("citas", resultCitys);
        if (resultCitys.status === 200) {
          setCitys(resultCitys.data.objects);
        } else {
          //console.log(resultCitys.message);
        }
      } catch (e) {
        //console.log(e);
      }
    }
    getCitys();
  }, []);

  //   const handleFunc = () => {
  //     if (!isLogin) {
  //       dispatch(setShowLogin(true));
  //     } else {
  //       dispatch(setShowAddrSel(true));
  //     }
  //   };

  return (
    <Container disableGutters maxWidth={false} className={classes.root}>
      <HomeBg />
      <div style={{ position: "relative", top: "150px" }}>
        <HomeActivity />
      </div>
      <HomeBanner />
      <HomeList
        label={t("home.locals")}
        list={citys}
        containerId='cityContainer'
        handleFunc={(item) => () => hist.push("/city/" + item.code)}
      />
    </Container>
  );
}
