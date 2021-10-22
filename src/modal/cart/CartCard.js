import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
// import { Button } from "@material-ui/core";
import CartTable from "./CartTable";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurCartByShop,
  // fetchCartByShop,
  setIsExpand,
  setShowCarts,
} from "../../redux/cart/cartSlice";
import { useHistory } from "react-router";
import CustomButton from "../../component/global/modal/component/CustomButton";
import moment from "moment";
import CustomHr from "../../component/global/modal/component/CustomHr";

const useStyle = makeStyles((props) => ({
  root: {
    // maxHeight: "270px",
    // height:'1000px',
    // height:'100%',
    // alignContent:'flex-start',
    // border: "1px solid",
    // "& >div": {
    //   border: "1px solid",
    // },
    width: "443px",
    boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.1)",
    borderRadius: "20px 20px 20px 0px",
    marginTop: "20px",
    marginBottom: "20px",
    paddingBottom: "20px",
  },
  marginHead: {
    margin: "20px 0 0 0",
  },
  marginFoot: {
    margin: "9px 0 22px 0",
  },
  gridItem: {
    // border:'1px solid',
    width: "400px",
    margin: "auto",
    marginTop: "5px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0",
  },
  shopTitle: {
    fontFamily: "Montserrat",
    fontWeight: "400",
    fontSize: "1em",
    lineHeight: "15px",
    color: "#C0E57B",
  },
  orderBtn: {
    height: "21px",
    width: "100px",
    fontSize: "10px",
    backgroundColor: (props) => props.handleBtn?.background,
  },
  moreInfo: {
    position: "relative",
    flexShrink: "0",
    flexGrow: "0",
    border: "1px solid #C0E57B",
    boxSizing: "border-box",
    height: "20px",
    width: "20px",
    borderRadius: "10px",
    textAlign: "center",
    color: "#c0e578",
  },

  totalAmount: {
    borderTop: "1px solid",
    width: "170px",
    height: "35 px",
    borderColor: "#C0E57B",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& :nth-child(1)": {
      fontSize: "11.7px",
      color: "#c0e57b",
    },
    "& :nth-child(2)": {
      fontSize: "23.5px",
      fontWeight: "700",
    },
  },
  orderBtnXL: {
    height: "40px",
    width: "400px",
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "24px",
  },
  //order info header
  orderInfoHeader: {
    height: "30px",
    "& >:nth-child(1)": {
      fontWeight: "400",
      fontSize: "11px",
    },
    "& >:nth-child(2)": {
      fontSize: "1em",
    },
  },
  customHr: {
    margin: "3px 0 0 0",
  },
  expandMoreStyle: {
    cursor: "pointer",
    color: "#1d1d38",
    width: "100%",
    // border: "1px solid",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& div": { width: "fit-content" },
    "& >:nth-child(1)": {
      fontSize: "10px",
      fontWeight: "normal",
    },
    "& >:nth-child(2)": {
      lineHeight: "5px",
    },
  },
}));

export default function CartCard(props) {
  const {
    cart,
    count = 3,
    isExpand = null,
    handleBtn = null,
    orderCard,
    orderExpandMore,
  } = props;
  const { Shop, OrderProds } = cart;
  const dispatch = useDispatch();
  const hist = useHistory();
  const curCart = useSelector((state) => state.cart.curCart);
  const classes = useStyle(props);

  const expandMore = () => {
    if (curCart.Shop) {
      if (curCart.Shop !== Shop) {
        // dispatch(fetchCartByShop(Shop._id));
        setCurCartByShop(Shop);
      }
    } else {
      // dispatch(fetchCartByShop(Shop._id));
      setCurCartByShop(Shop);
    }
    dispatch(setIsExpand(Shop));
  };

  const handleOrderFunc = () => {
    expandMore();
    dispatch(setShowCarts(false));
    hist.push("/cart/" + cart._id);
  };

  // console.log(handleBtn);

  return (
    <Grid container item xs={11} className={classes.root}>
      <Grid item container className={classes.gridItem}>
        <div className={clsx(classes.shopTitle, classes.marginHead)}>
          SHOP NO. <span title={Shop?.nome}>{Shop?.nome}</span>
        </div>
        <div className={classes.marginHead}>
          <CustomButton
            label={handleBtn ? handleBtn.label : "ORDINARE"}
            handleFunc={handleBtn ? handleBtn.handleFunc : handleOrderFunc}
            alterStyle={classes.orderBtn}
          />
        </div>
      </Grid>
      {orderCard && (
        <Grid
          item
          container
          className={clsx(classes.gridItem, classes.orderInfoHeader)}>
          <Grid item container xs={6}>
            {moment(cart.at_upd).format("DD/MM/YYYY HH:mm")}
          </Grid>
          <Grid item container xs={6} justifyContent='flex-end'>
            €{cart.total_sale?.toFixed(2)}
          </Grid>
          <Grid item container xs={12}>
            <CustomHr position={classes.customHr} />
          </Grid>
        </Grid>
      )}
      <Grid item container className={classes.gridItem}>
        <CartTable
          isCart
          orderCard={orderCard}
          OrderProds={OrderProds}
          count={count}
          isExpand={isExpand}
        />
      </Grid>
      {isExpand ? (
        <>
          <Grid item className={classes.gridItem}>
            <div className={clsx(classes.moreInfo, classes.margin)}>^</div>
            <div className={clsx(classes.totalAmount, classes.marginFoot)}>
              <div>TOTALE</div>
              <div>€{curCart.totPrice?.toFixed(2)}</div>
            </div>
          </Grid>
          <Grid item className={classes.gridItem}>
            <CustomButton
              label='ORDINARE'
              handleFunc={handleOrderFunc}
              alterStyle={classes.orderBtnXL}
            />
          </Grid>
        </>
      ) : (
        <Grid item className={classes.gridItem}>
          <div
            onClick={orderCard ? orderExpandMore : expandMore}
            className={classes.expandMoreStyle}>
            <div>Vedere l'ordine</div>
            <div>.&nbsp;.&nbsp;.</div>
          </div>
        </Grid>
      )}
    </Grid>
  );
}
