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
import { Button, InputAdornment } from "@material-ui/core";
import { ReactComponent as Cart } from "../../icon/cart.svg";
import { ReactComponent as Order } from "../../icon/order.svg";
import { ReactComponent as User } from "../../icon/user.svg";
import SearchInput from "./SearchInput";
import NavAddr from "./NavAddr";
import { useTranslation } from "react-i18next";
import MenuIcon from "@material-ui/icons/Menu";
import PersonIcon from "@material-ui/icons/Person";
import { setShowDrawer } from "../../../redux/shop/shopSlice";

const useStyleWeb = makeStyles({
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
  leftContent: {
    marginLeft: "80px",
    display: "flex",
    alignItems: "center",
    // justifyContent: "space-between",
    width: "100%",
  },
  navIcon: {
    // width: "200px",
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
});

export default function NavTopGlobal() {
  const classes = useStyleWeb();
  const dispatch = useDispatch();
  const view = useSelector((state) => state.root.view);
  const isLogin = useSelector((state) => state.curClient.isLogin);
  const carts = useSelector((state) => state.cart.carts);
  const curCartTotItem = useSelector((state) => state.cart.curCart.totItem);
  const inShop = useSelector((state) => state.cart.inShop);
  const curShop = useSelector((state) => state.shop.curShop);
  const userSelectedLocation = useSelector(
    (state) => state.curClient.userSelectedLocation
  );
  // console.log(view);
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
  const propObj = {
    isLogin,
    userSelectedLocation,
    curShop,
    inShop,
    curCartTotItem,
    logo: {
      link: isLogin && userSelectedLocation ? "/city" : "/home",
      imgSrc: process.env.PUBLIC_URL + "/icon/logo.png",
    },

    btnGroup: {
      showCarts: () => dispatch(setShowCarts(true)),
    },
  };

  const comps = {
    web: NavWeb,
    mobile: NavMobile,
  };
  console.log(view);
  const UI = comps[view];
  return <UI {...propObj} />;
}

function NavWeb(props) {
  const { t } = useTranslation();
  const { isLogin, curShop, inShop, curCartTotItem, carts, logo, btnGroup } =
    props;
  const classes = useStyleWeb();
  const dispatch = useDispatch();
  return (
    <>
      <div className={classes.root}>
        <div className={classes.leftContent}>
          <div>
            <Link to={logo.link}>
              <img className={classes.navIcon} src={logo.imgSrc} alt="logo" />
            </Link>
          </div>
          {isLogin && <NavAddr />}
          {curShop && <SearchInput />}
        </div>
        {isLogin ? (
          <div style={{ marginRight: "5%", minWidth: "200px" }}>
            <Button
              disableRipple
              classes={{ root: classes.btnStyle }}
              onClick={btnGroup.showCarts}
            >
              {/* <Cart /> */}
              <div style={{ position: "relative" }}>
                <Cart className={classes.btnsIcon} />
                {/* cart alert */}
                {/* {//console.log(carts)} */}
                {inShop === true
                  ? curCartTotItem && (
                      <div className={classes.alertNum}>{curCartTotItem}</div>
                    )
                  : carts?.length > 0 && (
                      <div className={classes.alertDot}></div>
                    )}
              </div>
            </Button>
            <Button
              disableRipple
              classes={{ root: classes.btnStyle }}
              onClick={() => dispatch(setShowOrders(true))}
            >
              <div style={{ position: "relative" }}>
                <Order className={classes.btnsIcon} />
              </div>
            </Button>
            <Button
              disableRipple
              classes={{ root: classes.btnStyle }}
              onClick={() => dispatch(setShowSelfCenter(true))}
            >
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
                // //console.log("login open");
              }}
            >
              <div className={classes.loginButton}>
                <User />
                <div>{t("login.login")}</div>
              </div>
            </Button>
          </div>
        )}
      </div>
      <div style={{ height: "83px" }}></div>
    </>
  );
}

const useStyleMobile = makeStyles({
  root: {
    zIndex: "1",
    position: "fixed",
    top: 0,
    height: "105px",
    width: "100vw",
    background: "#C0E57B",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
  },
  topSection: {
    zIndex: 2,
    height: "55px",
    widht: "100%",
    background: "#F0F0F0",
    display: "flex",
    justifyContent: "space-between",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
    alignItems: "center",
    "& > :nth-child(1)": {
      width: "55px",
      height: 30,
      // border: "1px solid",
      padding: "5px 0 0 10px",
    },
    "& > :nth-child(2)": {
      width: "110px",
      height: "28px",
    },
    "& > :nth-child(3)": {
      width: "55px",
      height: 30,
      // border: "1px solid",
      padding: "5px 10px 0 0 ",
      textAlign: "end",
    },
  },
  bottomSection: {
    height: "50px",
    widht: "100%",
  },
  logoStyle: {
    height: "28px",
    width: "110px",
  },
});

function NavMobile({ logo, isLogin, inShop, curShop }) {
  const classes = useStyleMobile();
  const dispatch = useDispatch();
  return (
    <div className={classes.root}>
      <div className={classes.topSection}>
        <div
          onClick={() =>
            isLogin && inShop && curShop && dispatch(setShowDrawer(true))
          }
        >
          {isLogin && inShop && curShop && <MenuIcon />}
        </div>
        <Link to="/">
          <img src={logo.imgSrc} className={classes.logoStyle} alt="" />
        </Link>
        <div onClick={() => dispatch(setShowSelfCenter(true))}>
          <PersonIcon />
        </div>
      </div>
      <div className={classes.bottomSection}>
        <NavAddr />
      </div>
    </div>
  );
}
