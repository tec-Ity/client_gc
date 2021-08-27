import React from "react";
import { Button } from "@material-ui/core";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

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
    width: "35.34px",
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
    width: "15px",
    height: "15px",
  },
  logoContent: {
    stroke: "white",
  },
});

export default function CustomShoppingButton(props) {
  const {
    handleFunc,
    disable = false,
    alterStyle = null,
    multi = false,
    count = null,
  } = props;
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <Button
        onClick={handleFunc}
        disabled={disable}
        className={clsx(classes.btnStyle, alterStyle)}>
        {multi ? (
          "scegli"
        ) : (
          <svg
            className={classes.logo}
            viewBox='0 0 31 31'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <g id='cart'>
              <ellipse
                id='Ellipse 114'
                cx='26.4224'
                cy='28.1998'
                rx='1.94145'
                ry='1.94145'
                className={classes.logoContent}
              />
              <ellipse
                id='Ellipse 118'
                cx='5.71373'
                cy='28.1998'
                rx='1.94145'
                ry='1.94145'
                className={classes.logoContent}
              />
              <path
                id='Vector 107'
                d='M21.2425 8.14118H3.24953C2.2265 8.14118 1.49956 9.13705 1.81135 10.1114L6.02214 23.2701C6.22228 23.8956 6.80366 24.3199 7.46032 24.3199H23.8875C24.6073 24.3199 25.2271 23.8119 25.3682 23.1061L29.2943 3.47583C29.4811 2.54145 28.7665 1.66968 27.8136 1.66968H19.3011'
                className={classes.logoContent}
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </g>
          </svg>
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
