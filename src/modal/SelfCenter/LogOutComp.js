import React, { useEffect } from "react";
import { logout_Prom } from "../../api";
import { Link } from "react-router-dom";

export default function LogOutComp() {
  useEffect(() => {
    if (localStorage.getItem("thirdPartyLogin")) {
      (function (d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "/thirdPartyLogin.js";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "ThirdPartyLogin");
    }
  }, []);
  const handleLogout = async () => {
    const tpl = localStorage.getItem("thirdPartyLogin");
    switch (tpl) {
      case "facebook":
        window.FB.getLoginStatus(async function (response) {
          console.log(response);
          window.FB.logout(function (response) {
            console.log(response);
            async function func() {
              const result = await logout_Prom();
              if (result.status !== 200) {
                alert(result.message);
              }
              // setRefresh(r=>r+1)
            }
            func();
          });
        });
        return;
      case "google":
        var auth2;
        window.gapi?.load("auth2", function () {
          /**
           * Retrieve the singleton for the GoogleAuth library and set up the
           * client.
           */
          async function authInit() {
            auth2 = await window.gapi.auth2.init({
              client_id: localStorage.getItem("google"),
            });

            console.log(auth2);
            auth2 = window.gapi.auth2.getAuthInstance();
            console.log(auth2);
            auth2.signOut().then(function () {
              console.log("用户注销成功");
              async function func() {
                const result = await logout_Prom();
                if (result.status !== 200) {
                  alert(result.message);
                }
              }
              func();
            });
          }
          authInit();
        });

        return;

      default:
        const result = await logout_Prom();
        if (result.status !== 200) {
          alert(result.message);
        }
        return;
    }
  };

  return (
    <Link to='#' onClick={handleLogout}>
      LOG OUT
    </Link>
  );
}
