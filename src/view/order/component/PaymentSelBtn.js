import { Button, Grid } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  msg: {
    fontSize: "12px",
    fontWeight: "700",
    marginBottom: "10px",
  },
  btnBox:{
    display:'flex',
    justifyContent:'space-between'
  },
  btn: {
    width: "45%",
    height: "43px",
    background: "#e47f10",
    color: "#fff",
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

export default function PaymentSelBtn() {
  const classes = useStyle();
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <div className={classes.msg}>SCEGLI IL METODO DI PAGAMENTO*</div>
      </Grid>

      <Grid item xs={12} className={classes.btnBox}>
        <Button className={classes.btn}>PAGA ONLINE</Button>
        <Button className={classes.btn}>PAGA ALLA CONSEGNA</Button>
      </Grid>
    </Grid>
  );
}
