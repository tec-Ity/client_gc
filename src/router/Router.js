import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// import LoginModal from "../modal/login/LoginModal";
import RegisterModal from "../modal/register/RegisterModal";
import { useSelector } from "react-redux";
const HomePage = lazy(() => import("../view/home/HomePage"));
const ShopPage = lazy(() => import("../view/shop/ShopPage"));
const CityPage = lazy(() => import("../view/city/CityPage"));
const ProdPage = lazy(() => import("../view/prod/ProdPage"));
const OrdersPage = lazy(() => import("../view/order/OrdersPage"));
const CartDetailPage = lazy(() => import("../view/order/CartDetailPage"));
const OrderDetailPage = lazy(() => import("../view/order/OrderDetailPage"));

export default function Router() {
  const userSelectedLocation = useSelector(
    (state) => state.curClient.userSelectedLocation
  );
  return (
    <Suspense fallback={<div></div>}>
      <Switch>
        <Route exact path="/register">
          <RegisterModal />
        </Route>

        <Route exact path="/home">
          <HomePage />
        </Route>

        {/* {!userSelectedLocation && (
          <Route exact path="/home">
            <HomePage />
          </Route>
        )} */}
        {/* introduction without loging in */}
        <Route exact path="/city/:cityCode">
          <CityPage />
        </Route>
        <Route exact path="/city">
          <CityPage />
        </Route>
        <Route exact path="/shop/:_id">
          <ShopPage />
        </Route>
        <Route exact path="/prod/:_id">
          <ProdPage />
        </Route>
        <Route exact path="/cart/:_id">
          <CartDetailPage />
        </Route>
        <Route exact path="/order/:_id">
          <OrderDetailPage />
        </Route>
        <Route exact path="/orders">
          <OrdersPage />
        </Route>

        <Redirect to={"/home"} />
        {/* <Redirect to={userSelectedLocation ? "/city/" : "/home"} /> */}
      </Switch>
    </Suspense>
  );
}
