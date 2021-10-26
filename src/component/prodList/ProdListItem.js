import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ProdListItemControl from "./itemControl/ProdListItemControl";
import CustomHr from "../global/modal/component/CustomHr";
import { Grid, Paper } from "@material-ui/core";
import api_DNS from "../../conf/dns";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setShowAddrSel,
  setShowLogin,
} from "../../redux/curClient/curClientSlice";

const useStyle = makeStyles((theme) => ({
  root: {
    // height: "319px",
    // maxWidth: "248px",
    // minWidth:'135px',
    // width:'100%',
    // margin: "14px 0",
    color: "#1d1d38",
    // border:'1px solid',
    // justifyContent:'center',
    maxWidth: "240px",
  },
  innerBoxBg: {
    padding: "10px 0",
    // border:'1px solid',
    display: "flex",
    justifyContent: "center",
  },
  innerBox: {
    // margin: "1px 1px 1px 1px",
    border: "1.5px solid",
    borderImage: "linear-gradient(270deg,#91e883, #c0e57b) 1",
    maxWidth: "240px",
    width: "100%",
    // margin: "1px",
    height: "317px",
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
    bottom: "16px",
    left: "17px",
    fontSize: "20px",
  },
  ctrlStyle: {
    position: "absolute",
    bottom: "16px",
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

  const dispatch = useDispatch();

  const isLogin = useSelector((state) => state.curClient.isLogin);
  const userSelectedLocation = useSelector(
    (state) => state.curClient.userSelectedLocation
  );
  const handleClick = () => {
    if (!isLogin) dispatch(setShowLogin(true));
    else if (!userSelectedLocation) dispatch(setShowAddrSel(true));
  };

  return (
    <Grid item xs={rule.xs} sm={rule.sm} md={rule.md} className={classes.root}>
      {empty === false && (
        <div className={classes.innerBoxBg}>
          <Paper className={classes.innerBox} square elevation={0}>
            {/* click area div */}
            <Link to={"/prod/" + prod._id} className={classes.LinkStyle}>
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
                <div>{prod.nome}</div>
                <div>{prod.desp}</div>
              </div>
            </Link>
            <div>
              <div className={classes.priceStyle}>
                {prod.price_max === prod.price_min
                  ? `€${prod.price}`
                  : `€${prod.price_min} - ${prod.price_max}`}
              </div>
              <div className={classes.ctrlStyle} onClick={handleClick}>
                <>
                  <ProdListItemControl prod={prod} />
                </>
              </div>
            </div>
          </Paper>
        </div>
      )}
    </Grid>
  );
}
