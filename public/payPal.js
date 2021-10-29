import { fetch_Prom } from "../src/api";

(async function (d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  const result = await fetch_Prom("/paypal_client_id");
  js = d.createElement(s);
  js.id = id;
  //   js["data-namespace"] = "paypal_sdk";
  js.src = `https://www.paypal.com/sdk/js?client-id=${result?.data?.paypal_client_id}`;
  //   js.src = `https://www.paypal.com/sdk/js?client-id=AWjIyTqZ3lgAosb9SVB7pyRuheaXXxzywMTI0ZLeQUN_KhXonQX9Ey21qy8Ilvg5Shlmw5_lkPXid5wJ`;
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "paypal-jssdk");

// window.paypal.Buttons({
//     createOrder: function () {
//       return fetch("/create-order", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           items: [
//             {
//               id: 1,
//               quantity: 2,
//             },
//             { id: 2, quantity: 3 },
//           ],
//         }),
//       })
//         .then((res) => {
//           if (res.ok) return res.json();
//           return res.json().then((json) => Promise.reject(json));
//         })
//         .then(({ id }) => {
//           return id;
//         })
//         .catch((e) => {
//           console.error(e.error);
//         });
//     },
//     onApprove: function (data, actions) {
//       return actions.order.capture();
//     },
//   })
//   .render("#paypal");
