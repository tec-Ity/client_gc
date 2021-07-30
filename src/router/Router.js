import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginPage from "../view/login/LoginPage";
import RegisterPage from "../view/register/RegisterPage";

const HomePage = lazy(() => import("../view/home/HomePage"));
const ShopPage = lazy(() => import("../view/shop/ShopPage"));
const CityPage = lazy(() => import("../view/city/CityPage"));
const ProdPage = lazy(() => import("../view/prod/ProdPage"));

export default function Router() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path='/login'>
          <LoginPage />
        </Route>
        <Route exact path='/register'>
          <RegisterPage />
        </Route>
        <Route exact path='/home'>
          <HomePage />
        </Route>
        <Route exact path='/city/:_id'>
          <CityPage />
        </Route>
        <Route exact path='/shop/:_id'>
          <ShopPage />
        </Route>

        <Route exact path='/prod/:_id'>
          <ProdPage />
        </Route>

        <Redirect to='/home' />
      </Switch>
    </Suspense>
  );
}
