import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// import LoginModal from "../modal/login/LoginModal";
import RegisterModal from "../modal/register/RegisterModal";

const HomePage = lazy(() => import("../view/home/HomePage"));
const ShopPage = lazy(() => import("../view/shop/ShopPage"));
const CityPage = lazy(() => import("../view/city/CityPage"));
const ProdPage = lazy(() => import("../view/prod/ProdPage"));
const OrdersPage = lazy(() => import("../view/order/OrdersPage"));
const CartDetailPage = lazy(() => import("../view/order/CartDetailPage"));
const OrderDetailPage = lazy(() => import("../view/order/OrderDetailPage"));

export default function Router() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path='/register'>
          <RegisterModal />
        </Route>
        <Route exact path='/home'>
          <HomePage />
        </Route>
        {/* introduction without loging in */}
        <Route exact path='/city/:_id'>
          <CityPage />
        </Route>
        <Route exact path='/shop/:_id'>
          <ShopPage />
        </Route>
        <Route exact path='/prod/:_id'>
          <ProdPage />
        </Route>
        <Route exact path='/cart/:_id'>
          <CartDetailPage />
        </Route>
        <Route exact path='/order/:_id'>
          <OrderDetailPage />
        </Route>
        <Route exact path='/orders'>
          <OrdersPage />
        </Route>

        <Redirect to='/home' />
      </Switch>
    </Suspense>
  );
}
