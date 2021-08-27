import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import SectionHeader from "./SectionHeader";
import CartTable from "../../../modal/cart/CartTable";
import TotPriceDetail from "./TotPriceDetail";
import DeliveryDetail from "./DeliveryDetail";
import InfoDetail from "./InfoDetail";
import PaymentSelBtn from "./PaymentSelBtn";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CustomButton from "../../../component/global/modal/component/CustomButton";
import clsx from "clsx";

const useStyle = makeStyles((theme) => ({
  root: {
    border: "1px solid",
    fontFamily: "Montserrat",
    color: "#1d1d38",
    marginBottom: "1000px",
  },
  headerStyle: {
    height: "73px",
    marginBottom: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& :nth-child(1)": {
      display: "flex",
      justifyContent: "center",
    },
  },
  backLink: {
    paddingTop: "1.5px",
  },
  confirmBtnSm: {
    width: "150px",
    height: "31px",
    fontSize: "15px",
  },
  detailCardStyle: {
    marginBottom: theme.spacing(5),
    width: "100%",
    minHeight: "500px",
    maxWidth: "850px",
    boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.1)",
    borderRadius: "20px 20px 20px 0px",
  },
  gridStyle: {
    // border: "1px solid",
    padding: theme.spacing(3),
    height: "100%",
    alignContent: "flex-start",
    paddingBottom: "20px",
  },
  gridItemStyle: {
    minHeight: "80px",
  },
  tableStyle: {
    width: "100%",
  },
  tableHeaderStyle: {
    color: "#c0e57b",
    fontWeight: "400",
    fontSize: "12px",
    marginBottom: "10px",
    "& :nth-child(3)": {
      textAlign: "center",
    },
    "& :nth-child(4)": {
      textAlign: "center",
    },
    "& :nth-child(5)": {
      textAlign: "center",
    },
  },
  tableRowStyle: {
    marginBottom: "20px",
    //nome
    "& :nth-child(2)": {
      //nome
      "& :nth-child(1)": {
        fontSize: "20px",
        fontWeight: "700",
      },
      //desp (attrs)
      "& :nth-child(2)": {
        fontSize: "15px",
      },
    },
    //ctrl
    "& :nth-child(3)": {
      "& input": {
        fontWeight: "700",
      },
      //make ctrl center
      "& :nth-child(1)": {
        "& :nth-child(1)": {
          margin: "auto",
        },
      },
    },
    //unit price
    "& :nth-child(4)": {
      textAlign: "center",
    },
    //total price
    "& :nth-child(5)": {
      fontWeight: "700",
      textAlign: "center",
    },
  },
  btnGroup: {
    minHeight: "0",
    marginTop: "10px",
    marginBottom: "10px",
    display:'flex',
    justifyContent:'center'
  },
  cusButtonStyle: {
    width: "100%",
    height: "42px",
    fontSize: "15px",
  },
  backToShop: {
    display: "flex",
    justifyContent: "center",
    "&:visited": {
      color: "#1d1d38",
    },
    "&:hover": {
      color: "#e47f10",
    },
    // textDecoration:'none',
  },
}));

export default function DetailCard(props) {
  const classes = useStyle();
  const {
    // _id,
    order,
    fetchStatus,
    header,
    isOrder = false,
    isCart = false,
    showOrderDetail,
    showDeliveryDetail,
    handleConfirmOrder,
    paymentMethod = null,
  } = props;

  return (
    <Container className={classes.root}>
      <div className={classes.headerStyle}>
        <Link to={"/shop/" + order.Shop._id} className={classes.backToShop}>
          <ArrowBackIcon />
          <span className={classes.backLink}>{header.backLink}</span>
        </Link>
        <CustomButton
          label={header.nextLink}
          handleFunc={() => isCart && handleConfirmOrder()}
          alterStyle={classes.confirmBtnSm}
        />
      </div>

      {/* body */}
      <Container className={classes.detailCardStyle}>
        <Grid container className={classes.gridStyle}>
          {/* order detail */}
          {isOrder && (
            <Grid item xs={12} className={classes.gridItemStyle}>
              <InfoDetail
                title='DETTAGLIO ORDINE'
                info1={{
                  line1: "NUMERO D’ORDINE",
                  line2: order.code,
                }}
                info2={{ line1: "DATA", line2: order.at_confirm.slice(0,10) +' ' + order.at_confirm.slice(12,19) }}
              />
            </Grid>
          )}
          {/* shop detail */}
          <Grid item xs={12} className={classes.gridItemStyle}>
            <InfoDetail
              title='DETTAGLIO NEGOZIO'
              info1={{
                line1: "NOME DI NEGOZIO",
                line2: order.Shop.nome,
              }}
              info2={{ line1: "ADDR", line2: order.Shop.addr }}
            />
          </Grid>

          {/* delivery detail */}
          <Grid item xs={12} className={classes.gridItemStyle}>
            <DeliveryDetail />
          </Grid>
          {/* prods detail */}
          <Grid item xs={12} className={classes.gridItemStyle}>
            {fetchStatus === "succeed" && Object.keys(order).length > 0 && (
              <>
                <SectionHeader title='DETTAGLIO SPESA' />
                <CartTable
                  OrderProds={order.OrderProds}
                  showImg
                  showCtrl={isCart}
                  showCusHeader={true}
                  customTableStyle={classes.tableStyle}
                  customTableRowStyle={classes.tableRowStyle}
                  customTableHeaderStyle={classes.tableHeaderStyle}
                />
              </>
            )}
          </Grid>
          {/* cost details */}
          <Grid container item xs={12} className={classes.gridItemStyle}>
            <TotPriceDetail
              paymentMethod={paymentMethod}
              priceShip={order.price_ship}
              priceTotal={order.totPrice}
            />
          </Grid>
          {/* confirm button and back to shop Link */}
          {isCart && (
            <>
              <Grid container item xs={12} className={classes.gridItemStyle}>
                <Grid
                
                  item
                  xs={12}
                  className={clsx(classes.gridItemStyle, classes.btnGroup)}>
                  {/* <ConfirmOrderBtn /> */}
                  <CustomButton
                    label='CONFERMA L’ORDINE'
                    handleFunc={handleConfirmOrder}
                    alterStyle={classes.cusButtonStyle}
                  />
                </Grid>

                <Grid
                container
                  item
                  justifyContent='center'
                  xs={12}
                  className={clsx(classes.gridItemStyle, classes.btnGroup)}>
                  <Link
                    to={"/shop/" + order.Shop._id}
                    className={classes.backToShop}>
                    <ArrowBackIcon />
                    <span> NON ADESSO, CONTINUA LO SHOPPING</span>
                  </Link>
                </Grid>
              </Grid>
            </>
          )}
          {/* select payment type button group */}
          {isOrder && (
            <Grid container item xs={12} className={classes.gridItemStyle}>
              <PaymentSelBtn />
            </Grid>
          )}
        </Grid>
      </Container>
    </Container>
  );
}
