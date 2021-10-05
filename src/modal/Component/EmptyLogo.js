import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as EmptyUser } from "../../component/icon/emptyUser.svg";
const useStyles = makeStyles({
  emptyBox: {
    // border: "1px solid",
    position: "relative",
    marginBottom: "50px",
  },
  emptyLabel: {
    // border: "1px solid",
    position: "absolute",
    top: "80%",
    left: "25%",
    width: "50%",
    textAlign: "center",
    fontWeight: "700",
    fontSize: "20px",
  },
  emptyText: {
    width: "100%",
    textAlign: "center",
  },
});
export default function EmptyLogo(props) {
  const { type, label, text } = props;
  const classes = useStyles();
  return (
    <>
      <div className={classes.emptyBox}>
        {type === "user" ? (
          <EmptyUser />
        ) : type === "cart" ? (
          "cart"
        ) : type === "order" ? (
          "order"
        ) : (
          ""
        )}
        <div className={classes.emptyLabel}>{label}</div>
      </div>
      <div className={classes.emptyText}>{text}</div>
    </>
  );
}
