import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import CartSkuCtrl from "./CartSkuCtrl";
import { get_DNS } from "../../api";
import { Grid } from "@material-ui/core";
import { cartSkuPut, cartSkuDelete } from "../../redux/cart/cartSlice";

const useStyle = makeStyles((theme) => ({
  tableStyle: {
    width: "400px",
    // minHeight:'135px',
    borderCollapse: "collapse",
    color: "#1d1d38",
    // alignContent:'flex-start'
  },
  tableHeadRow: {
    fontSize: "10px",
    fontWeight: "400",
    color: "#C0E57B",
    borderTop: "1px solid #c0e57b",
    borderBottom: "1px solid #c0e57b",
    lineHeight: "2em",
    marginBottom: "10px",
  },
  tableRow: {
    fontSize: "15px",
    fontWeight: "400",
    textAlign: "center",
    marginTop: "10px",
    "& >:nth-child(1)": {
      "& >:nth-child(1)": {
        textAlign: "left",
        paddingRight: theme.spacing(1),
        fontWeight: "700",
        wordWrap: "break-word",
      },
      "& >:nth-child(2)": {
        textAlign: "left",
        fontSize: "12.5px",
      },
    },
    "& >:nth-child(4)": {
      fontWeight: "700",
    },
  },
  imgStyle: {
    display: "block",
    objectFit: "scale-down",
    height: "80px",
    width: "80px",
    margin: "auto",
    // background: "#c0e57b4c",
    borderRadius: "6.47619px 6.47619px 6.47619px 0px",
  },
  orderRow: {
    fontWeight: "400",
    "& >:nth-child(1)": {
      "& >:nth-child(1)": {
        fontWeight: "700",
      },
    },
    "& >:nth-child(2)": {
      display: "flex",
      justifyContent: "center",
    },
    "& >:nth-child(3)": {
      display: "flex",
      justifyContent: "flex-end",
    },
  },
}));

const TableRow = (props) => {
  const {
    oSku,
    prodName,
    showCtrl,
    img,
    orderCard,
    showImg,
    customTableRowStyle,
    isExpand,
    prod,
  } = props;
  // const isExpand = useSelector((state) => state.cart.isExpand);
  const dispatch = useDispatch();

  const onSkuChange = (oSkuId = null, sku, qty) => {
    if (oSkuId) {
      if (qty > 0) dispatch(cartSkuPut({ oSkuId, qty, prodId: prod.Prod }));
      else dispatch(cartSkuDelete({ oSkuId, prodId: prod.Prod }));
    }
  };
  // console.log(get_DNS() + img);
  const classes = useStyle();
  return (
    <>
      {orderCard ? (
        <Grid container item xs={12} className={classes.orderRow}>
          <Grid item xs={4}>
            <div title={prodName} style={{ overflow: "hidden" }}>
              {prodName}
            </div>
            <div>{oSku.attrs}&nbsp;</div>
          </Grid>
          <Grid item xs={4}>
            <div>
              x &nbsp;
              {oSku.quantity < 10 ? "0" + oSku.quantity : oSku.quantity}
            </div>
            <div>&nbsp;</div>
          </Grid>
          <Grid item xs={4}>
            <div>€{oSku.price_tot?.toFixed(2)}</div>
            <div>&nbsp;</div>
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          item
          xs={12}
          className={
            customTableRowStyle ? customTableRowStyle : classes.tableRow
          }>
          {showImg && (
            <Grid item xs={2}>
              <img
                className={classes.imgStyle}
                src={get_DNS() + img}
                alt={prodName}
              />
            </Grid>
          )}

          <Grid item xs={4}>
            <div title={prodName} style={{ overflow: "hidden" }}>
              {prodName}
            </div>
            <div>{oSku.attrs}&nbsp;</div>
          </Grid>

          <Grid item xs={2}>
            <div>
              {isExpand || showCtrl ? (
                <CartSkuCtrl oSku={oSku} handleFunc={onSkuChange} />
              ) : (
                oSku.quantity
              )}
            </div>
            <div>&nbsp;</div>
          </Grid>

          <Grid item xs={showImg ? 2 : 3}>
            <div>€{oSku.price?.toFixed(2)}</div>
            <div>&nbsp;</div>
          </Grid>
          <Grid item xs={showImg ? 2 : 3}>
            <div>€{oSku.price_tot?.toFixed(2)}</div>
            <div>&nbsp;</div>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default function CartTable(props) {
  const {
    OrderProds,
    count = 1000,
    showImg = false,
    showCtrl = false,
    isExpand = null,
    isCart,
    showHeader = true,
    orderCard = false,
    showCusHeader = false,
    customTableStyle = null,
    customTableRowStyle = null,
    customTableHeaderStyle = null,
  } = props;
  const classes = useStyle();
  const [tableBody, setTableBody] = React.useState();

  const showTableBody = React.useCallback(() => {
    const rows = [];
    for (let i = 0; i < OrderProds.length; i++) {
      const op = OrderProds[i];
      // console.log('op',op)
      const img = isCart ? op.img_url : op.Prod?.img_urls[0];
      // console.log(op);
      // console.log("img", img);
      for (let j = 0; j < op.OrderSkus?.length; j++) {
        const oSku = op.OrderSkus[j];

        if (rows.length < count) {
          rows.push(
            <TableRow
              key={oSku.Sku}
              oSku={oSku}
              img={img}
              orderCard={orderCard}
              isExpand={isExpand}
              prodName={op.nome}
              showImg={showImg}
              showCtrl={showCtrl}
              customTableRowStyle={customTableRowStyle}
              prod={op}
            />
          );
        } else return rows;
      }
    }
    return rows;
  }, [
    OrderProds,
    isCart,
    count,
    orderCard,
    isExpand,
    showImg,
    showCtrl,
    customTableRowStyle,
  ]);

  React.useEffect(() => {
    if (OrderProds) {
      const tb = showTableBody();
      setTableBody(tb);
    }
  }, [OrderProds, showTableBody]);

  return (
    <>
      {OrderProds && (
        <Grid
          container
          className={customTableStyle ? customTableStyle : classes.tableStyle}>
          {orderCard === false &&
            showHeader === true &&
            (showCusHeader === true ? (
              //order page with img
              <Grid container item xs={12} className={customTableHeaderStyle}>
                <Grid item xs={2}></Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={2}>
                  Quantità
                </Grid>
                <Grid item xs={2}>
                  Prezzo Unità
                </Grid>
                <Grid item xs={2}>
                  Prezzo Totale
                </Grid>
              </Grid>
            ) : (
              //cart modal without img
              <Grid container item xs={12} className={classes.tableHeadRow}>
                <Grid item xs={4}>
                  Prodotto
                </Grid>
                <Grid item xs={2}>
                  Quantità
                </Grid>
                <Grid item xs={3}>
                  Prezzo Unità
                </Grid>
                <Grid item xs={3}>
                  Prezzo Totale
                </Grid>
              </Grid>
            ))}
          {tableBody}
        </Grid>
      )}
    </>
  );
}
