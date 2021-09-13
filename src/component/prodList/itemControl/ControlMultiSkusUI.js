import React from "react";
import CustomHr from "../../global/modal/component/CustomHr";
import CustomButton from "../../global/modal/component/CustomButton";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import CartSkuCtrl from "../../../modal/cart/CartSkuCtrl";

const useStyle = makeStyles({
  root: {},
  gridItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "30px",
  },
  title: {
    marginTop: "20px",
    marginBottom: "5px",
    fontSize: "20px",
    fontWeight: "700",
  },
  cusTomHr: {
    width: "90%",
  },
  hrBetweenRow: {
    width: "90%",
    height: "0.5px",
    marginTop: "5px",
    marginBottom: "5px",
  },
  attrTable: {
    padding: "0 20px 0 20px",
    height: "120px",
    overflowY: "scroll",
    // overflow: "auto",
    fontSize: "15px",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  attrList: {
    minHeight: "0",
  },
  btnStyle: {
    width: "85%",
  },
});

export default function ControlMultiSkusUI(props) {
  const { skuList, buttonNew, handleClose, onSkuChange } =
    props;
  const classes = useStyle();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.gridItem}>
        <div className={classes.title}>Scegli la taglia</div>
      </Grid>
      <Grid item xs={12} className={classes.gridItem}>
        <CustomHr position={classes.cusTomHr} />
      </Grid>
      {/* table */}
      <Grid container item xs={12} className={clsx(classes.attrTable)}>
        {skuList?.map((sku) => {
          return (
            // row
            <React.Fragment key={sku._id}>
              <Grid container item xs={6} className={clsx(classes.attrList)}>
                {sku.attrs &&
                  sku.attrs.map((attr) => {
                    return (
                      // attrs
                      <Grid
                        container
                        item
                        xs={4}
                        style={{ paddingLeft: "10px" }}>
                        <span key={attr.nome}>
                          <span>{attr.nome}</span>:<span>{attr.option}</span>
                        </span>
                      </Grid>
                    );
                  })}
              </Grid>
              {/* price */}
              <Grid item xs={3} className={classes.gridItem}>
                €{sku.price_regular?.toFixed(2)}
              </Grid>
              {/* ctrl */}
              {sku.orderSkuId && sku.quantity > 0 ? (
                <Grid item xs={3} className={classes.gridItem}>
                  <CartSkuCtrl handleFunc={onSkuChange} />
                </Grid>
              ) : (
                <Grid item xs={3} className={classes.gridItem}>
                  {buttonNew(sku)}
                </Grid>
              )}
              <Grid item xs={12}>
                <CustomHr position={classes.hrBetweenRow} />
              </Grid>
            </React.Fragment>
          );
        })}
      </Grid>
      <Grid item xs={12} className={classes.gridItem}>
        <CustomButton
          label='OK'
          handleFun={handleClose}
          alterStyle={classes.btnStyle}
        />
      </Grid>
    </Grid>
  );
}
