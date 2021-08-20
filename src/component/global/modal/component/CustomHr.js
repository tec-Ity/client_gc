import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyle = makeStyles((theme) => ({
  hrStyle: {
    width: "400px",
    height: "1px",
    margin: "15px",
    background:
      " linear-gradient(270deg, #91E8B3 0%, #C0E57B 100%, #C0E57B 100%)",
  },
}));

export default function CustomHr({position}) {
  const classes = useStyle();
  return <div className={clsx(classes.hrStyle, position)}></div>;
}
