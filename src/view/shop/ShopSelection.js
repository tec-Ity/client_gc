import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ProdList from "../../component/prodList/ProdList";
import { Container } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  root: {
    position: "relative",
    minHeight: "750px",
    padding: "70px 50px 50px 50px",
  },
  title: {
    position: "absolute",
    top: "0",
    width: "200px",
    height: "40px",
  },
  titleTxt: {
    fontSize: "30px",
    fontFamily: "Montserrat",
    fontWeight: "700",
    position: "absolute",
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

export default function ShopSelection() {
  const classes = useStyle();
  return (
    <Container className={classes.root}>
      <div className={classes.title}>
        <div className={classes.titleBg}></div>
        <div className={classes.titleTxt}>Selezionati</div>
      </div>
      <ProdList queryURL=' ' type='selection' />
    </Container>
  );
}
