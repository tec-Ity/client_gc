// import { Link } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { 
  useDispatch,
  // useSelector
} from "react-redux";
import { fetch_Prom } from "../../api";
import {
  // setAccessToken,
  setCurClientInfo,
  setIsLogin,
} from "../../redux/curClient/curClientSlice";
import LoginModalUI from "./LoginModalUI";

export default function LoginModal() {
  const dispatch = useDispatch();
  const [showPhonePre, setShowPhonePre] = useState(false);
  const [nations, setNations] = useState([]);
  const [loginData, setLoginData] = useState({
    account: "",
    accountType: "phone",
    phonePre: "0039",
    password: "",
  });

  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "./thirdPartyLogin.js";
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "ThirdPartyLogin");

  useEffect(() => {
    async function getNation() {
      const result = await fetch_Prom("/Nations");
      console.log(result);
      const nations = result.data?.objects;
      setNations(nations);
    }
    getNation();
  }, []);

  const isPhone = (valueIn) => {
    if (valueIn.length === 0) {
      setShowPhonePre(false);
    } else if (valueIn[0] === "+" && !isNaN(valueIn[1]) && !isNaN(valueIn[2])) {
      setLoginData((prev) => ({
        ...prev,
        phonePre: "00" + valueIn.substring(1, 3),
      }));
      setShowPhonePre(true);
      setLoginData((prev) => ({ ...prev, account: "" }));
    } else {
      if (valueIn.indexOf("@") !== -1) {
        setShowPhonePre(false);
      } else if (isNaN(valueIn)) {
        setShowPhonePre(false);
      } else if (valueIn.length > 6 && !isNaN(valueIn)) {
        setShowPhonePre(true);
      }
    }
  };

  const handleChange = (field) => (e) => {
    if (field === "account") {
      setLoginData((prev) => ({ ...prev, account: e.target.value }));
      isPhone(e.target.value);
    } else {
      setLoginData((prev) => ({ ...prev, [field]: e.target.value }));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const system = {};
    switch (loginData.accountType) {
      case "code":
        system.code = loginData.account;
        break;
      case "email":
        system.email = loginData.account;
        break;
      case "phone":
        system.phone = loginData.account;
        system.phonePre = loginData.phonePre;
        break;
      default:
        break;
    }

    system.pwd = loginData.password;
    console.log(system);
    const result = await fetch_Prom("/login", "POST", { system });
    console.log(result);
    if (result.status === 200) {
      dispatch(setCurClientInfo(result.data?.curClient));
      localStorage.setItem("accessToken", result.data?.accessToken);
      localStorage.setItem("refreshToken", result.data?.refreshToken);
      localStorage.setItem("thirdPartyLogin", "");
      // window.location.replace("/home");
      dispatch(setIsLogin(true));
    }
  };

  return (
    <LoginModalUI
      loginData={loginData}
      handleLogin={handleLogin}
      handleChange={handleChange}
      showPhonePre={showPhonePre}
      nations={nations}
    />
  );
}
