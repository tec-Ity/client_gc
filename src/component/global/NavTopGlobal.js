import React from "react";
import { delete_Prom } from "../../api";

export default function NavTopGlobal() {
  const handleLogout = async () => {
    const tpl = localStorage.getItem("thirdPartyLogin");
    switch (tpl) {
      case "facebook":
        window.FB.getLoginStatus(async function (response) {
          console.log(response);
          window.FB.logout(function (response) {
            console.log(response);
            async function func() {
              const result = await delete_Prom("/logout");
              if (result.status === 200) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("crClient");
                localStorage.removeItem("thirdPartyLogin");

                window.location.reload();
              } else {
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
        window.gapi.load("auth2", function () {
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
                const result = await delete_Prom("/logout");
                if (result.status === 200) {
                  localStorage.removeItem("accessToken");
                  localStorage.removeItem("refreshToken");
                  localStorage.removeItem("crClient");
                  localStorage.removeItem("google");
                  localStorage.removeItem("thirdPartyLogin");

                  window.location.reload();
                } else {
                  alert(result.message);
                }
                // setRefresh(r=>r+1)
              }
              func();
            });
          }
          authInit();
        });

        return;

      default:
        const result = await delete_Prom("/logout");
        if (result.status === 200) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("crClient");
          localStorage.removeItem("thirdPartyLogin");

          window.location.reload();
        } else {
          alert(result.message);
        }
        return;
    }
  };

  return (
    <div style={{border:'1px solid'}}>
      {localStorage.getItem("accessToken") ?<><h1>登录成功</h1>
      <button>购物车</button>
      <button>订单</button>
      <button>个人中心</button></>:<>请登录</>}
      
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}
