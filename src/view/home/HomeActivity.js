import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { default as BgTop } from "../../component/icon/homePageBgTop.svg";
import { default as ActivityTitle } from "../../component/icon/activityTitle.svg";
import { default as Activity } from "../../component/icon/activity.png";

const useStyle = makeStyles({
  root: {
    fontFamily: "Montserrat",
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  bgTop: {
    position: "absolute",
    top: "0",
    width: "100%",
    zIndex: "-1",
  },
  activityTitle: {
    position: "absolute",
    top: "500px",
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
    // maxWidth: "670px",
    // width: "100%",
    // height: "100%",
    width: "670px",
    right: "0",
    top: "400px",
    background: "transparent",
    objectFit: "scale-down",
  },
  activityText: {
    position: "absolute",
    left: "65px",
    top: "800px",
    width: "400px",
    height: "167px",
    fontsize: "15px",
    textAlign: "justify",
  },
});

export default function HomeActivity() {
  const classes = useStyle();
  return (
    <div className={classes.root}>
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
    </div>
  );
}
