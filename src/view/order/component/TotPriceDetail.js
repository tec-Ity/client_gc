import { Container, Grid } from "@material-ui/core";
import React from "react";
import CustomHr from "../../../component/global/modal/component/CustomHr";
import { makeStyles } from "@material-ui/core/styles";
import { Fragment } from "react";
import CustomBgText from "../../../component/global/background/CustomBgText";
import { useTranslation } from "react-i18next";

const useStyle = makeStyles((theme) => ({
  root: {
    fontFamily: "Montserrat",
    marginBottom: "30px",
  },
  customHr: {
    width: "100%",
    marginLeft: "0",
    height: "1px",
  },
  itemStyle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  //delivery
  deliveryTxt: {
    fontSize: "15px",
    color: "#c0e57b",
    fontWeight: "700",
  },
  deliveryPrice: {
    fontSize: "15px",
  },

  //payment
  paymentTxt: {
    fontSize: "15px",
    color: "#c0e57b",
    fontWeight: "700",
  },
  paymentType: {
    textAlign: "right",
    fontSize: "12px",
    fontWeight: "700",
  },
  paymentDetail: {
    fontSize: "12px",
  },

  //totale
  totale: {
    position: "relative",
    width: "100px",
    height: "30px",
    marginBottom: "15px",
  },
  totaleTxt: {
    fontSize: "24px",
  },
  totaleBg: {
    width: "100px",
    height: "12px",
  },
  totalePrice: {
    fontWeight: "700",
    fontSize: "20px",
    marginBottom: "10px",
  },
}));

export default function TotPriceDetail(props) {
  const { paymentMethod, priceShip, priceTotal } = props;
  const classes = useStyle();
  return (
    <Container disableGutters className={classes.root}>
      <DeliveryCost priceShip={priceShip} />
      {paymentMethod && <PaymentMethod paymentMethod={paymentMethod} />}
      <TotalCost priceTotal={priceTotal + priceShip} />
    </Container>
  );
}

const DeliveryCost = ({ priceShip }) => {
  const { t } = useTranslation();
  const classes = useStyle();
  return (
    <>
      <Grid item xs={12}>
        <CustomHr position={classes.customHr} />
      </Grid>
      <Grid item xs={12} className={classes.itemStyle}>
        <div className={classes.deliveryTxt}>
          {t("global.payment.priceShipping")}
        </div>
        <div className={classes.deliveryPrice}>
          {"€" + priceShip?.toFixed(2)}
        </div>
      </Grid>
    </>
  );
};

const PaymentMethod = ({ paymentMethod }) => {
  const { t } = useTranslation();
  const classes = useStyle();
  return (
    <>
      <Grid item xs={12}>
        <CustomHr position={classes.customHr} />
      </Grid>
      <Grid item xs={12} className={classes.itemStyle}>
        <div className={classes.paymentTxt}>METODO DI PAGAMENTO</div>
        <div>
          <div className={classes.paymentType}>Pagare online</div>
          <div className={classes.paymentDetail}>
            L'importo è stato addebitato sulla Paypal che termina con 0000
          </div>
        </div>
      </Grid>
    </>
  );
};

const TotalCost = ({ priceTotal }) => {
  const { t } = useTranslation();
  const classes = useStyle();
  return (
    <>
      <Grid item xs={12}>
        <CustomHr position={classes.customHr} />
      </Grid>
      <Grid item xs={12} className={classes.itemStyle}>
        <div className={classes.totale}>
          <CustomBgText
            label={t("global.payment.priceTot")}
            style={{ bg: classes.totaleBg, txt: classes.totaleTxt }}
          />
        </div>
        <div className={classes.totalePrice}>{"€" + priceTotal.toFixed(2)}</div>
      </Grid>
    </>
  );
};
