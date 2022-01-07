import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import {
  fetchChangeStatus,
  fetchOrderById,
} from "../../redux/order/orderSlice";
import DetailCard from "./component/DetailCard";
import { ReactComponent as ToPay } from "../../component/icon/orderStatueUnpaid.svg";
import { ReactComponent as InProgress } from "../../component/icon/orderStatueInProcess.svg";
import { ReactComponent as Canceled } from "../../component/icon/orderStatueCanceled.svg";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import CustomAlert from "../../component/global/modal/CustomAlert";
import { useTranslation } from "react-i18next";

export default function OrderDetailPage() {
  const { t } = useTranslation();
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

  //   //console.log(curOrder);

  return (
    <>
      {curOrderStatus === "succeed" && curOrder && (
        <DetailCard
          isOrder
          order={curOrder}
          orderLogo={
            curOrder.status === 100 ? (
              <ToPayLogo orderTime={curOrder.at_upd} _id={_id} />
            ) : [200, 400, 700].includes(curOrder.status) ? (
              <InProgressLogo orderStatus={curOrder.status} />
            ) : curOrder.status === 10 ? (
              <CancelLogo />
            ) : (
              ""
            )
          }
          fetchStatus={curOrderStatus}
          handleFunc={curOrder.status === 100 && handleFunc}
          header={{
            backLink: t("global.general.goBack"),
            nextLink: curOrder.status === 100 && t("global.button.checkout"),
          }}
        />
      )}
    </>
  );
}

const useStyle = makeStyles({
  logoBox: {
    // border: "1px solid",
    // height: "100px",
    width: "100px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  logoText: {
    fontWeight: 700,
    fontSize: "12px",
  },
  inProgressStatus: {
    // dispaly: "flex",
    // border: "1px solid",
    paddingTop: "5px",
    width: "100%",
    textAlign: "center",
    fontSize: "12px",
    fontWeight: 700,
    color: "#0000004d",
  },
});

////////////////////////// in progress
const InProgressLogo = ({ orderStatus }) => {
  const { t } = useTranslation();
  const classes = useStyle();
  return (
    <div className={classes.logoBox} style={{ width: "100%" }}>
      <div className={classes.logoBox}>
        <InProgress />
        <div className={classes.logoText}>{t("order.status.inProgress")}</div>
      </div>
      <div className={classes.inProgressStatus}>
        <span style={{ color: orderStatus === 200 && "#000" }}>
          {t("order.status.receiving")}&nbsp;——&nbsp;
        </span>
        <span style={{ color: orderStatus === 400 && "#000" }}>
          {t("order.status.preparing")}&nbsp;——&nbsp;
        </span>
        <span style={{ color: orderStatus === 700 && "#000" }}>
          {t("order.status.delivering")}
        </span>
      </div>
    </div>
  );
};

//////////////////////////////// to pay
// const validTime = 2 * 60 * 1000;
const ToPayLogo = ({ orderTime, _id }) => {
  const { t } = useTranslation();
  const interval = 1000;
  const validTime = 2 * 60 * 60 * 1000;
  const classes = useStyle();
  const myTimer = React.useRef(null);
  const [duration, setDuration] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();
  //init timer by checking remaining time
  useEffect(() => {
    const endTime = moment(orderTime).add(validTime, "milliseconds");
    const diff = endTime.diff(moment());
    //console.log(diff);
    if (diff <= 0) {
      dispatch(fetchChangeStatus({ _id, action: "CANCEL" }));
      setShowAlert(true);
    }
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
            if (newDuration <= 0) {
              dispatch(fetchChangeStatus({ _id, action: "CANCEL" }));
              setShowAlert(true);
              clearInterval(myTimer.current);
              return moment.duration(0);
            }
            return moment.duration(newDuration - interval);
          }
        });
      }, [interval]);
    }
    return () => {
      clearInterval(myTimer.current);
    };
  }, [_id, dispatch, orderTime, validTime]);

  return (
    <>
      <div className={classes.logoBox}>
        <ToPay />
        <div className={classes.logoText}>{t("order.status.toPay")}</div>
        <div style={{ color: "#e47f10", fontSize: "20px" }}>
          {duration &&
            duration?.hours() +
              ":" +
              (duration?.minutes() < 10
                ? "0" + duration?.minutes()
                : duration?.minutes()) +
              ":" +
              (duration?.seconds() < 10
                ? "0" + duration?.seconds()
                : duration?.seconds())}
          {/* {duration?.format("HH:mm:ss") // not a function} */}
        </div>
      </div>
      <CustomAlert
        show={showAlert}
        alertTitle={t("order.alert.title")}
        alertMessage={t("order.alert.message")}
        alertButton="OK"
        handleFunc={() => window.location.reload()}
      />
    </>
  );
};

const CancelLogo = () => {
  const { t } = useTranslation();
  const classes = useStyle();
  return (
    <div className={classes.logoBox}>
      <Canceled />
      <div className={classes.logoText}>{t("order.status.canceled")}</div>
    </div>
  );
};
