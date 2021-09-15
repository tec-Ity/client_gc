import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Paper, Grid } from "@material-ui/core";
import moment from "moment";
import CustomHr from "../../../component/global/modal/component/CustomHr";
import CartTable from "../../../modal/cart/CartTable";
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
});
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
            <Grid container item xs={12}>
              {/* table rows */}
              {/* {order.OrderProds?.map((op) => {
                return op.OrderSkus?.map((os) => {
                  return (
                    <Grid container item xs={12} key={os.Sku}>
                      <Grid container item xs={6}>
                        <div>{op.nome}</div>
                        <div>{op.desp}</div>
                      </Grid>
                      <Grid container item xs={2}>
                        {os.quantity}
                      </Grid>
                      <Grid container item xs={2}>
                        {os.price_regular}
                      </Grid>
                      <Grid container item xs={2}>
                        {os.price_tot}
                      </Grid>
                    </Grid>
                  );
                });
              })} */}
              {
                <CartTable
                  showHeader={false}
                  OrderProds={order.OrderProds}
                  customTableStyle={classes.tableStyle}
                />
              }
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
          {/* right col */}
          <Grid container item xs={3}>
            b
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
