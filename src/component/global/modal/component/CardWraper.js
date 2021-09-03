import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { Link } from "react-router-dom";
const useStyle = makeStyles((theme) => ({
  root: {
    height: "600px",
    color: "#1d1d38",
    fontWeight: "700",
  },
  topIconBar: {
    width: "500px",
    height: "110px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  allOrders: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "12.5px",
    textDecoration: "none",
    color: "#1d1d38",
    "&:visited": {
      color: "#1d1d38",
    },
  },
  wrapDiv: {
    width: "100%",
    maxHeight: "485px",
    minHeight: "300px",

    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
}));
export default function CardWraper(props) {
  const classes = useStyle();
  const { children, isExpand, handleCollapse, title, handleFunc } = props;
  return (
    <div className={classes.root}>
      <Grid container className={classes.topIconBar}>
        <Grid container item xs={4} justifyContent='center'>
          {isExpand ? (
            <button onClick={handleCollapse}>back</button>
          ) : (
            <div></div>
          )}
        </Grid>
        <Grid container item xs={4} justifyContent='center'>
          <div>{title}</div>
        </Grid>
        <Grid item xs={4}>
          {title === "Order" ? (
            <Link
              to='/orders'
              className={classes.allOrders}
              onClick={handleFunc}>
              <ArrowForwardIcon />
              <div> TUTTI GLI ORDINI</div>
            </Link>
          ) : (
            <div></div>
          )}
        </Grid>
      </Grid>
      <Grid container className={classes.wrapDiv} justifyContent='center'>
        {children}
      </Grid>
    </div>
  );
}
