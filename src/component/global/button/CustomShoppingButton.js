import React from "react";
import { Button } from "@material-ui/core";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as Cart } from "../../icon/cart.svg";

const useStyle = makeStyles({
  root: {
    position: "relative",
    height: "40px",
    width: "73px",
    // border: "1px solid",
  },
  footNote: {
    height: "23px",
    width: "23px",
    borderRadius: "20px",
    position: "absolute",
    top: "0",
    right: "0",
    background: "#e47f10",
    color: "#fff",
    fontWeight: "700",
    fontSize: "13px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  btnStyle: {
    position: "absolute",
    bottom: "0",
    height: "25.86px",
    width: "74.34px",
    borderRadius: "20px 20px 20px 0",
    background: "#c0e57b",
    color: "#fff",
    fontSize: "13px",
    fontFamily: "Montserrat",
    fontWeight: "700",
    "&:hover": {
      background: "#c0e57b",
      backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.05) 0 0)",
    },
  },
  btnStyleLarge: {
    position: "absolute",
    bottom: "0",
    height: "40.86px",
    width: "110.34px",
    borderRadius: "20px 20px 20px 0",
    background: "#c0e57b",
    color: "#fff",
    fontSize: "13px",
    fontFamily: "Montserrat",
    fontWeight: "700",
    "&:hover": {
      background: "#c0e57b",
      backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.05) 0 0)",
    },
  },
  logo: {
    paddingTop: "2px",
    width: "20px",
    height: "20px",
    "& path": {
      fill: "white",
    },
  },
  logoLarge: {
    paddingTop: "3px",
    width: "30px",
    height: "30px",
    "& path": {
      fill: "white",
    },
  },
});

export default function CustomShoppingButton(props) {
  const {
    handleFunc,
    disabled = false,
    alterStyle = null,
    multi = false,
    count = null,
    large = false,
  } = props;
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <Button
        onClick={handleFunc}
        // disabled={disabled}
        className={clsx(
          large === true ? classes.btnStyleLarge : classes.btnStyle,
          alterStyle
        )}
        style={{ background: disabled === true && "#0000004d" }}>
        {multi ? (
          "scegli"
        ) : (
          <Cart className={large === true ? classes.logoLarge : classes.logo} />
        )}
      </Button>
      {count && (
        <div className={classes.footNote}>
          <span>{count}</span>
        </div>
      )}
    </div>
  );
}
