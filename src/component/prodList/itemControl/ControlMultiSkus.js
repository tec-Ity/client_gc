import React from "react";
import CustomModal from "../../global/modal/CustomModal";
import CustomHr from "../../global/modal/component/CustomHr";
import CustomButton from "../../global/modal/component/CustomButton";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import ControlSimple from "./ControlSimple";
export default function ControlMultiSkus(props) {
  const { skus, curProdInCart, show, handleClose, onSkuChange } = props;
  // console.log(curProdInCart);
  const classes = useStyle();
  return (
    <CustomModal show={show} handleClose={handleClose} small>
      <Grid container className={classes.root} alignContent="flex-start">
        <Grid item xs={12} className={classes.gridItem}>
          <div className={classes.title}>Scegli la taglia</div>
        </Grid>
        <Grid item xs={12} style={{ height: "20px" }}>
          <CustomHr position={classes.cusTomHr} />
        </Grid>
        {/* table */}
        <Grid
          container
          item
          xs={12}
          className={clsx(classes.attrTable)}
          alignContent="flex-start"
        >
          {skus?.map((sku, index) => {
            return (
              index > 0 && (
                // row
                <React.Fragment key={sku._id}>
                  <Grid
                    container
                    item
                    xs={6}
                    className={clsx(classes.attrList)}
                  >
                    {sku.attrs &&
                      sku.attrs.map((attr) => {
                        return (
                          // attrs
                          <Grid
                            container
                            key={attr.nome}
                            item
                            xs={5}
                            style={{ paddingLeft: "10px" }}
                            alignItems="flex-end"
                          >
                            <span key={attr.nome}>
                              <span>{attr.nome}</span>:
                              <span>{attr.option}</span>
                            </span>
                          </Grid>
                        );
                      })}
                  </Grid>
                  {/* price */}
                  <Grid container item xs={3} alignItems="flex-end">
                    <span>
                      ???
                      {String(sku.price_regular?.toFixed(2))?.replace(".", ",")}
                    </span>
                  </Grid>
                  {/* ctrl */}
                  <Grid item xs={3}>
                    <ControlSimple
                      sku={sku}
                      onSkuChange={onSkuChange}
                      curSkuInCart={curProdInCart?.OrderSkus?.find(
                        (s) => s.Sku === sku._id
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomHr position={classes.hrBetweenRow} />
                  </Grid>
                </React.Fragment>
              )
            );
          })}
        </Grid>
        <Grid item xs={12} className={classes.gridItem}>
          <CustomButton
            label="OK"
            handleFunc={handleClose}
            alterStyle={classes.btnStyle}
          />
        </Grid>
      </Grid>
    </CustomModal>
  );
}
const useStyle = makeStyles({
  root: { height: "100%" },
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
    marginbottom: "5px",
  },
  hrBetweenRow: {
    width: "90%",
    height: "1px",
    marginTop: "5px",
    marginBottom: "5px",
  },
  attrTable: {
    padding: "0 20px 0 20px",
    height: "160px",
    overflowY: "scroll",
    // overflow: "auto",
    fontSize: "15px",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    "&>div": { maxHeight: "40px" },
  },
  attrList: {
    minHeight: "0",
  },
  btnStyle: {
    width: "85%",
  },
});
