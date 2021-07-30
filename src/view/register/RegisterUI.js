import React, { useState } from "react";
import InputAccount from "../../component/input/InputAccount";
import InputPassword from "../../component/input/InputPassword";
import { Grid } from "@material-ui/core";

export default function RegisterUI(props) {
  const [showPwd, setShowPwd] = useState(false);

  const {
    showPhonePre,
    registerData,
    handleChange,
    handleSubmit,
    handleSendCode,
  } = props;

  const toggleShowPwd = (e) => {
    e.preventDefault();
    setShowPwd((prev) => !prev);
  };

  return (
    <form autoComplete='off'>
      <Grid container direction='column' spacing={2} style={{width:"600px"}}>
        <InputAccount
          showPhonePre={showPhonePre}
          phonepre={registerData.phonePre}
          account={registerData.account}
          handleChange={handleChange}
        />
        <InputPassword
          password={registerData.password}
          handleChange={handleChange}
        />
        <InputPassword
          pwdLabel='Confirm Password'
          pwdLabelWidth={135}
          password={registerData.passwordConfirm}
          handleChange={handleChange}
        />
        <div>
          <label>Verification Code</label>
          <br />
          <input
            type='text'
            onChange={(e) => {
              handleChange(e, "otp");
            }}
          />
          <button onClick={handleSendCode}>Send Code</button>
        </div>
        <br />
        <button onClick={handleSubmit}>Register</button>{" "}
      </Grid>
    </form>
  );
}
