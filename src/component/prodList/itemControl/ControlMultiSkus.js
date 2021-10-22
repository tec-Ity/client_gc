import React from "react";
import CustomModal from "../../global/modal/CustomModal";
// import ControlMultiSkusUI from "./ControlMultiSkusUI";
import CustomHr from "../../global/modal/component/CustomHr";
import CustomButton from "../../global/modal/component/CustomButton";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import ControlSimple from "./ControlSimple";
export default function ControlMultiSkus(props) {
  const { skus, curProdInCart, show, handleClose, onSkuChange } = props;
  // const [skuList, setSkuList] = useState();
  // useEffect(() => {
  //   const generateList = () => {
  //     if (show === true && skus.length > 0) {
  //       const tempSkuList = [];
  //       skus.forEach((sku) => {
  //         console.log("sku", sku);
  //         if (sku.attrs) {
  //           let curSkuQtyInCart = null;
  //           let curSkuInCartTemp = null;
  //           if (curProdInCart) {
  //             curSkuInCartTemp = curProdInCart.OrderSkus.find(
  //               (os) => os.Sku === sku._id
  //             );
  //             if (curSkuInCartTemp) {
  //               curSkuQtyInCart = curSkuInCartTemp.quantity;
  //             }
  //           }
  //           tempSkuList.push({
  //             id: sku._id,
  //             quantity: curSkuQtyInCart,
  //             attrs: sku.attrs,
  //             orderSkuId: curSkuInCartTemp?._id,
  //             price_regular: sku.price_regular,
  //             price_sale: sku.price_sale,
  //           });
  //         }
  //       });
  //       setSkuList(tempSkuList);
  //     }
  //   };
  //   generateList();
  // }, [skus, curProdInCart, show]);

  // const modifySkuCount = (skuId, qty) => {
  //   const newSkuList = skuList.map((sku) => {
  //     if (sku.id === skuId) {
  //       return {
  //         ...sku,
  //         quantity: qty,
  //       };
  //     }
  //     return sku;
  //   });

  //   setSkuList(newSkuList);
  // };

  // const buttonDec = (sku) => (
  //   <button
  //     disabled={skuPutStatus === "loading"}
  //     onClick={() => {
  //       onSkuChange(sku.orderSkuId, null, sku.quantity - 1);
  //       modifySkuCount(sku.id, sku.quantity - 1);
  //     }}>
  //     {sku.quantity === 1 ? "删除" : "-"}
  //   </button>
  // );

  // const buttonInc = (sku) => (
  //   <button
  //     disabled={skuPutStatus === "loading"}
  //     onClick={() => {
  //       onSkuChange(sku.orderSkuId, null, sku.quantity + 1);
  //       modifySkuCount(sku.id, sku.quantity + 1);
  //     }}>
  //     +
  //   </button>
  // );

  // const buttonNew = (sku) => (
  //   <button
  //     disabled={skuPostStatus === "loading"}
  //     onClick={() => {
  //       onSkuChange(null, sku.id, 1);
  //       modifySkuCount(sku.id, 1);
  //     }}>
  //     +
  //   </button>
  // );

  const classes = useStyle();
  return (
    <CustomModal show={show} handleClose={handleClose} small>
      {/* <ControlMultiSkusUI
        skuList={skuList}
        // buttonInc={buttonInc}
        // buttonDec={buttonDec}
        // buttonNew={buttonNew}
        handleClose={handleClose}
        onSkuChange={onSkuChange}
      /> */}

      <Grid container className={classes.root}>
        <Grid item xs={12} className={classes.gridItem}>
          <div className={classes.title}>Scegli la taglia</div>
        </Grid>
        <Grid item xs={12} className={classes.gridItem}>
          <CustomHr position={classes.cusTomHr} />
        </Grid>
        {/* table */}
        <Grid container item xs={12} className={clsx(classes.attrTable)}>
          {skus?.map((sku, index) => {
            return (
              index > 0 && (
                // row
                <React.Fragment key={sku._id}>
                  <Grid
                    container
                    item
                    xs={6}
                    className={clsx(classes.attrList)}>
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
                              <span>{attr.nome}</span>:
                              <span>{attr.option}</span>
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
                  <Grid item xs={3} className={classes.gridItem}>
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
            label='OK'
            handleFun={handleClose}
            alterStyle={classes.btnStyle}
          />
        </Grid>
      </Grid>
    </CustomModal>
  );
}
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
