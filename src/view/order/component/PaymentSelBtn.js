import React, { useEffect, useState } from "react";
import { Button, Grid, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { fetch_Prom } from "../../../api";
// import { useHistory } from "react-router";
import stripeIcon from "../../../component/icon/Stripe.svg";
import CustomModal from "../../../component/global/modal/CustomModal";
import { my_Domain } from "../../../conf/_dns";

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
  modalContainer: {
    // border: "1px solid",
    height: "100%",
  },
  modalGrid: {
    height: "100%",
    "& > div": {
      padding: "15px 0",
    },
  },
  stripeBtn: {
    height: "40px",
    width: "100%",
    backgroundColor: "#6461FC",
    // color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: 700,
    borderRadius: "4px",
    cursor: "pointer",
    "&:hover": {},
  },
  stripeIcon: {
    height: "25px",
    width: "80px",
  },
}));

export default function PaymentSelBtn({ orderId }) {
  const classes = useStyle();
  const [showPayment, setShowPayment] = useState(false);
//   //console.log(my_Domain);
  useEffect(() => {
    (async function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      const result = await fetch_Prom("/get_payment_clientId");
      js = d.createElement(s);
      js.id = id;
      js.src = `https://www.paypal.com/sdk/js?client-id=${result?.data?.paypal_client_id}&currency=EUR&components=buttons,funding-eligibility`;
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "paypal-jssdk");
    // //console.log(window.paypal);
    // //console.log(window.paypal_sdk);
  }, []);
  const handlePayment = async () => {
    setShowPayment(true);
  };
  return (
    <>
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
      </Grid>
      <PaymentSelModal
        show={showPayment}
        handleClose={() => setShowPayment(false)}
        orderId={orderId}
      />
    </>
  );
}

const PaymentSelModal = ({ show, handleClose, orderId }) => {
  const classes = useStyle();
  const handleStripe = async () => {
    const paymentLinkRes = await fetch_Prom(
      "/create-checkout-session",
      "POST",
      {
        OrderId: orderId,
        success_url: `${my_Domain}/order/${orderId}`,
        cancel_url: `${my_Domain}/order/${orderId}`,
      }
    );
    // //console.log(paymentLinkRes);
    if (paymentLinkRes.status === 200)
      window.location.replace(paymentLinkRes?.data?.url);
  };

  return (
    <CustomModal show={show} handleClose={handleClose} small>
      <Container className={classes.modalContainer}>
        <Grid container alignContent='center' className={classes.modalGrid}>
          <Grid item xs={12}>
            <div className={classes.stripeBtn} onClick={handleStripe}>
              <img src={stripeIcon} className={classes.stripeIcon} alt='' />
            </div>
          </Grid>
          <Grid item xs={12}>
            <PayPalBtn orderId={orderId} />
          </Grid>
        </Grid>
      </Container>
    </CustomModal>
  );
};

const PayPalBtn = ({ orderId }) => {
  useEffect(() => {
    // //console.log(window.paypal);
    window.paypal &&
      window.paypal
        .Buttons({
          style: { height: 40 },
          fundingSource: window.paypal.FUNDING.PAYPAL,
          createOrder: async function () {
            const res = await fetch_Prom("/create-order", "POST", {
              OrderId: orderId,
            });
            // //console.log(res);
            if (res.status === 200) return res.data.id;
            else alert(res.message);
          },
          onApprove: async function (data, actions) {
            //console.log(data);
            const res = await fetch_Prom("/check-order", "POST", {
              paypal_orderId: data.orderID,
              OrderId: orderId,
            });

            // //console.log(res);
            if (res.status === 200) {
              window.location.reload();
            }
          },
        })
        .render("#paypal-button");
  }, [orderId]);

  return <div id='paypal-button'></div>;
};
