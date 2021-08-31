import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ProdListItemControl from "./itemControl/ProdListItemControl";
import CustomHr from "../global/modal/component/CustomHr";
import { Grid, Paper } from "@material-ui/core";
import api_DNS from "../../conf/dns";
import { useHistory, Link } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  root: {
    // height: "319px",
    // maxWidth: "248px",
    // minWidth:'135px',
    // width:'100%',
    // margin: "14px 0",
    color:'#1d1d38'
  },
  innerBoxBg: {
    maxWidth: "241.69px",
    maxHeight: "318.69px",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(270deg, #91E8B3 0%, #C0E57B 100%, #C0E57B 100%)",
    boxShadow: "0px 0px 20.6152px rgba(0, 0, 0, 0.1)",
  },
  innerBox: {
    // margin: "1px 1px 1px 1px",
    maxWidth: "240px",
    width: "100%",
    margin: "1px",
    height: "317px",
    background: "#fff",
    position: "relative",
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
    maxWidth: "137.43px",
    width: "100%",
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
    "& :nth-child(1)": {
      fontSize: "13.74px",
      fontWeight: "700",
    },
    "& :nth-child(2)": {
      fontSize: "10.31px",
    },
  },
  priceStyle: {
    fontFamily: "Monserrat",
    fontWeight: "700",
    position: "absolute",
    bottom: "16px",
    left: "17px",
  },
  ctrlStyle: {
    position: "absolute",
    bottom: "16px",
    right: "17.5px",
  },
  LinkStyle: {
    color:'#1d1d38',
    "&:visited": {
      color: "#1d1d38",
    },
  },
}));

export default function ProdListItem(props) {
  const { prod, rule } = props;
  const classes = useStyle();
  // const hist = useHistory();

  // const handleClickItem = () => {
  //   hist.push("/prod/" + prod._id);
  // };

  return (
    <Grid item xs={rule.xs} sm={rule.sm} md={rule.md} className={classes.root}>
      <Paper className={classes.innerBoxBg} square>
        <Paper className={classes.innerBox} square>
          {/* click area div */}
          <Link to={"/prod/" + prod._id} className={classes.LinkStyle}>
            <div className={classes.imgBox}>
              <div className={classes.imgBoxInner}>
                {prod.img_urls && (
                  <img
                    className={classes.img}
                    src={api_DNS + prod.img_urls}
                    alt={prod.nome}
                  />
                )}
              </div>
            </div>

            <CustomHr position={classes.smallHr} />

            <div className={classes.infoBox}>
              <div>{prod.nome}</div>
              <div>description: {prod.desp}</div>
            </div>
          </Link>
          <div>
            <div className={classes.priceStyle}>
              {prod.price_max === prod.price_min
                ? `€${prod.price}`
                : `€${prod.price_min} - ${prod.price_max}`}
            </div>
            <div className={classes.ctrlStyle}>
              <ProdListItemControl prod={prod} />
            </div>
          </div>
        </Paper>
      </Paper>
    </Grid>
  );
}
