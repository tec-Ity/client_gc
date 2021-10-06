import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as Add } from "../../component/icon/add.svg";
import { ReactComponent as Del } from "../../component/icon/del.svg";

const useStyles = makeStyles({
  root: {
    border: "2.5px solid",
    borderColor: "#91E8B3",
    borderRadius: "100px",
    width: "41px",
    height: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": { cursor: "pointer", backgroundColor: "#91e8b31a" },
  },
  icon: {
    height: "16px",
    width: "16px",
    "& path": { stroke: "#91E8B3" },
  },
});
export default function AddButton({ handleFunc, del = false }) {
  const classes = useStyles();
  return (
    <div className={classes.root} onClick={handleFunc}>
      {del === false ? (
        <Add className={classes.icon} />
      ) : (
        <Del className={classes.icon} />
      )}
    </div>
  );
}
