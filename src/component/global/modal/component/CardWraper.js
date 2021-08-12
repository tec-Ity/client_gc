import React from "react";
import { makeStyles } from "@material-ui/core";
const useStyle = makeStyles((theme) => ({
  root: {
    height: "600px",   
  },
  topIconBar: {
    width: "500px",
    height: "110px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapDiv: {
    width: "100%",
    maxHeight:'485px',
    minHeight:'300px',
    display: "flex",
    flexWrap:'wrap',
    justifyContent: "center",
    overflow: "auto",
    '&::-webkit-scrollbar':{
        display:'none'
    }
  },
}));
export default function CardWraper(props) {
  const classes = useStyle();
  const { children } = props;
  return (
    <div className={classes.root}>
      <div className={classes.topIconBar}>
        <div style={{ border: "1px solid" }}>Cart</div>
      </div>
      <div className={classes.wrapDiv}>{children}</div>
    </div>
  );
}
