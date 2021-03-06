import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { default as ActivityTitle } from "../../component/icon/activityTitle.svg";
import { default as Activity } from "../../component/icon/activity.png";

const useStyle = makeStyles((theme) => ({
  root: {
    fontFamily: "Montserrat",
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
  },

  activityTitle: {
    position: "absolute",
    top: "900px",
    left: "50px",
    "& >:nth-child(2)": {
      // border:'1px solid',
      position: "absolute",
      left: "20px",
      fontSize: "12px",
    },
    [theme.breakpoints.down("lg")]: {
      top: "850px",
    },
    [theme.breakpoints.down("md")]: {
      top: "650px",
    },
    [theme.breakpoints.down("sm")]: {
      top: "500px",
      width: "30%",
      left: 0,
    },
  },
  activity: {
    mixBlendMode: "darken",
    position: "absolute",
    width: "670px",
    right: "0",
    // top: "400px",
    background: "transparent",
    objectFit: "scale-down",
    top: "900px",
    [theme.breakpoints.down("lg")]: {
      top: "850px",
    },
    [theme.breakpoints.down("md")]: {
      top: "650px",
    },
    [theme.breakpoints.down("sm")]: {
      top: "800px",
      width: "100%",
      left: 0,
    },
  },
  activityText: {
    position: "absolute",
    left: "65px",
    width: "400px",
    height: "167px",
    fontsize: "15px",
    textAlign: "justify",
    top: "1100px",
    [theme.breakpoints.down("lg")]: {
      top: "1050px",
    },
    [theme.breakpoints.down("md")]: {
      top: "850px",
    },
    [theme.breakpoints.down("sm")]: {
      top: "700px",
      width: "90%",
      left: 20,
    },
  },
}));

export default function HomeActivity() {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <div className={classes.activityTitle}>
        <img src={ActivityTitle} alt="" />
        <div>Click qui a vedere tutti i prodotti della festa</div>
      </div>
      <img src={Activity} className={classes.activity} alt="" />
      <div className={classes.activityText}>
        La festa di met?? autunno ?? una delle festivit?? pi?? importanti del
        calendario cinese, subito dopo la Festa di Primavera (o capodanno
        cinese) ed il solstizio d'inverno. Ad accompagnare le celebrazioni
        figurano alcune tradizioni culturali od usi regionali.
      </div>
    </div>
  );
}
