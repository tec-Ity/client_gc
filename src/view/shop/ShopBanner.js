import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CustomHr from "../../component/global/modal/component/CustomHr";
import { Container } from "@material-ui/core";
import { Link } from "react-router-dom";
// import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { ReactComponent as ArrowLeft } from "../../component/icon/chevron-left.svg";

import { useSelector } from "react-redux";
import BackLink from "../../component/global/link/BackLink";
const useStyle = makeStyles((theme) => ({
  root: {},
  bannerStyle: {
    // position: "absolute",
    height: "200px",
    // width: "150%",
    // minWidth:'320vh',
    marginBottom: "100px",
    background:
      "linear-gradient(290.29deg, #91E8B3 -12.39%, #C0E57B 21.51%, #D6E57B 110.42%, #C0E57B 110.42%)",
    fontFamily: "Montserrat",
    color: "#1d1d38",
  },
  backLink: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "250px",
    height: "15px",
    textDecoration: "none",
    left: "45px",
    top: "38px",
    fontSize: "12px",
    // lineHeight: "15px",
    color: "#1d1d38",
    "&:visited": {
      color: "#1d1d38",
    },
  },
  shopDetailBox: {
    position: "absolute",
    left: "85px",
    top: "112px",
    width: "499px",
    height: "156px",
    background: "#fff",
    boxShadow: "0 0 30px rgba(0,0,0,0.1)",
    borderRadius: "20px 20px 20px 0",
  },
  shopInfo: {
    position: "relative",
    top: "29px",
    left: "49px",
    "& :nth-child(1)": {
      fontSize: "30px",
      fontWeight: "700",
    },
    "& :nth-child(2)": {
      fontSize: "12px",
    },
  },
  customHr: {
    position: "absolute",
    top: "74px",
    left: "34px",
  },
  moreInfo: {
    position: "absolute",
    left: "49px",
    top: "105px",
    width: "400px",
    display: "flex",
    justifyContent: "space-between",
    "& div": {
      textAlign: "left",
      fontSize: "12px",
    },
  },
}));

export default function ShopBanner() {
  // const { shopInfo } = props;

  const curShopInfo = useSelector((state) => state.shop.curShopInfo);
  const classes = useStyle();
  // console.log(curShopInfo)
  return (
    <Container maxWidth={false} className={classes.bannerStyle}>
      <div className={classes.backLink}>
        <BackLink
          label='DIETRO A
        TUTTI I NEGOZI'
          link='/city'
        />
      </div>
      <div className={classes.shopDetailBox}>
        <div className={classes.shopInfo}>
          <div>{curShopInfo?.nome}</div>
          <div>{curShopInfo?.addr}</div>
        </div>

        <CustomHr position={classes.customHr} />
        <div className={classes.moreInfo}>
          <div>consegna a casa</div>
          <div>paga alla consegna</div>
          <div>prime</div>
        </div>
      </div>
    </Container>
  );
}
