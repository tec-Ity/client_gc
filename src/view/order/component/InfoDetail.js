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
    width:'90px',
    height:'27px',
    fontsize:'13px',
    background:'#c0e57b',
    color:'#fff',
    borderRadius:'13.5px 13.5px 13.5px 0'
  },
}));

export default function InfoDetail(props) {
    const {title, info1, info2} = props;

  const classes = useStyle();
  return (
    <>
      <SectionHeader title={title} />
      <Container>
        <Grid container className={classes.root}>
          <Grid item xs={6} className={classes.addrBox}>
            <div>{info1.line1}</div>
            <div>{info1.line2}</div>
          </Grid>
          <Grid item xs={3} className={classes.recipient}>
            <div>{info2.line1}</div>
            <div>{info2.line2}</div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
