import React, { useEffect, useState } from "react";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { fetch_Prom, get_DNS } from "../../../api";
import { useHistory } from "react-router";
import ReactDOM from "react-dom";

const useStyle = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    fontFamily: "Montserrat",
  },
  msg: {
    fontSize: "12px",
    fontWeight: "700",
    marginBottom: "10px",
  },
  btnBox: {
    display: "flex",
    justifyContent: "space-between",
  },
  btn: {
    width: "45%",
    height: "43px",
    background: "#e47f10",
    color: "#fff",
    fontFamily: "Montserrat",
    fontWeight: "700",
    borderRadius: "21.45px 21.45px 21.45px 0",
    opacity: "0.8",
    "&:hover": {
      opacity: "1",
      background: "#e47f10",
    },
    "&:focus": {
      background: "#1d1d38",
    },
  },
}));

export default function PaymentSelBtn({ orderId }) {
  const classes = useStyle();
  const hist = useHistory();
  const [showPaypal, setShowPaypal] = useState(false);
  useEffect(() => {
    (async function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      const result = await fetch_Prom("/get_payment_clientId");
      js = d.createElement(s);
      js.id = id;
      js.src = `https://www.paypal.com/sdk/js?client-id=${result?.data?.paypal_client_id}&currency=EUR`;
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "paypal-jssdk");
    console.log(window.paypal);
    // console.log(window.paypal_sdk);
  }, []);
  const handlePayment = async () => {
    // const paymentLinkRes = await fetch_Prom(
    //   "/create-checkout-session",
    //   "POST",
    //   {
    //     OrderId: orderId,
    //   }
    // );
    // console.log(paymentLinkRes);
    // if (paymentLinkRes.status === 200)
    //   window.location.replace(paymentLinkRes?.data?.url);
    setShowPaypal(true);
  };
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <div className={classes.msg}>SCEGLI IL METODO DI PAGAMENTO*</div>
      </Grid>

      <Grid item xs={12} className={classes.btnBox}>
        <Button className={classes.btn} onClick={handlePayment}>
          PAGA ONLINE
        </Button>
        <Button className={classes.btn}>PAGA ALLA CONSEGNA</Button>
      </Grid>
      <Grid>{showPaypal === true && <PayPalBtn orderId={orderId} />}</Grid>
    </Grid>
  );
}

const PayPalBtn = ({ orderId }) => {
  useEffect(() => {
    console.log(window.paypal);
    window.paypal &&
      window.paypal
        .Buttons({
          createOrder: async function () {
            const res = await fetch_Prom("/create-order", "POST", {
              OrderId: orderId,
            });
            console.log(res);
            if (res.status === 200) return res.data.id;
          },
          onApprove: async function (data, actions) {
            console.log(data);
            const res = await fetch_Prom("/check-order", "POST", {
              paypalOrderId: data.orderId,
            });

            console.log(res);
            if (res.status === 200) {
              return actions.order.capture();
            }
          },
        })
        .render("#paypal-button");
  }, [orderId]);

  return <div id='paypal-button'></div>;
};
