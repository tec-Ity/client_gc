import React, {
  // useState,
  useEffect,
} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAccessToken,
  setShowAddrSel,
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
import { ReactComponent as ArrowDown } from "../../icon/chevron-down.svg";
const useStyle = makeStyles({
  root: {
    zIndex: "1",
    position: "fixed",
    height: "91px",
    left: "0px",
    right: "0px",
    top: "0px",
    background:
      "linear-gradient(270deg, #91E8B3 0%, #C0E57B 100%, #C0E57B 100%)",
    boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontFamily: "Montserrat",
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
    fontFamily: "Montserrat",
    fontWeight: "bold",
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
  //addr sectionHeader
  addrBox: {
    marginLeft: "60px",
    // consegna a
    "& > :nth-child(1)": {
      fontWeight: "600",
      fontSize: "12px",
    },
    // addr + icon
    "& > :nth-child(2)": {
      cursor: "pointer",
      display: "flex",
      // addr
      "& > :nth-child(1)": { fontSize: "15px" },
      //icon box
      "& > :nth-child(2)": {
        // icon
        display: "flex",
        alignItems: "center",
        "& > :nth-child(1)": { height: "18px", width: "18px" },
      },
    },
  },
});

export default function NavTopGlobal() {
  const classes = useStyle();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.curClient.isLogin);
  const carts = useSelector((state) => state.cart.carts);
  const curCartTotItem = useSelector((state) => state.cart.curCart.totItem);
  const inShop = useSelector((state) => state.cart.inShop);
  const userSelectedLocation = useSelector(
    (state) => state.curClient.userSelectedLocation
  );
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
        <div
          style={{ marginLeft: "80px", display: "flex", alignItems: "center" }}>
          <div>
            <Link to={isLogin && userSelectedLocation ? "/city" : "/home"}>
              <img
                className={classes.navIcon}
                src={process.env.PUBLIC_URL + "/icon/logo.png"}
                alt='logo'
              />
            </Link>
          </div>

          {isLogin && (
            <div className={classes.addrBox}>
              <div>Consegna a:</div>
              <div onClick={() => dispatch(setShowAddrSel(true))}>
                {userSelectedLocation ? (
                  <>
                    <div>{userSelectedLocation.addr?.slice(0, 30) + "..."}</div>
                    <div>
                      <ArrowDown />
                    </div>
                  </>
                ) : (
                  <div>Scegli il tuo indirizzo</div>
                )}
              </div>
            </div>
          )}
        </div>
        {isLogin ? (
          <div style={{ marginRight: "5%" }}>
            <Button
              disableRipple
              classes={{ root: classes.btnStyle }}
              onClick={() => dispatch(setShowCarts(true))}>
              {/* <Cart /> */}
              <div style={{ position: "relative" }}>
                <Cart className={classes.btnsIcon} />
                {/* cart alert */}
                {/* {console.log(carts)} */}
                {inShop === true
                  ? curCartTotItem && (
                      <div className={classes.alertNum}>{curCartTotItem}</div>
                    )
                  : carts.length > 0 && (
                      <div className={classes.alertDot}></div>
                    )}
              </div>
            </Button>
            <Button
              disableRipple
              classes={{ root: classes.btnStyle }}
              onClick={() => dispatch(setShowOrders(true))}>
              <div style={{ position: "relative" }}>
                <Order className={classes.btnsIcon} />
              </div>
            </Button>
            <Button
              disableRipple
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
              disableRipple
              classes={{ root: classes.btnStyle }}
              onClick={() => {
                dispatch(setShowLogin(true));
                console.log("login open");
              }}>
              <div className={classes.loginButton}>
                <User />
                <div>LOG IN</div>
              </div>
            </Button>
          </div>
        )}
      </div>
      <div style={{ height: "83px" }}></div>
    </>
  );
}
