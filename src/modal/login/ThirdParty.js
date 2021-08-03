import React, { useRef } from "react";
import { Facebook } from "@material-ui/icons";
import Google from "@material-ui/icons/Google";
import { Grid } from "@material-ui/core";

function FacebookLogin() {
  return (
    <div
      data-width=''
      data-size='large'
      data-layout='default'
      data-auto-logout-link='false'
      className='fb-login-button'
      data-button-type='login_with'
      //   data-auto-logout-link='true'
      data-scope='public_profile,email'
      // data-use-continue-as='true'
      data-onlogin='checkLoginState()'></div>
  );
}

function GoogleLogin() {
  return (
    <div
      className='g-signin2'
      data-width='225'
      data-height='38'
      data-longtitle="true"
      data-onsuccess='onSignIn'></div>
  );
}

export default function ThirdParty() {
  return (
    <Grid container direction='column' alignItems='center' spacing={2}>
      <Grid item>
        <FacebookLogin />
      </Grid>
      <Grid item>
        <GoogleLogin />
      </Grid>
    </Grid>
  );
}
