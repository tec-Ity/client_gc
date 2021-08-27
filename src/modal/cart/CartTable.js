import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  useSelector,
  //  useDispatch
} from "react-redux";
// import { fetchSkuPut } from "../../redux/cart/cartSlice";
import CartSkuCtrl from "./CartSkuCtrl";
import { get_DNS } from "../../api";
import { Grid } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  tableStyle: {
    width: "400px",
    borderCollapse: "collapse",
    color: "#1d1d38",
  },
  tableHeadRow: {
    fontSize: "10px",
    fontWeight: "400",
    color: "#C0E57B",
    borderTop: "1px solid #c0e57b",
    borderBottom: "1px solid #c0e57b",
  },
  tableRow: {
    fontSize: "15px",
    textAlign: "center",
    marginTop: "10px",
    "& :nth-child(1)": {
      "& :nth-child(1)": {
        textAlign: "left",
        paddingRight: theme.spacing(1),
        fontWeight: "700",
        wordWrap: "break-word",
      },
      "& :nth-child(2)": {
        textAlign: "left",
        fontSize: "12.5px",
      },
    },
  },
  imgStyle: {
    display: "block",
    objectFit: "scale-down",
    height: "80px",
    width: "80px",
    margin: "auto",
    background: "#c0e57b4c",
    borderRadius: "6.47619px 6.47619px 6.47619px 0px",
  },
}));

const TableRow = (props) => {
  const { oSku, prodName, showCtrl, img, showImg, customTableRowStyle } = props;
  const isExpand = useSelector((state) => state.cart.isExpand);

  const classes = useStyle();
  return (
    <Grid
      container
      item
      xs={12}
      className={customTableRowStyle ? customTableRowStyle : classes.tableRow}>
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
          {isExpand || showCtrl ? <CartSkuCtrl oSku={oSku} /> : oSku.quantity}
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
  );
};

export default function CartTable(props) {
  const {
    OrderProds,
    count = 1000,
    showImg = false,
    showCtrl = false,
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
      const img = op.Prod.img_urls?.length > 0 && op.Prod.img_urls[0];
      console.log(op);
      console.log("img", img);
      for (let j = 0; j < op.OrderSkus.length; j++) {
        const oSku = op.OrderSkus[j];
        if (rows.length < count) {
          rows.push(
            <TableRow
              key={oSku._id}
              oSku={oSku}
              img={img}
              prodName={op.nome}
              showImg={showImg}
              showCtrl={showCtrl}
              customTableRowStyle={customTableRowStyle}
            />
          );
        } else return rows;
      }
    }
    return rows;
  }, [OrderProds, count, showCtrl, showImg, customTableRowStyle]);

  React.useEffect(() => {
    const tb = showTableBody();
    setTableBody(tb);
  }, [showTableBody]);

  return (
    <>
      {OrderProds && (
        <Grid
          container
          className={customTableStyle ? customTableStyle : classes.tableStyle}>
          {showCusHeader === true ? (
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
          )}
          {tableBody}
        </Grid>
      )}
    </>
  );
}
