import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SectionHeader from "./SectionHeader";
import { Container } from "@material-ui/core";

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
    color: "#fff",
    borderRadius: "13.5px 13.5px 13.5px 0",
    fontFamily: "Montserrat",
    "&:hover": {
      background: "#c0e57b",
      backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.05) 0 0)",
    },
  },
}));

export default function DeliveryDetail({ isCart }) {
  const classes = useStyle();
  return (
    <>
      <SectionHeader title='DETTAGLIO CONSEGNA' />
      <Container>
        <Grid container className={classes.root}>
          <Grid item xs={6} className={classes.addrBox}>
            <div>Via Gaetano di Castilia 10, MI</div>
            <div>20124</div>
          </Grid>
          <Grid item xs={3} className={classes.recipient}>
            <div>GREENCITY</div>
            <div>+39 057422219</div>
          </Grid>
          {isCart && (
            <Grid container item xs={3}>
              <Button className={classes.btnStyle}>MODIFICA</Button>
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
}
