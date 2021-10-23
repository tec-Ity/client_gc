import React from "react";
import { default as BgTop } from "../../component/icon/homePageBgTop.svg";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  bgTop: {
    position: "absolute",
    top: "90px",
    width: "100%",
    zIndex: "-1",
  },
});

export default function HomeBg({ style }) {
  const classes = useStyle();
  return (
    <div>
      <img src={BgTop} className={classes.bgTop} alt='' style={style} />
    </div>
  );
}
