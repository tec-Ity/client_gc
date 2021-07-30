import React from "react";
import NavTopGlobal from "./component/global/NavTopGlobal";
import LoginRouter from "./router/Router";
import {BrowserRouter} from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <NavTopGlobal />
      <LoginRouter />
    </BrowserRouter>
  );
}
