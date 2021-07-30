const api_DNS = "https://192.168.43.20:4000";
const api_version = "/api/v1";

/* ===================================== backend api ===================================== */
const fetchPost_Prom = (api_router, bodyObj) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const api = api_DNS + api_version + api_router;

      const resPromise = await fetch(api, {
        body: JSON.stringify(bodyObj),
        headers: {
          "content-type": "application/json",
          authorization: "accessToken " + accessToken,
        },
        method: "POST",
        cache: "no-cache",
        credentials: "same-origin",
        mode: "cors",
        redirect: "follow",
        referrer: "no-referrer",
      });

      const result = await resPromise.json();

      resolve(result);
    } catch (error) {
      console.log(error);
      reject({ message: "fetchPost_Prom error", error });
    }
  });
};

const fetchGet_Prom = (api_router) => {
  return new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem("accessToken");
      const api = api_DNS + api_version + api_router;
      const resPromise = await fetch(api, {
        headers: {
          "content-type": "application/json",
          authorization: "accessToken " + token,
        },
        method: "GET",
        cache: "no-cache",
        credentials: "same-origin",
        mode: "cors",
        redirect: "follow",
        referrer: "no-referrer",
      });
      const result = await resPromise.json();
      resolve(result);
    } catch (error) {
      reject({ message: "fetchGet_Prom error", error });
    }
  });
};

/* ===================================== facebook ===================================== */
const responseFacebook = async (response, accessToken) => {
  console.log(response);
  const social = {};
  social.login_type = "facebook";
  social.Client_accessToken = accessToken;
  const result = await fetchPost_Prom("/login", {
    social,
  });

  console.log(result);
  if (result.status === 200) {
    localStorage.setItem("accessToken", result.data?.accessToken);
    localStorage.setItem("crClient", result.data?.crClient);
    localStorage.setItem("refreshToken", result.data?.refreshToken);
    localStorage.setItem("thirdPartyLogin", 'facebook');

    window.location.reload();
  } else {
    console.log(result.message);
  }
};

async function statusChangeCallback(response) {
  // Called with the results from FB.getLoginStatus().
  console.log("statusChangeCallback");
  console.log(response); // The current login status of the person.
  if (response.status === "connected") {
    // Logged into your webpage and Facebook.
    // const userFB = await window.facebookUserAwait();
    window.FB.api("/me", { fields: "name,email" }, function (response1) {
      console.log(response1);
      responseFacebook(response1, response.authResponse.accessToken);

      console.log("Successful login for: " + response1.name);
    });
  } else {
    console.log(1111);
    // Not logged into your webpage or we are unable to tell.
  }
}

(async function (d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  const result = await fetchGet_Prom("/get_social_AppId");
  js = d.createElement(s);
  js.id = id;
  js.src = `//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v10.0&appId=${result?.data?.facebook}`;
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");

// eslint-disable-next-line no-unused-vars
function checkLoginState() {
  // Called when a person is finished with the Login Button.
  window.FB.getLoginStatus(function (response) {
    // See the onlogin handler
    statusChangeCallback(response);
  });
}





/* ===================================== google ===================================== */

//  <meta name="google-signin-scope" content="profile email">
(function (d, s, id) {
  var mt,
    fmt = d.getElementsByTagName("link")[0];
  if (d.getElementById(id)) return;
  mt = d.createElement(s);
  mt.id = id;
  mt.name = "google-signin-scope";
  mt.content = "profile email";
  fmt.parentNode.insertBefore(mt, fmt);
})(document, "meta", "google-signin-scope");

//   <meta name="google-signin-client_id" content="YOUR_CLIENT_ID.apps.googleusercontent.com">
(async function (d, s, id) {
  var mt,
    fmt = d.getElementsByTagName("link")[0];
  if (d.getElementById(id)) return;

  const result = await fetchGet_Prom("/get_social_AppId");
  mt = d.createElement(s);
  mt.id = id;
  mt.name = "google-signin-client_id";
  mt.content = result.data.google;
  fmt.parentNode.insertBefore(mt, fmt);

  // <script src="https://apis.google.com/js/platform.js" async defer></script>
  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://apis.google.com/js/platform.js";
    js.async = true;
    js.defer = true;
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "google-scirpt");
})(document, "meta", "google-signin-client_id");

// eslint-disable-next-line no-unused-vars
function onSignIn(googleUser) {
  //   // Useful data for your client-side scripts:
  //   var profile = googleUser.getBasicProfile();
  //   console.log("ID: " + profile.getId()); // Don't send this directly to your server!
  //   console.log("Full Name: " + profile.getName());
  //   console.log("Given Name: " + profile.getGivenName());
  //   console.log("Family Name: " + profile.getFamilyName());
  //   console.log("Image URL: " + profile.getImageUrl());
  //   console.log("Email: " + profile.getEmail());
  // window.location.reload();
  // The ID token you need to pass to your backend:
  async function func(token) {
    const social = {};
    social.login_type = "google";
    social.Client_accessToken = token;
    const result = await fetchPost_Prom("/login", {
      social,
    });
    console.log(1);
    console.log(result);
    if (result.status === 200) {
      localStorage.setItem("accessToken", result.data?.accessToken);
      localStorage.setItem("crClient", result.data?.crClient);
      localStorage.setItem("refreshToken", result.data?.refreshToken);
      localStorage.setItem("thirdPartyLogin", 'google');
      const result2 = await fetchGet_Prom("/get_social_AppId");
      localStorage.setItem('google', result2.data.google)
      
      
      window.location.reload();
    } else {
      console.log(result.message);
    }
  }

  func(googleUser.getAuthResponse().id_token);
}
