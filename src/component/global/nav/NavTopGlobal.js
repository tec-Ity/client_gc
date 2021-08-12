import React, { useState, useEffect } from "react";
import { delete_Prom } from "../../../api";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAccessToken,
  setShowLogin,
} from "../../../redux/curClient/curClientSlice";
import { Link } from "react-router-dom";
import { setShowCarts } from "../../../redux/cart/cartSlice";

const useStyle = makeStyles({
  root: {
    /* Rectangle 442 */
    zIndex: "1",
    position: "fixed",
    height: "91px",
    left: "0px",
    right: "0px",
    top: "0px",
    background: "#c0e57b",
    /* 0,0,20,0 - 10% */
    boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  navIcon: {
    // position: "absolute",
    // left: "75px",
    // top: "20px",
    width: "200px",
    height: "50px",
  },
  menuStyle: {
    position: "absolute",
    right: "0",
    bottom: "0",
  },
  loginButton: {
    marginRight: "6.25%",
  },
});

export default function NavTopGlobal() {
  const classes = useStyle();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.curClient.isLogin);
  const handleLogout = async () => {
    const tpl = localStorage.getItem("thirdPartyLogin");
    switch (tpl) {
      case "facebook":
        window.FB.getLoginStatus(async function (response) {
          console.log(response);
          window.FB.logout(function (response) {
            console.log(response);
            async function func() {
              const result = await delete_Prom("/logout");
              if (result.status === 200) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("crClient");
                localStorage.removeItem("thirdPartyLogin");

                window.location.reload();
              } else {
                alert(result.message);
              }
              // setRefresh(r=>r+1)
            }
            func();
          });
        });
        return;
      case "google":
        var auth2;
        window.gapi.load("auth2", function () {
          /**
           * Retrieve the singleton for the GoogleAuth library and set up the
           * client.
           */
          async function authInit() {
            auth2 = await window.gapi.auth2.init({
              client_id: localStorage.getItem("google"),
            });

            console.log(auth2);
            auth2 = window.gapi.auth2.getAuthInstance();
            console.log(auth2);
            auth2.signOut().then(function () {
              console.log("用户注销成功");
              async function func() {
                const result = await delete_Prom("/logout");
                if (result.status === 200) {
                  localStorage.removeItem("accessToken");
                  localStorage.removeItem("refreshToken");
                  localStorage.removeItem("crClient");
                  localStorage.removeItem("google");
                  localStorage.removeItem("thirdPartyLogin");

                  window.location.reload();
                } else {
                  alert(result.message);
                }
                // setRefresh(r=>r+1)
              }
              func();
            });
          }
          authInit();
        });

        return;

      default:
        const result = await delete_Prom("/logout");
        if (result.status === 200) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("crClient");
          localStorage.removeItem("thirdPartyLogin");

          window.location.reload();
        } else {
          alert(result.message);
        }
        return;
    }
  };

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
    <div className={classes.root}>
      <div style={{ marginLeft: "6.25%" }}>
        <Link to='/home'>
          <img
            className={classes.navIcon}
            src={process.env.PUBLIC_URL + "/icon/logo.png"}
            alt='logo'
          />
        </Link>
      </div>
      {isLogin ? (
        <div className={classes.menuStyle}>
          <button onClick={() => dispatch(setShowCarts(true))}>购物车</button>
          <button>订单</button>
          <button>个人中心</button>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      ) : (
        <div className={classes.loginButton}>
          <button
            onClick={() => {
              dispatch(setShowLogin(true));
              console.log("login open");
            }}>
            Login
          </button>
        </div>
      )}
    </div>
  );
}
