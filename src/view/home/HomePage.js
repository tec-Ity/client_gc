import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { fetch_Prom } from "../../api";
import { useSelector, useDispatch } from "react-redux";
import {
  setShowAddrSel,
  setShowLogin,
} from "../../redux/curClient/curClientSlice";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import HomeList from "./HomeList";
import HomeBanner from "./HomeBanner";
import { default as BgTop } from "../../component/icon/homePageBgTop.svg";
import { default as ActivityTitle } from "../../component/icon/activityTitle.svg";
import { default as Activity } from "../../component/icon/activity.svg";

const useStyle = makeStyles({
  root: { fontFamily: "Montserrat" },
  bgTop: {
    position: "absolute",
    top: "80px",
    width: "100%",
    zIndex: "-1",
  },
  activityTitle: {
    position: "absolute",
    top: "854px",
    left: "45px",
    "& >:nth-child(2)": {
      // border:'1px solid',
      position: "absolute",
      left: "20px",
      fontSize: "12px",
    },
  },
  activity: {
    mixBlendMode: "darken",
    position: "absolute",
    maxWidth: "670px",
    width: "100%",
    height: "100%",
    right: "0",
    top: "730px",
    background: "transparent",
  },
  activityText: {
    position: "absolute",
    left: "65px",
    top: "1100px",
    width: "400px",
    height: "167px",
    fontsize: "15px",
    textAlign: "justify",
  },
});
export default function HomePage() {
  const dispatch = useDispatch();
  const classes = useStyle();
  const isLogin = useSelector((state) => state.curClient.isLogin);
  const hist = useHistory();
  const [citys, setCitys] = useState();
  useEffect(() => {
    async function getCitys() {
      try {
        const resultCitys = await fetch_Prom("/Citas");
        // console.log("citas", resultCitys);
        if (resultCitys.status === 200) {
          setCitys(resultCitys.data.objects);
        } else {
          console.log(resultCitys.message);
        }
      } catch (e) {
        console.log(e);
      }
    }
    getCitys();
  }, []);

  const handleFunc = () => {
    if (!isLogin) {
      dispatch(setShowLogin(true));
    } else {
      dispatch(setShowAddrSel(true));
    }
  };

  return (
    <Container disableGutters maxWidth={false} className={classes.root}>
      <img src={BgTop} className={classes.bgTop} alt='' />
      <div className={classes.activityTitle}>
        <img src={ActivityTitle} alt='' />
        <div>Click qui a vedere tutti i prodotti della festa</div>
      </div>
      <img src={Activity} className={classes.activity} alt='' />
      <div className={classes.activityText}>
        La festa di metà autunno è una delle festività più importanti del
        calendario cinese, subito dopo la Festa di Primavera (o capodanno
        cinese) ed il solstizio d'inverno. Ad accompagnare le celebrazioni
        figurano alcune tradizioni culturali od usi regionali.
      </div>
      <HomeBanner handleFunc={handleFunc} />
      <HomeList
        label='I nostri locali'
        list={citys}
        containerId='cityContainer'
        handleFunc={(id) => () => hist.push("/city/" + id)}
      />
    </Container>
  );
}
