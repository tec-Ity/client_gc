import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as Add } from "../../component/icon/add.svg";

const useStyles = makeStyles({
  root: {
    border: "2.5px solid",
    borderColor: "#91E8B3",
    borderRadius: "100px",
    width: "52px",
    height: "25px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": { cursor: "pointer" },
  },
  icon: {
    height: "19px",
    width: "19px",
    "& path": { stroke: "#91E8B3" },
  },
});
export default function AddButton({ handleFunc }) {
  const classes = useStyles();
  return (
    <div className={classes.root} onClick={handleFunc}>
      <Add className={classes.icon} />
    </div>
  );
}
