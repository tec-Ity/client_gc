import React, {
  // useState,
  useEffect,
} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAccessToken,
  setShowLogin,
  setShowSelfCenter,
} from "../../../redux/curClient/curClientSlice";
import { Link } from "react-router-dom";
import { setShowCarts } from "../../../redux/cart/cartSlice";
import { setShowOrders } from "../../../redux/order/orderSlice";
import { Button } from "@material-ui/core";
import { ReactComponent as Cart } from "../../icon/cart.svg";
import { ReactComponent as Order } from "../../icon/order.svg";
import { ReactComponent as User } from "../../icon/user.svg";

const useStyle = makeStyles({
  root: {
    zIndex: "1",
    position: "fixed",
    height: "91px",
    left: "0px",
    right: "0px",
    top: "0px",
    background: "#c0e57b",
    boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  navIcon: {
    width: "200px",
    height: "50px",
  },
  menuStyle: {
    position: "absolute",
    right: "0",
    bottom: "0",
    minWidth: "100px",
  },
  loginButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "10px",
  },
  alertNum: {
    position: "absolute",
    background: "#E47F10",
    borderRadius: "100px",
    fontSize: "10px",
    fontWeight: "700",
    color: "#fff",
    width: "20px",
    height: "20px",
    top: "-13px",
    right: "-13px",
    textAlign: "center",
  },
  alertDot: {
    position: "absolute",
    width: "10px",
    height: "10px",
    top: "-5px",
    right: "-5px",
    borderRadius: "100px",
    background: "#E47F10",
  },
  btnStyle: {
    "&:hover": {
      background: "transparent",
    },
  },
  btnsIcon: {
    width: "30px",
    height: "30px",
  },
});

export default function NavTopGlobal() {
  const classes = useStyle();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.curClient.isLogin);
  const curCart = useSelector((state) => state.cart.curCart);
  const curCartTotProd = curCart.totProd;
  const inShop = useSelector((state) => state.cart.inShop);
  useEffect(() => {
    function auth() {
      if (!isLogin) {
        if (localStorage.getItem("refreshToken")) {
          dispatch(fetchAccessToken(localStorage.getItem("refreshToken")));
        }
      }
    }
    auth();
  }, [dispatch, isLogin]);

  return (
    <>
      <div className={classes.root}>
        <div style={{ marginLeft: "80px" }}>
          <Link to='/home'>
            <img
              className={classes.navIcon}
              src={process.env.PUBLIC_URL + "/icon/logo.png"}
              alt='logo'
            />
          </Link>
        </div>
        {isLogin ? (
          <div style={{ marginRight: "5%" }}>
            <Button
              classes={{ root: classes.btnStyle }}
              onClick={() => dispatch(setShowCarts(true))}>
              {/* <Cart /> */}
              <div style={{ position: "relative" }}>
                <Cart className={classes.btnsIcon} />
                {curCart.OrderProds?.length>0 &&
                  (inShop === true ? (
                    <div className={classes.alertNum}>{curCartTotProd}</div>
                  ) : (
                    <div className={classes.alertDot}></div>
                  ))}
              </div>
            </Button>
            <Button
              classes={{ root: classes.btnStyle }}
              onClick={() => dispatch(setShowOrders(true))}>
              <div style={{ position: "relative" }}>
                <Order className={classes.btnsIcon} />
              </div>
            </Button>
            <Button
              classes={{ root: classes.btnStyle }}
              onClick={() => dispatch(setShowSelfCenter(true))}>
              <div style={{ position: "relative" }}>
                <User className={classes.btnsIcon} />
              </div>
            </Button>
          </div>
        ) : (
          <div style={{ marginRight: "5%" }}>
            <Button
              classes={{ root: classes.btnStyle }}
              onClick={() => {
                dispatch(setShowLogin(true));
                console.log("login open");
              }}>
              <div className={classes.loginButton}>
                <User />
                <div>login</div>
              </div>
            </Button>
          </div>
        )}
      </div>
      <div style={{ height: "83px" }}></div>
    </>
  );
}
