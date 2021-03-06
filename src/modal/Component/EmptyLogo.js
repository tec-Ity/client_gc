import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as EmptyUser } from "../../component/icon/emptyUser.svg";
import { ReactComponent as EmptyOrder } from "../../component/icon/emptyOrder.svg";
import { ReactComponent as EmptyCart } from "../../component/icon/emptyCarrello.svg";
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
    fontWeight: "400",
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
          <EmptyCart />
        ) : type === "order" ? (
          <EmptyOrder />
        ) : (
          ""
        )}
        <div className={classes.emptyLabel}>{label}</div>
      </div>
      <div className={classes.emptyText}>{text}</div>
    </>
  );
}
