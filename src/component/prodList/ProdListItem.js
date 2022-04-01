import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ProdListItemControl from "./itemControl/ProdListItemControl";
import CustomHr from "../global/modal/component/CustomHr";
import { Grid, Paper } from "@material-ui/core";
import api_DNS from "../../conf/_dns";
import { Link, useLocation } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  root: {
    color: "#1d1d38",
    maxWidth: "240px",
  },
  innerBoxBg: {
    padding: "10px 0",
    display: "flex",
    justifyContent: "center",
  },
  innerBox: {
    border: "1.5px solid",
    borderImage: "linear-gradient(270deg,#91e883, #c0e57b) 1",
    maxWidth: "240px",
    width: "100%",
    // margin: "1px",
    height: "320px",
    background: "#fff",
    position: "relative",
    boxShadow: "0px 0px 20.6152px rgba(0, 0, 0, 0.1)",
  },
  imgBox: {
    // maxWidth: "137.43px",
    width: "100%",
    height: "184.16px",
    position: "absolute",
    top: "25.43px",
    display: "flex",
    justifyContent: "center",
  },
  imgBoxInner: {
    // border:'1px solid',
    // maxWidth: "190px",
    width: "90%",
    height: "100%",
    top: "25.43px",
  },
  img: {
    objectFit: "scale-down",
    width: "100%",
    height: "100%",
  },
  smallHr: {
    // maxWidth: "220px",
    position: "absolute",
    top: "208.64px",
    width: "87%",
  },
  infoBox: {
    maxWidth: "207.43px",
    position: "absolute",
    top: "233.6px",
    left: "17.18px",
    fontFamily: "Montserrat",
    "& >:nth-child(1)": {
      fontSize: "14px",
      fontWeight: "400",
    },
    "& >:nth-child(2)": {
      fontSize: "10px",
    },
  },
  priceStyle: {
    fontFamily: "Montserrat",
    fontWeight: "600",
    position: "absolute",
    bottom: "10px",
    left: "17px",
    fontSize: "20px",
  },
  ctrlStyle: {
    position: "absolute",
    bottom: "10px",
    right: "17.5px",
  },
  LinkStyle: {
    color: "#1d1d38",
    "&:visited": {
      color: "#1d1d38",
    },
  },
}));

export default function ProdListItem(props) {
  const { prod, rule, empty = false } = props;
  const classes = useStyle();
  const param = new URLSearchParams(useLocation().search);
  // console.log(param.get("disabled"));
  return (
    <Grid item xs={rule.xs} sm={rule.sm} md={rule.md} className={classes.root}>
      {empty === false && (
        <div className={classes.innerBoxBg}>
          <Paper className={classes.innerBox} square elevation={0}>
            {/* click area div */}
            <Link
              to={
                "/prod/" +
                prod._id +
                (param.get("disabled") === "true" ? "?disabled=true" : "")
              }
              target="_blank"
              rel="noopener noreferrer"
              className={classes.LinkStyle}
            >
              <div className={classes.imgBox}>
                <div className={classes.imgBoxInner}>
                  {prod.img_urls && (
                    <img
                      className={classes.img}
                      src={api_DNS + prod.img_urls[0]}
                      alt={prod.nome}
                    />
                  )}
                </div>
              </div>

              <CustomHr position={classes.smallHr} />

              <div className={classes.infoBox}>
                <div>
                  {prod.nome?.slice(0, 35) +
                    (prod.nome?.length > 35 ? "..." : "")}
                </div>
                {prod.desp && (
                  <div>
                    {prod.desp?.slice(0, 20) +
                      (prod.desp?.length > 20 ? "..." : "")}
                  </div>
                )}
              </div>
            </Link>
            <div>
              <div className={classes.priceStyle}>
                {prod.price_max === prod.price_min
                  ? `€${String(prod.Skus[0]?.price_sale?.toFixed(2))?.replace(
                      ".",
                      ","
                    )}`
                  : `€${String(prod.price_min?.toFixed(2))?.replace(
                      ".",
                      ","
                    )} - ${String(prod.price_max?.toFixed(2))?.replace(
                      ".",
                      ","
                    )}`}
              </div>
              <div className={classes.ctrlStyle}>
                <>
                  <ProdListItemControl prod={prod} Shop={prod.Shop} />
                </>
              </div>
            </div>
          </Paper>
        </div>
      )}
    </Grid>
  );
}
