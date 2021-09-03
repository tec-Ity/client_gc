import React, { useEffect } from "react";
import { fetchOrders, setOrderBtnSwitch } from "../../redux/order/orderSlice";
import { useSelector, useDispatch } from "react-redux";
import { Button, Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
import clsx from "clsx";
import OrderCard from "./component/OrderCard";

const useStyle = makeStyles({
  root: { border: "1px solid", color: "#1d1d38" },
  headerStyle: {
    height: "73px",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    "& :nth-child(1)": {
      display: "flex",
      justifyContent: "center",
    },
  },
  backLink: {
    paddingTop: "1.5px",
  },
  backToShop: {
    display: "flex",
    justifyContent: "center",
    "&:visited": {
      color: "#1d1d38",
    },
    "&:hover": {
      color: "#e47f10",
    },
  },

  //button styles
  btnStyle: {
    borderRadius: "100px 100px 100px 0",
    backgroundColor: "#fff",
    fontSize: "15px",
    fontWeight: "700",
    border: "2px solid",
    width: "150px",
    // maxWidth: "150px",
    height: "37px",
    borderColor: "#1d1d38",
  },
  btnSelected: {
    backgroundColor: "#1d1d38",
    color: "#fff",
    "&:hover": {
      color: "#1d1d38",
    },
  },

  //card wrapper
  wrapper: {
    border: "1px solid",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    marginTop: "50px",
  },
});

export default function OrdersPage() {
  const dispatch = useDispatch();
  const classes = useStyle();
  const orders = useSelector((state) => state.order.orders);
  const orderBtnSwitch = useSelector((state) => state.order.orderBtnSwitch);

  useEffect(() => {
    dispatch(
      fetchOrders({
        queryURL:
          "&status=" +
          [
            orderBtnSwitch.toPay ? 100 : "",
            orderBtnSwitch.paid ? 200 : "",
            orderBtnSwitch.inProgress ? 400 : "",
            orderBtnSwitch.inProgress ? 700 : "",
            orderBtnSwitch.completed ? 800 : "",
            orderBtnSwitch.canceled ? 10 : "",
            orderBtnSwitch.canceled ? 60 : "",
            orderBtnSwitch.canceled ? 70 : "",
          ],
        isReload: true,
      })
    );
  }, [
    dispatch,
    orderBtnSwitch.canceled,
    orderBtnSwitch.completed,
    orderBtnSwitch.inProgress,
    orderBtnSwitch.paid,
    orderBtnSwitch.toPay,
  ]);

  const handleOrderStateChange = (type) => () => {
    dispatch(
      setOrderBtnSwitch({
        type,
        value: !orderBtnSwitch[type],
      })
    );
  };

  return (
    <Container className={classes.root}>
      <div className={classes.headerStyle}>
        <Link
          to={"/shop/" + String(orders && orders[0] && orders[0].Shop._id)}
          className={classes.backToShop}>
          <ArrowBackIcon />
          <span className={classes.backLink}>CONTINUA LO SHOPPING</span>
        </Link>
      </div>
      <Container>
        <Grid container justifyContent='space-evenly'>
          <Grid item>
            <Button
              className={clsx(
                classes.btnStyle,
                orderBtnSwitch.paid && classes.btnSelected
              )}
              onClick={handleOrderStateChange("paid")}>
              PAGATO
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={clsx(
                classes.btnStyle,
                orderBtnSwitch.toPay && classes.btnSelected
              )}
              onClick={handleOrderStateChange("toPay")}>
              DA PAGARE
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={clsx(
                classes.btnStyle,
                orderBtnSwitch.inProgress && classes.btnSelected
              )}
              onClick={handleOrderStateChange("inProgress")}>
              IN PROCESSO
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={clsx(
                classes.btnStyle,
                orderBtnSwitch.completed && classes.btnSelected
              )}
              onClick={handleOrderStateChange("completed")}>
              CONSEGNATO
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={clsx(
                classes.btnStyle,
                orderBtnSwitch.canceled && classes.btnSelected
              )}
              onClick={handleOrderStateChange("canceled")}>
              CANCELLATO
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Grid container className={classes.wrapper}>
        {orders &&
          orders.map((order) => {
            return (
              <Grid container item xs={12} justifyContent='center'>
                <OrderCard order={order} />
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
}
