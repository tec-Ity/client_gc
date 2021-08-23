import React from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SectionHeader from "./component/SectionHeader";
import CartTable from "../../modal/cart/CartTable";
import { fetchCartById } from "../../redux/cart/cartSlice";

const useStyle = makeStyles((theme) => ({
  root: {
    border: "1px solid",
    fontFamily: "Montserrat",
  },
  headerStyle: {
    height: "73px",
    marginBottom: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backLink: {},
  confirmButton: {
    height: "31px",
    width: "150px",
    background: "#1D1D38",
    borderRadius: "15.58px 15.58px 15.58px 0px",
    fontFamily: "Montserrat",
    color: "#fff",
    fontSize: "15 px",
    fontWeight: "700",
    opacity: "0.8",
    "&:hover": {
      opacity: "1",
      background: "#1D1D38",
    },
    "&:focus": {
      background: "#e47f10",
    },
  },
  detailCardStyle: {
      marginBottom:theme.spacing(5),
    width: "100%",
    minHeight: "500px",
    maxWidth: "850px",
    boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.1)",
    borderRadius: "20px 20px 20px 0px",
  },
  gridStyle: {
    border: "1px solid",
    height: "100%",
    alignContent: "flex-start",
  },
  gridItemStyle: {
    border: "1px solid",
    // '& nth-of-type(1)':{
    //     height:'100px'
    // }
  },
  tableStyle: {
    width: "100%",
  },
  tableHeaderStyle: {
    color: "#c0e57b",
    fontWeight: "400",
    fontSize: "12px",
    marginBottom: "10px",
  },
  tableRowStyle: {
    marginBottom: "20px",
    //nome
    "& :nth-child(2)": {
      //nome
      "& :nth-child(1)": {
        fontSize: "20px",
        fontWeight: "700",
      },
      //desp (attrs)
      "& :nth-child(2)": {
        fontSize: "15px",
      },
    },
    //ctrl
    "& :nth-child(3)": {
      "& input": {
        fontWeight: "700",
      },
    },
    //total price
    "& :nth-child(5)": {
      fontWeight: "700", 
    },
  },


  ///extra move later

  priceTotHr:{
      width:''
  }
}));

export default function CartDetail() {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const classes = useStyle();
  const curCart = useSelector((state) => state.cart.curCart);
  const curCartStatus = useSelector((state) => state.cart.curCartStatus);

  React.useEffect(() => {
    if (!curCart || Object.keys(curCart).length === 0) {
      curCartStatus === "idle" && dispatch(fetchCartById(_id));
    }
  }, [_id, curCart, curCartStatus, dispatch]);

  return (
    <Container className={classes.root}>
      {_id}
      <div className={classes.headerStyle}>
        <div>DIETRO</div>
        <Button className={classes.confirmButton}>CONFERMA</Button>
      </div>
      <Container className={classes.detailCardStyle}>
        <Grid container className={classes.gridStyle}>
          <Grid
            item
            xs={12}
            className={classes.gridItemStyle}
            style={{ height: "100px" }}>
            <DeliveryDetail />
          </Grid>
          <Grid item xs={12} className={classes.gridItemStyle}>
            {console.log("curCart", curCart)}
            {curCartStatus === "succeed" && Object.keys(curCart).length > 0 && (
              <>
                <SectionHeader title='DETTAGLIO SPESA' />
                <Container>
                  <CartTable
                    OrderProds={curCart.OrderProds}
                    showImg
                    showCtrl
                    showCusHeader={true}
                    customTableStyle={classes.tableStyle}
                    customTableRowStyle={classes.tableRowStyle}
                    customTableHeaderStyle={classes.tableHeaderStyle}
                  />
                </Container>
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
}

function DeliveryDetail(props) {
//   const classes = useStyle();
  return (
    <>
      <SectionHeader title='DETTAGLIO CONSEGNA' />
    </>
  );
}

// function TotPriceDetail(props){
//     return(<>
//             <CustomHr />
//         </>
//     )
// }
