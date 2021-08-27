import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyle = makeStyles((theme) => ({
  //   root: {
  //     position: "relative",
  //     minHeight: "750px",
  //     padding: "70px 50px 50px 50px",
  //   },
  titleBox: {
    // position: "absolute",
    top: "0",
    width: "200px",
    height: "40px",
  },
  titleText: {
    fontSize: "30px",
    fontFamily: "Montserrat",
    fontWeight: "700",
    position: "absolute",
    bottom: "0",
  },
  titleBg: {
    width: "200px",
    height: "24px",
    position: "absolute",
    left: "0",
    bottom: "0",
    background: "#c0e57b",
    borderRadius: "12px 12px 12px 0px",
  },
}));

export default function CustomBgText(props) {
  const { label, style = null } = props;
  const classes = useStyle();
  return (
    <div className={clsx(classes.titleBox, style?.box)}>
      <div className={clsx(classes.titleBg, style?.bg)}></div>
      <div className={clsx(classes.titleText, style?.txt)}>{label}</div>
    </div>
  );
}
