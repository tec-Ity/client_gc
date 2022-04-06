import React from "react";
import { default as BgTop } from "../../component/icon/bgTopNew.png";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  bgTop: {
    position: "absolute",
    top: "-300px",
    width: "100%",
    zIndex: "-1",

    [theme.breakpoints.down("md")]: {
      width: "120%",
      top: "-120px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "150%",
      top: "-100px",
    },
    [theme.breakpoints.down("xs")]: {
      // top: "-90x",
      top: 90,
      width: "100%",
    },
  },
}));

export default function HomeBg({ style }) {
  const classes = useStyle();
  return <img src={BgTop} className={classes.bgTop} alt="" style={style} />;
}
