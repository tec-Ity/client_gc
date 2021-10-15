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
import CustomButton from "../../../component/global/modal/component/CustomButton";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurShopInfo } from "../../../redux/shop/shopSlice";
import { ReactComponent as LeftArrow } from "../../../component/icon/chevron-left.svg";
import BackLink from "../../../component/global/link/BackLink";

const useStyle = makeStyles((theme) => ({
  root: {
    // border:'1px solid',
    marginTop: "10px",
    fontFamily: "Montserrat",
    color: "#1d1d38",
  },
  headerStyle: {
    maxWidth: "850px",
    height: "73px",
    marginBottom: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
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
    position: "relative",
    marginBottom: theme.spacing(5),
    paddingTop: "140px",
    paddingBottom: "60px",
    width: "100%",
    minHeight: "500px",
    maxWidth: "850px",
    boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.1)",
    borderRadius: "20px 20px 20px 0px",
  },
  gridStyle: {
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
    "& > div": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    //nome
    "& > :nth-child(2)": {
      justifyContent: "flex-start",
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
    "& >:nth-child(3)": {
      "& input": {
        fontWeight: "700",
        fontSize: "16px",
      },
    },
    //unit price
    "& >:nth-child(4)": {
      textAlign: "center",
    },
    //total price
    "& >:nth-child(5)": {
      fontWeight: "700",
      textAlign: "center",
    },
  },
  btnGroup: {
    minHeight: "0",
    marginTop: "10px",
    marginBottom: "10px",
    display: "flex",
    justifyContent: "center",
  },
  cusButtonStyle: {
    width: "100%",
    height: "42px",
    fontSize: "15px",
  },
  backToShop: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "8px",
    opacity: "0.5",
    color: "#1d1d38",

    "& >:nth-child(1)": {
      height: "50%",
    },
    "&:visited": {
      opacity: "0.5",
      color: "#1d1d38",
    },
    "&:hover": {
      color: "#1d1d38",
      opacity: "1",
    },
    // textDecoration:'none',
  },
  shopTag: {
    position: "absolute",
    left: "-10px",
    height: "60px",
    top: "60px",
    width: "210px",
    //green box
    "& >:nth-child(1)": {
      width: "210px",
      height: "51px",
      background: "#c0e57b",
      borderRadius: "10px 0 0 0 ",
      boxShadow: "1px 2px 3px rgba(0, 0, 0, 0.2) ",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",

      "& :nth-child(1)": {
        fontWeight: "700",
        fontSize: "15px",
      },
      "& :nth-child(2)": {
        fontSize: "12px",
      },
    },
    //triangle
    "& > :nth-child(2)": {
      width: " 0",
      height: " 0",
      position: "relative",
      bottom: "1px",
      borderLeft: " 7.5px solid transparent",
      borderRight: " 7.5px solid transparent",
      borderBottom: " 7.5px solid #e47f10",
      transform: "rotate(45deg )",
    },
  },
  backLinkStyle: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "fit-content",
    height: "15px",
    textDecoration: "none",
    left: "75px",
    top: "122px",
    fontSize: "12px",
    // lineHeight: "15px",
    color: "#1d1d38",
    "&:visited": {
      color: "#1d1d38",
    },
  },
}));

export default function DetailCard(props) {
  const classes = useStyle();
  const {
    // _id,
    orderLogo = null,
    order,
    isCart = false,
    header,
    isOrder = false,
    // showOrderDetail,
    // showDeliveryDetail,
    handleFunc,
    paymentMethod = null,
    disableBtn,
  } = props;
  const dispatch = useDispatch();
  const curShopInfo = useSelector((state) => state.shop.curShopInfo);
  const curShopInfoStatus = useSelector(
    (state) => state.shop.curShopInfoStatus
  );
  // console.log(order)
  React.useEffect(() => {
    const getShopInfo = () => {
      if (curShopInfoStatus === "idle") {
        isCart
          ? dispatch(fetchCurShopInfo(order?.Shop))
          : dispatch(fetchCurShopInfo(order?.Shop?._id));
      } else if (curShopInfoStatus === "error") {
        setTimeout(() => {
          isCart
            ? dispatch(fetchCurShopInfo(order?.Shop))
            : dispatch(fetchCurShopInfo(order?.Shop?._id));
        }, 2000);
      }
    };
    order?.Shop && getShopInfo();
  }, [curShopInfoStatus, dispatch, isCart, order?.Shop]);

  return (
    order && (
      <Container className={classes.root}>
        <Container disableGutters className={classes.headerStyle}>
          <BackLink
            link={isCart ? "/shop/" + order?.Shop : "/shop/" + order?.Shop._id}
            label={header.backLink}
            style={classes.backLinkStyle}
          />
          <div></div>
          <CustomButton
            label={header.nextLink}
            handleFunc={handleFunc}
            alterStyle={classes.confirmBtnSm}
          />
        </Container>
        {/* body */}
        <Container className={classes.detailCardStyle}>
          {/* float tag */}
          <div className={classes.shopTag}>
            <div>
              <div>{curShopInfo.nome}</div>
              <div>{curShopInfo.addr}</div>
            </div>
            <div></div>
          </div>
          <Grid container className={classes.gridStyle}>
            {orderLogo && (
              <Grid
                container
                item
                xs={12}
                justifyContent='center'
                alignItems='center'
                style={{ minHeight: "150px" }}>
                <div
                  style={{
                    height: "80px",
                    width: "80px",
                    border: "1px solid",
                  }}>
                  {orderLogo}
                </div>
              </Grid>
            )}
            {/* order detail */}
            {isOrder && (
              <Grid item xs={12} className={classes.gridItemStyle}>
                <InfoDetail
                  title='DETTAGLIO ORDINE'
                  info1={{
                    line1: "NUMERO D’ORDINE",
                    line2: order?.code,
                  }}
                  info2={{
                    line1: "DATA",
                    line2:
                      order?.at_confirm?.slice(0, 10) +
                      " " +
                      order?.at_confirm?.slice(12, 19),
                  }}
                />
              </Grid>
            )}

            {/* delivery detail */}
            <Grid item xs={12} className={classes.gridItemStyle}>
              <DeliveryDetail isCart={isCart} />
            </Grid>
            {/* prods detail */}
            <Grid item xs={12} className={classes.gridItemStyle}>
              {Object.keys(order).length > 0 && (
                <>
                  <SectionHeader title='DETTAGLIO SPESA' />
                  <CartTable
                    OrderProds={order?.OrderProds}
                    isCart={isCart}
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
                priceShip={curShopInfo?.price_ship}
                priceTotal={isCart ? order?.totPrice : order?.total_sale}
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
                      disableBtn={disableBtn}
                      label='CONFERMA L’ORDINE'
                      handleFunc={handleFunc}
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
                      to={"/shop/" + order?.Shop}
                      className={classes.backToShop}>
                      <LeftArrow />
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
    )
  );
}
