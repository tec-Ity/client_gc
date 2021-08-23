import React from "react";
import CustomHr from "../../../component/global/modal/component/CustomHr";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontFamily: "Montserrat",
    fontWeight: "700",
    fontSize: "15px",
    color: "#C0E57B",
  },
  hrStyle: {
    width: "70%",
  },
}));

export default function SectionHeader(props) {
  const { title } = props;
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <div className={classes.title}>{title}</div>
      <CustomHr position={classes.hrStyle} />
    </div>
  );
}
