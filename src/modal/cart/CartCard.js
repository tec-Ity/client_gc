import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
// import { Button } from "@material-ui/core";
import CartTable from "./CartTable";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCartByShop,
  // fetchCartByShop,
  setIsExpand,
  setShowCarts,
} from "../../redux/cart/cartSlice";
import { useHistory } from "react-router";
import CustomButton from "../../component/global/modal/component/CustomButton";

const useStyle = makeStyles((props) => ({
  root: {
    // maxHeight: "270px",
    // height:'1000px',
    // height:'100%',
    width: "443px",
    boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.1)",
    borderRadius: "20px 20px 20px 0px",
    marginTop: "20px",
    marginBottom: "20px",
    paddingBottom: "20px",
  },
  marginHead: {
    margin: "20px 0 10px 0",
  },
  marginFoot: {
    margin: "9px 0 22px 0",
  },
  gridItem: {
    width: "400px",
    margin: "auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  shopTitle: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "12.5p",
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
}));

export default function CartCard(props) {
  const { cart, count = 3, isExpand = null, handleBtn = null } = props;
  const { Shop, OrderProds } = cart;
  const dispatch = useDispatch();
  const hist = useHistory();
  const curCart = useSelector((state) => state.cart.curCart);
  const classes = useStyle(props);

  const expandMore = () => {
    if (curCart.Shop) {
      if (curCart.Shop._id !== Shop._id) {
        dispatch(fetchCartByShop(Shop._id));
      }
    } else {
      dispatch(fetchCartByShop(Shop._id));
    }
    dispatch(setIsExpand(Shop._id));
  };

  const handleOrderFunc = () => {
    expandMore();
    dispatch(setShowCarts(false));
    hist.push("/cart/" + cart._id);
  };

  // console.log(handleBtn);

  return (
    <Grid container item xs={11} className={classes.root}>
      <Grid item className={classes.gridItem}>
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
      <Grid item className={classes.gridItem}>
        <CartTable OrderProds={OrderProds} count={count} isExpand={isExpand} />
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
          <button onClick={expandMore}>more</button>
        </Grid>
      )}
    </Grid>
  );
}
