import React, { lazy, Suspense } from "react";
import NavTopGlobal from "./component/global/nav/NavTopGlobal";
import Router from "./router/Router";
import { BrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";

export default function App() {
  //lazy imports
  const LoginModal = lazy(() => import("./modal/login/LoginModal"));
  const RegisterModal = lazy(() => import("./modal/register/RegisterModal"));
  const CartModal = lazy(() => import("./modal/cart/CartModal"));
  const OrderModal = lazy(() => import("./modal/order/OrderModal"));
  const isLogin = useSelector((state) => state.curClient.isLogin);
  const showLogin = useSelector((state) => state.curClient.showLogin);
  const showRegister = useSelector((state) => state.curClient.showRegister);
  const showCarts = useSelector((state) => state.cart.showCarts);
  const showOrders = useSelector((state) => state.order.showOrders);
  return (
    <BrowserRouter>
      <NavTopGlobal />
      <Suspense fallback={<></>}>
        {/* login */}
        {showLogin === true && isLogin === false && <LoginModal />}
        {/* register */}
        {showRegister === true && <RegisterModal />}
        {/* curCli */}
        {/* cart */}
        {showCarts === true && <CartModal />}
        {/* order */}
        {showOrders === true && <OrderModal />}
      </Suspense>
      <Router />
    </BrowserRouter>
  );
}
