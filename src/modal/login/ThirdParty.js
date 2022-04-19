import React from "react";
import { Grid } from "@material-ui/core";

// function FacebookLogin() {
//   console.log(1111111);
//   return (

//   );
// }

// function GoogleLogin() {
//   console.log(222222);

//   return (

//   );
// }

export default function ThirdParty() {
  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item>
        <div
          data-width=""
          data-size="large"
          data-layout="default"
          data-auto-logout-link="false"
          className="fb-login-button"
          data-button-type="login_with"
          //   data-auto-logout-link='true'
          data-scope="public_profile,email"
          // data-use-continue-as='true'
          data-onlogin="checkLoginState()"
        ></div>
      </Grid>
      <Grid item>
        <div
          className="g-signin2"
          data-width="225"
          data-height="38"
          data-longtitle="true"
          data-onsuccess="onSignIn"
        ></div>
      </Grid>
    </Grid>
  );
}
