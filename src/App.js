import React, { lazy, Suspense, useEffect } from "react";
import NavTopGlobal from "./component/global/nav/NavTopGlobal";
import Router from "./router/Router";
import { BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddrSelModal from "./modal/address/AddrSelModal";
import { useLoadScript } from "@react-google-maps/api";
import { setView } from "./redux/rootSlice";

const libraries = ["places"];

export default function App() {
  const dispatch = useDispatch();
  //lazy imports
  const LoginModal = lazy(() => import("./modal/login/LoginModal"));
  const RegisterModal = lazy(() => import("./modal/register/RegisterModal"));
  const CartModal = lazy(() => import("./modal/cart/CartModal"));
  const OrderModal = lazy(() => import("./modal/order/OrderModal"));
  const SelfCenterModal = lazy(() =>
    import("./modal/SelfCenter/SelfCenterModal")
  );
  const isLogin = useSelector((state) => state.curClient.isLogin);
  const showLogin = useSelector((state) => state.curClient.showLogin);
  const showRegister = useSelector((state) => state.curClient.showRegister);
  const showCarts = useSelector((state) => state.cart.showCarts);
  const showOrders = useSelector((state) => state.order.showOrders);
  const showSelfCenter = useSelector((state) => state.curClient.showSelfCenter);
  const showAddrSel = useSelector((state) => state.curClient.showAddrSel);

  useLoadScript({
    googleMapsApiKey: "AIzaSyBGjEZfiy-qg-pIE4g_uFHxMGEkALwDc5c",
    libraries, //put library outside compmponent to avoid unnacessary rerenders
  });
  useEffect(() => {
    window.document.getElementsByTagName("html")[0].style.scrollBehavior =
      "smooth";
    setTimeout(function () {
      window.scrollTo(0, 0);
    }, 2000);
  }, []);

  useEffect(() => {
    // console.log(window.innerWidth);

    function adjustWidth() {
      // console.log(window.innerWidth);
      dispatch(setView({ width: window.innerWidth }));
    }

    // if (
    //   /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    //     navigator.userAgent
    //   )
    // ) {
    //   // true for mobile device
    //   console.log("mobile");

    // } else {
    //   // false for not mobile device
    //   console.log("web");
    // }
    adjustWidth();
    window.addEventListener("resize", adjustWidth);
    return () => {
      window.removeEventListener("resize", adjustWidth());
    };
  }, [dispatch]);

  return (
    <BrowserRouter>
      <NavTopGlobal />
      <Suspense fallback={<></>}>
        {/* login */}
        {showLogin === true && isLogin === false && <LoginModal />}
        {/* register */}
        {showRegister === true && <RegisterModal />}
        {/* curCli */}
        {showSelfCenter === true && <SelfCenterModal />}
        {/* cart */}
        {showCarts === true && <CartModal />}
        {/* order */}
        {showOrders === true && <OrderModal />}
        {/* address selection & new address modal */}
        {showAddrSel === true && <AddrSelModal />}
      </Suspense>
      <Router />
    </BrowserRouter>
  );
}
