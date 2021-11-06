import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { fetchOrderById } from "../../redux/order/orderSlice";
import DetailCard from "./component/DetailCard";
import { ReactComponent as ToPay } from "../../component/icon/orderStatueUnpaid.svg";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

export default function OrderDetailPage() {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const curOrder = useSelector((state) => state.order.curOrder);
  const curOrderStatus = useSelector((state) => state.order.curOrderStatus);

  //initial fetch
  useEffect(() => {
    dispatch(fetchOrderById(_id));
  }, [_id, dispatch]);
  //error fetch
  useEffect(() => {
    if (curOrderStatus === "error") {
      setTimeout(() => {
        dispatch(fetchOrderById(_id));
      }, 2000);
    }
  }, [_id, curOrderStatus, dispatch]);

  const handleFunc = () => {
    window.document.getElementsByTagName("html")[0].style.scrollBehavior =
      "smooth";
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 100);
  };
  console.log(curOrder);
  return (
    <>
      {curOrderStatus === "succeed" && curOrder && (
        <DetailCard
          isOrder
          order={curOrder}
          orderLogo={
            curOrder.status === 100 ? (
              <ToPayLogo orderTime={curOrder.at_upd} />
            ) : (
              ""
            )
          }
          fetchStatus={curOrderStatus}
          handleFunc={handleFunc}
          header={{ backLink: "DIETRO", nextLink: "CHECK OUT" }}
        />
      )}
    </>
  );
}

const useStyle = makeStyles({
  logoBox: {
    // border: "1px solid",
    height: "100px",
    width: "100px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  logoText: {
    fontWeight: 700,
    fontSize: "12px",
  },
});

const interval = 1000;
const validTime = 2 * 60 * 60 * 1000;
const ToPayLogo = ({ orderTime }) => {
  const classes = useStyle();
  const myTimer = React.useRef(null);
  //   const [timer, setTimer] = useState();
  const [duration, setDuration] = useState(null);

  //init timer by checking remaining time
  useEffect(() => {
    const endTime = moment(orderTime).add(validTime, "milliseconds");
    const diff = endTime.diff(moment());
    console.log(diff);
    if (orderTime && !myTimer.current && diff > 0) {
      //init timer
      myTimer.current = setInterval(() => {
        //setInterval cannot read updated states
        //so use prev in set state to get old states
        setDuration((prev) => {
          if (!prev) {
            //init duration
            return moment.duration(diff);
          } else {
            //update duration
            const newDuration = moment.duration(prev);
            return moment.duration(newDuration - interval);
          }
        });
      }, [interval]);
    }
    return () => {
      clearInterval(myTimer.current);
    };
  }, [orderTime]);

  return (
    <div className={classes.logoBox}>
      <ToPay />
      <div className={classes.logoText}>DA PAGARE</div>
      <div style={{ color: "#e47f10", fontSize: "20px" }}>
        {duration &&
          duration?.hours() +
            ":" +
            duration?.minutes() +
            ":" +
            (duration?.seconds() < 10
              ? "0" + duration?.seconds()
              : duration?.seconds())}
        {/* {duration?.format("HH:mm:ss") // not a function} */}
      </div>
    </div>
  );
};
