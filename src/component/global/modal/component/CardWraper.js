import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { Link } from "react-router-dom";
import { ReactComponent as UserIcon } from "../../../icon/userCenterIcon.svg";
import { ReactComponent as CartIcon } from "../../../icon/cardIconCarrello.svg";
import { ReactComponent as OrderIcon } from "../../../icon/cardIconOrdini.svg";
import { ReactComponent as BackIcon } from "../../../icon/chevron-left.svg";
import { useTranslation } from "react-i18next";

const useStyle = makeStyles({
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
    fontWeight: "400",
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
});

export default function CardWraper(props) {
  const { t } = useTranslation();
  const classes = useStyle();
  const { children, isExpand, handleCollapse, title, handleFunc, type } = props;
  return (
    <div className={classes.root}>
      <Grid container className={classes.topIconBar}>
        <Grid container item xs={4}>
          {isExpand && handleCollapse ? (
            <BackIcon onClick={handleCollapse} style={{ cursor: "pointer", width: "30px", paddingLeft: "20px" }} />
          ) : (
            <div></div>
          )}
        </Grid>
        <Grid container item xs={4} justifyContent='center' style={{ position: "relative" }}>
          <div style={{ position: "absolute", bottom: 0 }}>{title}</div>
          <div>
            {type === "user" ? <UserIcon /> : type === "cart" ? <CartIcon /> : type === "order" ? <OrderIcon /> : ""}
          </div>
        </Grid>
        <Grid container item xs={4}>
          {type === "order" ? (
            <Link to='/orders' className={classes.allOrders} onClick={handleFunc}>
              <ArrowForwardIcon />
              <div> {t("order.modal.allOrders")}</div>
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
