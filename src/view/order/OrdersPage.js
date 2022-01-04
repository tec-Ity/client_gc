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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = useStyle();
  const orders = useSelector((state) => state.order.orders);
  const orderBtnSwitch = useSelector((state) => state.order.orderBtnSwitch);
  const ref = React.useRef(null);
  const [pageNum, setPageNum] = React.useState(1);
  const [atBottom, setAtBottom] = React.useState(false);

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
          ] +
          "&pagesize=3&page=" +
          pageNum,
        isReload: Boolean(pageNum === 1),
      })
    );
  }, [dispatch, orderBtnSwitch, pageNum]);

  const handleOrderStateChange = (type) => () => {
    setPageNum(1);
    dispatch(
      setOrderBtnSwitch({
        type,
        value: !orderBtnSwitch[type],
      })
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("order-container");
      //   console.log(element.getBoundingClientRect().bottom);
      //   console.log("----", window.innerHeight);
      //if bottom?
      if (element.getBoundingClientRect().bottom <= window.innerHeight) {
        if (atBottom === false) {
          setPageNum((prev) => prev + 1);
          setAtBottom(true);
        }
      } else {
        setAtBottom(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const statusSelBtnList = [
    {
      field: "toPay",
      label: t("order.status.toPay"),
      icon: <ToPayIconGray />,
      iconSelect: <ToPayIcon />,
    },
    {
      field: "inProgress",
      label: t("order.status.inProgress"),
      icon: <InProgressIconGray />,
      iconSelect: <InProgressIcon />,
    },
    {
      field: "canceled",
      label: t("order.status.canceled"),
      icon: <CanceledIconGray />,
      iconSelect: <CanceledIcon />,
    },
    {
      field: "completed",
      label: t("order.status.completed"),
      icon: <CompletedIconGray />,
      iconSelect: <CompletedIcon />,
    },
  ];

  return (
    <Container className={classes.root}>
      <div className={classes.headerStyle}>
        <BackLink label={t("components.nav.backShop")} link='/home' />
      </div>
      {/* buttons */}
      <Container>
        <Grid container justifyContent='space-evenly'>
          {statusSelBtnList.map((item) => (
            <Grid item key={item.field}>
              <div className={classes.btnStyle} onClick={handleOrderStateChange(item.field)}>
                <div>{orderBtnSwitch[item.field] ? item.iconSelect : item.icon}</div>
                <div>{item.label}</div>
              </div>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Grid container className={classes.wrapper} id='order-container'>
        {orders &&
          orders.map((order) => {
            return (
              <Grid container item xs={12} justifyContent='center' key={order._id}>
                <OrderCard order={order} />
              </Grid>
            );
          })}
        <button onClick={() => setPageNum((prev) => prev + 1)}>more</button>
      </Grid>
    </Container>
  );
}
