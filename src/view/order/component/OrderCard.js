import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Paper, Grid } from "@material-ui/core";
import moment from "moment";
import CustomHr from "../../../component/global/modal/component/CustomHr";
import CartTable from "../../../modal/cart/CartTable";
import { ReactComponent as ToPayIcon } from "../../../component/icon/orderStatueUnpaid.svg";
import { ReactComponent as InProgressIcon } from "../../../component/icon/orderStatueInProcess.svg";
import { ReactComponent as CanceledIcon } from "../../../component/icon/orderStatueCanceled.svg";
import { ReactComponent as CompletedIcon } from "../../../component/icon/orderStatueComplete.svg";

const useStyle = makeStyles({
  root: {
    width: "100%",
    maxWidth: "880px",
    height: "320px",
    padding: "20px 23px 20px 20px",
    fontFamily: "Montserrat",
  },
  paperStyle: {
    width: "100%",
    height: "100%",
    boxShadow: " 0px 0px 30px rgba(0, 0, 0, 0.1)",
    borderRadius: "20px 20px 20px 0px",
  },
  mainGrid: {
    width: "100%",
    height: "100%",
    padding: "20px",
    "& > div": {
      padding: "10px",
    },
  },
  infoForm: {
    fontSize: "12px",
    display: "flex",
    paddingBottom: "10px",
    "& :nth-child(1)": {
      fontWeight: "700",
    },
    "& :nth-child(2)": {
      paddingLeft: "20px",
    },
  },
  hrStyle: {
    width: "100%",
    marginTop: "10px",
    marginLeft: "0",
    marginRight: "0",
  },
  tableStyle: {
    width: "100%",
    minHeight: "100px",
    "& > div": {
      // border: "1px solid",
      margin: "0",
      "& >:nth-child(2)": {
        fontWeight: "700",
        "& >:nth-child(1)": {
          textAlign: "right",
        },
      },
      "& >:nth-child(3)": {
        "& >:nth-child(1)": {
          textAlign: "right",
        },
      },
      "& >:nth-child(4)": {
        "& >:nth-child(1)": {
          textAlign: "right",
        },
      },
    },
  },
  prodTableStyle: {
    //   border: "1px solid",
    height: "145px",
    overflowY: "hidden",
  },
  rightSection: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  shopTag: {
    position: "absolute",
    top: "20px",
    right: "-30px",
    width: "160px",
    height: "50px",
    "& > :nth-child(1)": {
      height: "40px",
      width: "160px",
      fontSize: "14px",
      color: "#fff",
      fontWeight: 700,
      backgroundColor: "#c0e57b",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    "& > :nth-child(2)": {
      height: "0",
      width: "0",
      border: "7px solid transparent",
      borderBottom: "7px solid #1d1d38",
      position: "absolute",
      right: "3px",
      top: "33px",
      transform: "rotate(-45deg)",
    },
  },

  //logo styles
  logoStyle: {
    height: "80px",
    width: "100px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Montserrat",
    "& > :nth-child(2)": {
      fontSize: "10px",
      fontWeight: "700",
    },
    "& > :nth-child(3)": {
      fontSize: "10px",
    },
  },
});

function OrderStatusLogo({ status }) {
  const classes = useStyle();
  const logoList = {
    100: {
      label: "DA PAGARE",
      icon: <ToPayIcon />,
    },
    200: {
      label: "IN PROCESSO",
      icon: <InProgressIcon />,
      msg: "In Ricezione",
    },
    400: {
      label: "IN PROCESSO",
      icon: <InProgressIcon />,
      msg: "In Preparazione",
    },
    700: {
      label: "IN PROCESSO",
      icon: <InProgressIcon />,
      msg: "In Consegna",
    },
    800: {
      label: "COMPLETO",
      icon: <CompletedIcon />,
    },
    10: {
      label: "CANCEL",
      icon: <CanceledIcon />,
    },
  };

  const logo = logoList[status];

  return (
    <>
      {logo && (
        <div className={classes.logoStyle}>
          <div>{logo.icon}</div>
          <div>{logo.label}</div>
          {logo.msg && <div>{logo.msg}</div>}
        </div>
      )}
    </>
  );
}

export default function OrderCard(props) {
  const { order } = props;
  const classes = useStyle();

  return (
    //   outer container for tag
    <div className={classes.root}>
      <Paper className={classes.paperStyle}>
        {/* main grid */}
        <Grid container className={classes.mainGrid}>
          {/* left col */}
          <Grid container item xs={9} alignContent='flex-start'>
            {/* general info row */}
            <Grid container item xs={12} alignContent='flex-start'>
              {/* upper left */}
              <Grid container item xs={12} sm={7} className={classes.infoForm}>
                <div>Num. ordine</div>
                <div>{order.code}</div>
              </Grid>
              {/* upper right */}
              <Grid
                container
                item
                xs={12}
                sm={5}
                justifyContent='flex-end'
                className={classes.infoForm}>
                <div>DATA</div>
                <div>{moment(order.at_upd).format("DD/MM/YYYY HH:mm")}</div>
              </Grid>
              {/* down left */}
              <Grid container item xs={12} sm={7} className={classes.infoForm}>
                <div>Consegna a</div>
                <div>
                  {order.ship?.address} &nbsp; {order.ship?.postcode}
                </div>
              </Grid>
              {/* down right */}
              <Grid
                container
                item
                xs={12}
                sm={5}
                justifyContent='space-between'
                className={classes.infoForm}>
                <div>GREENCITY</div>
                <div>773830484</div>
              </Grid>
            </Grid>
            {/* hr */}
            <Grid container item xs={12}>
              <CustomHr position={classes.hrStyle} />
            </Grid>
            {/* table */}
            <Grid container item xs={12} className={classes.prodTableStyle}>
              {/* table rows */}

              <CartTable
                showHeader={false}
                OrderProds={order.OrderProds}
                customTableStyle={classes.tableStyle}
              />
            </Grid>
            {/* hr */}
            <Grid container item xs={12}>
              <CustomHr position={classes.hrStyle} />
            </Grid>
            {/* hr */}
            <Grid
              container
              item
              xs={12}
              justifyContent='space-between'
              style={{ fontWeight: "700" }}>
              <div>TOTALE</div>
              <div>€{order.total_sale?.toFixed(2)}</div>
            </Grid>
          </Grid>
          <Grid item xs={1} />
          {/* right col */}
          <Grid item xs={2} className={classes.rightSection}>
            <div className={classes.shopTag}>
              <div>
                <div>NEGOZIO</div>
                <div>{order.Shop?.nome}</div>
              </div>
              <div></div>
            </div>
            <div>
              <OrderStatusLogo status={order.status} />
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
