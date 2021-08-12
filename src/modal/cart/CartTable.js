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
      textAlign: "center",
    },
    "& :nth-child(1)": {
      textAlign: "left",
      width: "35%",
    },
    "& :nth-child(2)": {
      width: "15%",
    },
    "& :nth-child(3)": {
      width: "25%",
    },
    "& :nth-child(4)": {
      width: "25%",
    },
  },
  tableRow: {
    width: "375px",
    height: "30px",
    "& td": {
      paddingTop: "10px",
      fontSize: "15px",
      "& div:nth-child(1)": {
        textAlign: "center",
      },
    },
    "& :nth-child(1)": {
      textAlign: "left",
      "& :nth-child(1)": {
        textAlign: "left",
        fontWeight: "700",
      },
      "& :nth-child(2)": {
        textAlign: "left",
        fontSize: "12.5px",
      },
    },
    "& :nth-child(2)": {},
    "& :nth-child(3)": {},
    "& :nth-child(4)": {
      fontWeight: "700",
    },
  },
}));

const TableRow = ({ oSku, prodName }) => {
  const classes = useStyle();
  return (
    <tr className={classes.tableRow}>
      <td>
        <div title={prodName} style={{ overflow: "hidden" }}>
          {prodName}
        </div>
        <div>{oSku.attrs}&nbsp;</div>
      </td>
      <td>
        <div>{oSku.quantity}</div>
        <div>&nbsp;</div>
      </td>
      <td>
        <div>€{oSku.price}</div>
        <div>&nbsp;</div>
      </td>
      <td>
        <div>€{oSku.price_tot}</div>
        <div>&nbsp;</div>
      </td>
    </tr>
  );
};

export default function CartTable({ OrderProds, count }) {
  const classes = useStyle();

  // const shortenName = (prodName) =>{

  // }

  const tableBody = () => {
    const rows = [];
    const tbody = <tbody>{rows}</tbody>;
    for (let i = 0; i < OrderProds.length; i++) {
      const op = OrderProds[i];
      for (let j = 0; j < op.OrderSkus.length; j++) {
        const oSku = op.OrderSkus[j];
        if (rows.length < count) {
          rows.push(<TableRow key={oSku._id} oSku={oSku} prodName={op.nome} />);
        } else return tbody;
      }
    }

    return tbody;
  };

  return (
    <div className={classes.root}>
      <table className={classes.tableStyle}>
        <thead className={classes.tableHead}>
          <tr className={classes.tableHeadRow}>
            <th scope='col'>Prodotto</th>
            <th scope='col'>Quantità</th>
            <th scope='col'>Prezzo Unità</th>
            <th scope='col'>Prezzo Totale</th>
          </tr>
        </thead>
        {tableBody()}
      </table>
    </div>
  );
}
