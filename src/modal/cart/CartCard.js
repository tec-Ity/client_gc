import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import CartTable from "./CartTable";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCartByShop,
  setCurCart,
  setIsExpand,
} from "../../redux/cart/cartSlice";

const useStyle = makeStyles((theme) => ({
  root: {
    // maxHeight: "270px",
    // height:'1000px',
    width: "443px",
    boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.1)",
    borderRadius: "20px 20px 20px 0px",
    marginTop: "20px",
    marginBottom: "20px",
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
    width: "86px",
    background: "#1D1D38",
    borderRadius: "8.4375px 8.4375px 8.4375px 0px",
    fontFamily: "Montserrat",
    color: "#fff",
    fontSize: "12px",
    fontWeight: "700",
    opacity: "0.8",
    "&:hover": {
      opacity: "1",
      background: "#1D1D38",
    },
    "&:focus": {
      background: "#e47f10",
    },
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
    background: "#1D1D38",
    borderRadius: "19.5312px 19.5312px 19.5312px 0px",
    fontFamily: "Montserrat",
    color: "#fff",
    fontSize: "24px",
    fontWeight: "700",
    opacity: "0.8",
    marginBottom: "24px",
    "&:hover": {
      opacity: "1",
      background: "#1D1D38",
    },
    "&:focus": {
      background: "#e47f10",
    },
  },
}));

export default function CartCard(props) {
  const { cart, count, isExpand } = props;
  const { Shop, cartTotPrice, OrderProds } = cart;
  const dispatch = useDispatch();
  const curCart = useSelector((state) => state.cart.curCart);
  const classes = useStyle();
  React.useEffect(() => {}, []);

  const expandMore = () => {
    dispatch(setCurCart(Shop._id));
    dispatch(setIsExpand(Shop._id));
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item className={classes.gridItem}>
          <div className={clsx(classes.shopTitle, classes.marginHead)}>
            SHOP NO. <span title={Shop.nome}>{Shop.nome}</span>
          </div>
          <div className={classes.marginHead}>
            <Button className={classes.orderBtn}>ORDINARE</Button>
          </div>
        </Grid>
        <Grid item className={classes.gridItem}>
          {isExpand ? (
            <CartTable OrderProds={curCart.OrderProds} count={count} />
          ) : (
            <CartTable OrderProds={OrderProds} count={count} />
          )}
        </Grid>
        {isExpand ? (
          <>
            <Grid item className={classes.gridItem}>
              <div className={clsx(classes.moreInfo, classes.margin)}>^</div>
              <div className={clsx(classes.totalAmount, classes.marginFoot)}>
                <div>TOTALE</div>
                <div>€{curCart?.cartTotPrice.toFixed(2)}</div>
              </div>
            </Grid>
            <Grid item className={classes.gridItem}>
              <Button className={classes.orderBtnXL}>ORDINARE</Button>
            </Grid>
          </>
        ) : (
          <Grid item className={classes.gridItem}>
            <button onClick={expandMore}>more</button>
          </Grid>
        )}
      </Grid>
    </div>
  );
}
