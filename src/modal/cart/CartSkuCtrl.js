import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
// import button from "@material-ui/core/Button";
import { ReactComponent as Minus } from "../../component/icon/minus.svg";
import { ReactComponent as Add } from "../../component/icon/add.svg";
import { ReactComponent as Delete } from "../../component/icon/delete.svg";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "74px",
    height: "19.5px",
    border: "0.78px solid #1D1D38",
    // boxSizing: "border-box",
    borderRadius: "14.733px",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  ctrlButton: {
    width: "14.6px",
    height: "14.6px",
    display: "flex",
    justifyContent: "center",
    // alignItem: "center",
    "&:hover": {
      cursor: "pointer",
    },
  },

  ctrlInput: {
    border: "none",
    height: "14px",
    width: "20px",
    background: "transparent",
    fontSize: "16px",
    fontFamily: "Montserrat",
    "&:focused": {
      border: "none",
      borderColor: "white",
    },
  },

  iconStyle: {
    height: "11px",
    width: "11px",
    margin: "auto",
  },
}));

export default function CartSkuCtrl(props) {
  const { oSku, handleFunc } = props;
  const classes = useStyle();
  const [qtyTemp, setQtyTemp] = React.useState(oSku?.quantity);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.children[0].blur();
  };

  React.useEffect(() => {
    oSku && setQtyTemp(oSku.quantity);
  }, [oSku]);

  return (
    <div className={classes.root}>
      <div
        className={classes.ctrlButton}
        onClick={() => {
          handleFunc(oSku?.Sku, null, qtyTemp - 1);
          setQtyTemp((prev) => prev + 1);
        }}>
        {qtyTemp === 1 ? (
          <Delete className={classes.iconStyle} />
        ) : (
          <Minus className={classes.iconStyle} />
        )}
      </div>
      <form className={classes.fromStyle} onSubmit={handleSubmit}>
        <input
          className={classes.ctrlInput}
          style={{ textAlign: "center" }}
          value={qtyTemp || ""}
          onChange={(e) => {
            setQtyTemp(e.target.value);
          }}
          onBlur={() => {
            let num = parseInt(qtyTemp);
            if (isNaN(num) || num < 1) {
              num = 1;
              setQtyTemp(num);
            }
            handleFunc(oSku?.Sku, null, num);
          }}
        />
      </form>
      <div
        className={classes.ctrlButton}
        onClick={() => {
          handleFunc(oSku?.Sku, null, qtyTemp + 1);
          setQtyTemp((prev) => prev + 1);
        }}>
        <Add className={classes.iconStyle} />
      </div>
    </div>
  );
}
