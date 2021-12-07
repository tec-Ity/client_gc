import React, { useState, useEffect } from "react";
import { fetch_Prom } from "../../api";
import RegisterModalUI from "./RegisterModalUI";

export default function RegisterModal(props) {
  const [showPhonePre, setShowPhonePre] = useState(false);
  const [nations, setNations] = useState([]);
  const [registerData, setRegisterData] = useState({
    phonePre: "0039",
    account: "",
    password: "",
    passwordConfirm: "",
    otp: "",
  });

  useEffect(() => {
    async function getNation() {
      const result = await fetch_Prom("/Nations");
      const nations = result.data.objects;
      setNations(nations);
    }

    getNation();
  }, []);

  const isPhone = (valueIn) => {
    if (valueIn.length === 0) {
      setShowPhonePre(false);
    } else if (valueIn[0] === "+" && !isNaN(valueIn[1]) && !isNaN(valueIn[2])) {
      setRegisterData((prev) => ({
        ...prev,
        phonePre: "00" + valueIn.substring(1, 3),
      }));
      setShowPhonePre(true);
      setRegisterData((prev) => ({ ...prev, account: "" }));
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
      setRegisterData((prev) => ({ ...prev, account: e.target.value }));
      isPhone(e.target.value);
    } else {
      setRegisterData((prev) => ({ ...prev, [field]: e.target.value }));
    }
  };

  const handleSendCode = async () => {
    showPhonePre === true
      ? await fetch_Prom("/obtain_otp", "POST", {
          phoneNum: registerData.account,
          phonePre: registerData.phonePre,
        })
      : await fetch_Prom("/obtain_otp", "POST", {
          email: registerData.account,
        });
    //console.log(result);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = {};
    obj.pwd = registerData.password;
    if (showPhonePre === true) {
      obj.phonePre = registerData.phonePre;
      obj.phoneNum = registerData.account;
    } else {
      obj.email = registerData.account;
    }
    obj.otp = registerData.otp;
    //console.log(obj);
    const result = await fetch_Prom("/register", "POST", obj);
    //console.log(result);
    if (result.status === 200) {
      //console.log("success");
      window.location.replace("/login");
    }
  };
  return (
    <RegisterModalUI
      registerData={registerData}
      nations={nations}
      showPhonePre={showPhonePre}
      handleChange={handleChange}
      handleSendCode={handleSendCode}
      handleSubmit={handleSubmit}
    />
  );
}
