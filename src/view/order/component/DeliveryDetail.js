import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SectionHeader from "./SectionHeader";
import { Container } from "@material-ui/core";
import AddrModifyModal from "../address/AddrModifyModal";
import { useTranslation } from "react-i18next";

const useStyle = makeStyles((theme) => ({
  root: {
    margin: "auto",
    maxWidth: "710px",
  },
  addrBox: {
    fontSize: "15px",
    "& :nth-child(1)": {
      fontWeight: "700",
    },
  },
  recipient: {
    // borderLeft: "1px solid #c0e57b",
    paddingLeft: "15px",
    fontSize: "15px",
    "& :nth-child(1)": {
      fontWeight: "700",
    },
  },

  btnStyle: {
    margin: "auto",
    width: "90px",
    height: "27px",
    fontsize: "13px",
    background: "#c0e57b",
    fontWeight: 700,
    color: "#fff",
    borderRadius: "13.5px 13.5px 13.5px 0",
    fontFamily: "Montserrat",
    "&:hover": {
      background: "#c0e57b",
      backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.05) 0 0)",
    },
  },
}));

export default function DeliveryDetail({
  isCart, //cart._id same as Shop._id
  clientInfo,
  shipInfo,
}) {
  const { t } = useTranslation();
  const classes = useStyle();
  const [showAddrModal, setShowAddrModal] = useState(false);
  //   //console.log(clientInfo);

  return (
    <>
      <SectionHeader title={t("cart.page.shipInfo")} />
      <Container>
        <Grid container className={classes.root}>
          <Grid item xs={6} className={classes.addrBox}>
            <div>{clientInfo?.addr || shipInfo?.address}</div>
            <div>{clientInfo?.zip || shipInfo?.postcode}</div>
          </Grid>
          <Grid item xs={3} className={classes.recipient}>
            <div>
              {clientInfo?.personalInfo?.name ||
                (isCart && t("cart.alert.recipient"))}
            </div>
            <div>
              {clientInfo?.personalInfo?.phone ||
                shipInfo?.phone ||
                (isCart && t("cart.alert.number"))}
            </div>
          </Grid>
          {isCart && (
            <Grid container item xs={3}>
              <Button
                className={classes.btnStyle}
                onClick={() => setShowAddrModal(true)}
              >
                {t("global.button.modify")}
              </Button>
            </Grid>
          )}
        </Grid>
      </Container>
      <AddrModifyModal
        show={showAddrModal}
        handleClose={() => setShowAddrModal(false)}
        inCart={isCart}
      />
    </>
  );
}
