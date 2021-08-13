import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSkuPut } from "../../redux/cart/cartSlice";
import { makeStyles } from "@material-ui/core/styles";
// import button from "@material-ui/core/Button";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "70px",
    height: "18.75px",
    border: "0.78px solid #1D1D38",
    boxSizing: "border-box",
    borderRadius: "14.733px",
    display: "flex",
  },
  buttonLT: {
    width: "14.6px",
    height: "14.6px",
    margin: "auto",
    border: "none",
    // textAlign: "center",
    backgroundColor: "transparent",
  },
  buttonRT: {
    margin: "auto",
    width: "14.6px",
    height: "14.6px",
    border: "none",
    backgroundColor: "transparent",
  },
  ctrlInput: {
    border: "none",
    height: "14px",
    width: "20px",
    background: "transparent",
    margin: "auto",
    fontSize: "15px",
    fontFamily: "Montserrat",
    "&:focused": {
      border: "none",
      borderColor: "white",
    },
  },
}));

export default function CartSkuCtrl({ oSku }) {
  const dispatch = useDispatch();
  const skuPutStatus = useSelector((state) => state.cart.skuPutStatus);
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <button
        className={classes.buttonLT}
        disabled={skuPutStatus === "loading"}
        onClick={() =>
          dispatch(
            fetchSkuPut({ orderSkuId: oSku?._id, Qty: oSku?.quantity - 1 })
          )
        }>
        <div style={{ margin: "auto" }}>
          {oSku?.quantity === 1 ? "删除" : "-"}
        </div>
      </button>
      <input
        className={classes.ctrlInput}
        style={{ textAlign: "center" }}
        value={oSku?.quantity || "00"}
        onChange={(e) =>
          dispatch(fetchSkuPut({ orderSkuId: oSku?._id, Qty: e.target.value }))
        }
      />
      <button
        className={classes.buttonRT}
        disabled={skuPutStatus === "loading"}
        onClick={() =>
          dispatch(
            fetchSkuPut({ orderSkuId: oSku?._id, Qty: oSku?.quantity + 1 })
          )
        }>
        <div style={{ height: "10px", weight: "10px", border: "1px solid" }}>
          +
        </div>
      </button>
    </div>
  );
}
