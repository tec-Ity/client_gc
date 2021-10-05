import { Button, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React from "react";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "34px",
    borderRadius: "100px 100px 100px 0",
    background: "#1d1d38",
    fontSize: "14px",
    fontFamily: "Montserrat",
    fontWeight: "700",
    color: "#fff",
    opacity: "1",
    "&:hover": {
      opacity: "0.8",
      background: "#1d1d38",
    },
    "&:focus": {
      background: "#e47f10",
    },
  },
}));

export default function CustomButton(props) {
  const classes = useStyle();
  const { label, handleFunc, alterStyle = null, disableBtn } = props;
  return (
    <Button
      onClick={handleFunc}
      disabled={disableBtn}
      className={clsx(classes.root, alterStyle)}>
      {label}
    </Button>
  );
}
