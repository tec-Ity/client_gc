import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  root: {
    height: "38px",
    width: "100%",
    marginTop: "15px",
    background: "#1D1D38",
    borderRadius: "19.5312px 19.5312px 19.5312px 0px",
    fontFamily: "Montserrat",
    color: "#fff",
    fontSize: "18px",
    fontWeight: "600",
    opacity: "0.8",
    "&:hover": {
      opacity: "1",
      background: "#1D1D38",
    },
    "&:focus": {
      background: "#e47f10",
    },
  },
}));

export default function MoreButton(props) {
  const classes = useStyle();
  return (
    <Button
      className={classes.root}
      onClick={() => {
        document.getElementById(props.farId + "categBar").click();
      }}>
      VEDI DI PIÙ
    </Button>
  );
}
