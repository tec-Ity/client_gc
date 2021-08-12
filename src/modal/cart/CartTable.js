import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "400px",
    // minHeight: "165px",
  },
  tableStyle: {
    width: "400px",
    borderCollapse: "collapse",
    color: "#1d1d38",
  },
  tableHeadRow: {
    fontSize: "10px",
    fontWeight: "700",
    color: "#C0E57B",
    "& th": {
      borderTop: "1px solid",
      borderBottom: "1px solid",
      borderColor: "#C0E57B",
    },
    "& :nth-child(1)": {
      textAlign: "left",
      width: "35%",
    },
    "& :nth-child(2)": {
      textAlign: "left",
      width: "25%",
    },
    "& :nth-child(3)": {
      textAlign: "left",
      width: "25%",
    },
    "& :nth-child(4)": {
      textAlign: "right",
      width: "15%",
    },
  },
  tableRow: {
    width: "375px",
    height: "30px",
    "& td": {
      paddingTop: "10px",
      fontSize: "15px",
    },
    "& :nth-child(1)": {
      "& :nth-child(1)": {
        fontWeight: "700",
      },
      "& :nth-child(2)": {
        fontSize: "12.5px",
      },
    },
    "& :nth-child(2)": {},
    "& :nth-child(3)": {},
    "& :nth-child(4)": {
      textAlign: "center",
      fontWeight: "700",
    },
  },
}));

export default function CartTable(props) {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <table className={classes.tableStyle}>
        <thead className={classes.tableHead}>
          <tr className={classes.tableHeadRow}>
            <th scope='col'>Prodotto</th>
            <th scope='col'>Prezzo Unità</th>
            <th scope='col'>Prezzo Totale</th>
            <th scope='col'>Quantità</th>
          </tr>
        </thead>
        <tbody>
          <tr className={classes.tableRow}>
            <td>
              <div>PROD. NOME</div>
              <div>Prod. descrizione</div>
            </td>
            <td>
              <div>$00,00</div>
              <div>&nbsp;</div>
            </td>
            <td>
              <div>$00,00</div>
              <div>&nbsp;</div>
            </td>
            <td>
              <div>00</div>
              <div>&nbsp;</div>
            </td>
          </tr>
          <tr className={classes.tableRow}>
            <td>
              <div>PROD. NOME</div>
              <div>Prod. descrizione</div>
            </td>
            <td>
              <div>$00,00</div>
              <div>&nbsp;</div>
            </td>
            <td>
              <div>$00,00</div>
              <div>&nbsp;</div>
            </td>
            <td>
              <div>00</div>
              <div>&nbsp;</div>
            </td>
          </tr>
          <tr className={classes.tableRow}>
            <td>
              <div>PROD. NOME</div>
              <div>Prod. descrizione</div>
            </td>
            <td>
              <div>$00,00</div>
              <div>&nbsp;</div>
            </td>
            <td>
              <div>$00,00</div>
              <div>&nbsp;</div>
            </td>
            <td>
              <div>00</div>
              <div>&nbsp;</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
