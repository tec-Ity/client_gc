import React, { useEffect } from "react";
import { fetchOrders, setOrderBtnSwitch } from "../../redux/order/orderSlice";
import { useSelector, useDispatch } from "react-redux";
import { Button, Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import OrderCard from "./component/OrderCard";
import BackLink from "../../component/global/link/BackLink";
import { ReactComponent as ToPayIconGray } from "../../component/icon/orderStatueUnpaidGrey.svg";
import { ReactComponent as InProgressIconGray } from "../../component/icon/orderStatueInProcessGrey.svg";
import { ReactComponent as CanceledIconGray } from "../../component/icon/orderStatueCanceledGrey.svg";
import { ReactComponent as CompletedIconGray } from "../../component/icon/orderStatueCompleteGrey.svg";
import { ReactComponent as ToPayIcon } from "../../component/icon/orderStatueUnpaid.svg";
import { ReactComponent as InProgressIcon } from "../../component/icon/orderStatueInProcess.svg";
import { ReactComponent as CanceledIcon } from "../../component/icon/orderStatueCanceled.svg";
import { ReactComponent as CompletedIcon } from "../../component/icon/orderStatueComplete.svg";

const useStyle = makeStyles({
  root: { color: "#1d1d38" },
  headerStyle: {
    height: "73px",
    // border: "1px solid",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    maxWidth: "900px",
    margin: "auto",
    "& :nth-child(1)": {
      // display: "flex",
      justifyContent: "flex-start",
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
    height: "80px",
    width: "90px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "& > :first-child": {
      "& > :first-child": {
        width: "80px",
        height: "54px",
        transition: "all 0.2s",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "&:hover": {
          height: "70px",
          width: "90px",
        },
      },
    },
    "& > :nth-child(2)": {
      fontSize: "10px",
      fontFamily: "Montserrat",
      fontWeight: "700",
    },
  },

  //card wrapper
  wrapper: {
    // border: "1px solid",
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
            orderBtnSwitch.inProgress ? 200 : "",
            orderBtnSwitch.inProgress ? 400 : "",
            orderBtnSwitch.inProgress ? 700 : "",
            orderBtnSwitch.completed ? 800 : "",
            orderBtnSwitch.canceled ? 10 : "",
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

  const statusSelBtnList = [
    {
      field: "toPay",
      label: "DA PAGARE",
      icon: <ToPayIconGray />,
      iconSelect: <ToPayIcon />,
    },
    {
      field: "inProgress",
      label: "IN PROCESSO",
      icon: <InProgressIconGray />,
      iconSelect: <InProgressIcon />,
    },
    {
      field: "canceled",
      label: "CANCEL",
      icon: <CanceledIconGray />,
      iconSelect: <CanceledIcon />,
    },
    {
      field: "completed",
      label: "COMPLETO",
      icon: <CompletedIconGray />,
      iconSelect: <CompletedIcon />,
    },
  ];

  return (
    <Container className={classes.root}>
      <div className={classes.headerStyle}>
        <BackLink label='CONTINUA LO SHOPPING' link='/home' />
      </div>
      {/* buttons */}
      <Container>
        <Grid container justifyContent='space-evenly'>
          {statusSelBtnList.map((item) => (
            <Grid item key={item.field}>
              <div
                className={classes.btnStyle}
                onClick={handleOrderStateChange(item.field)}>
                <div>
                  {orderBtnSwitch[item.field] ? item.iconSelect : item.icon}
                </div>
                <div>{item.label}</div>
              </div>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Grid container className={classes.wrapper}>
        {orders &&
          orders.map((order) => {
            return (
              <Grid
                container
                item
                xs={12}
                justifyContent='center'
                key={order._id}>
                <OrderCard order={order} />
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
}
