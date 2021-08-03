import React from "react";
import NavTopGlobal from "./component/global/nav/NavTopGlobal";
import Router from "./router/Router";
import {BrowserRouter} from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <NavTopGlobal />
      <Router />
    </BrowserRouter>
  );
}
