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
    "&::disabled": {
      backgroundColor: "#000",
    },
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
        <span
          style={{
            position: "relative",
            left: "3.5px",
            bottom: "2px",
            fontFamily: "Montserrat",
            fontWeight: "700",
          }}>
          {oSku?.quantity === 1 ? (
            <svg
              width='9'
              height='11'
              style={{ marginTop: "1px" }}
              viewBox='0 -1 24 27'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <g id='delete'>
                <circle
                  id='Ellipse 121'
                  cx='12'
                  cy='2.38477'
                  r='2'
                  fill='#1D1D38'
                />
                <path
                  id='Rectangle 461'
                  d='M2 6.38477L3.32539 23.6149C3.44562 25.1778 4.74895 26.3848 6.31656 26.3848H17.6834C19.2511 26.3848 20.5544 25.1778 20.6746 23.6149L22 6.38477'
                  stroke='#1D1D38'
                  strokeWidth='2'
                />
                <line
                  id='Line 93'
                  y1='3.38477'
                  x2='24'
                  y2='3.38477'
                  stroke='#1D1D38'
                  strokeWidth='2'
                />
                <line
                  id='Line 94'
                  y1='-1'
                  x2='15.2019'
                  y2='-1'
                  transform='matrix(0.0293854 0.999568 -0.999141 0.0414453 8 7.18555)'
                  stroke='#1D1D38'
                  strokeWidth='2'
                />
                <line
                  id='Line 95'
                  y1='-1'
                  x2='15.2019'
                  y2='-1'
                  transform='matrix(-0.0293854 0.999568 -0.999141 -0.0414453 14.8477 7.18555)'
                  stroke='#1D1D38'
                  strokeWidth='2'
                />
              </g>
            </svg>
          ) : (
            "-"
          )}
        </span>
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
        <span
          style={{
            position: "relative",
            right: "5px",
            bottom: "1.5px",
            fontFamily: "Montserrat",
            fontWeight: "700",
          }}>
          +
        </span>
      </button>
    </div>
  );
}
