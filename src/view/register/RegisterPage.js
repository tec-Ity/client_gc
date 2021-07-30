import React, { useState, useEffect } from "react";
import { get_Prom, post_Prom } from "../../api";
import RegisterUI from "./RegisterUI";

export default function RegisterPage(props) {
  const [showPhonePre, setShowPhonePre] = useState(false);
  const [nations, setNations] = useState([]);
  const [registerData, setRegisterData] = useState({
    phonePre: "0039",
    account: "",
    password: "",
    passwordConfirm:'',
    otp: "",
  });

  useEffect(() => {
    async function getNation() {
      const result = await get_Prom("/Nations");
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

  const handleSendCode = async (e) => {
    e.preventDefault();
    const result =
      showPhonePre === true
        ? await post_Prom("/obtain_otp", {
            phone: registerData.account,
            phonePre: registerData.phonePre,
          })
        : await post_Prom("/obtain_otp", {
            email: registerData.account,
          });
    console.log(result);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = {};
    obj.pwd = registerData.password;
    if (showPhonePre === true) {
      obj.phonePre = registerData.phonePre;
      obj.phone = registerData.account;
    } else {
      obj.email = registerData.account;
    }
    obj.otp = registerData.otp;
    console.log(obj);
    const result = await post_Prom("/register", obj);
    console.log(result);
    if (result.status === 200) {
      console.log("success");
      window.location.replace("/login");
    }
  };

  return (
    <>
      <RegisterUI
        registerData={registerData}
        nations={nations}
        showPhonePre={showPhonePre}
        handleChange={handleChange}
        handleSendCode={handleSendCode}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
