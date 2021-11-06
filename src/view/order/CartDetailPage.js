import React, { useState } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
// import { fetchProofOrder } from "../../redux/cart/cartSlice";
import DetailCard from "./component/DetailCard";
import ProofModal from "./component/ProofModal";
import { fetchOrderPost } from "../../redux/order/orderSlice";
import { cartDelete, setCurCartById } from "../../redux/cart/cartSlice";
import CustomModal from "../../component/global/modal/CustomModal";
import { makeStyles } from "@material-ui/core/styles";

export default function CartDetailPage() {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const [showProof, setShowProof] = React.useState();
  const [disableBtn, setDisableBtn] = React.useState(false);
  const curCart = useSelector((state) => state.cart.curCart);
  const proofObjs = useSelector((state) => state.cart.proofObjs);
  const proofStatus = useSelector((state) => state.cart.proofStatus);
  const orderPostStatus = useSelector((state) => state.order.orderPostStatus);
  const curOrder = useSelector((state) => state.order.curOrder);
  const [showAlert, setShowAlert] = useState(false);
  const hist = useHistory();
  // const curCartStatus = useSelector((state) => state.cart.curCartStatus);

  /**proof call twice----------- */
  // React.useEffect(() => {
  //   if (proofStatus === "idle") {
  //     dispatch(fetchProofOrder(_id));
  //   } else if (proofStatus === "succeed") {
  //     if (proofObjs.length > 0) {
  //       setShowProof(true);
  //     }
  //     // dispatch(fetchCartById(_id));
  //   }
  // }, [_id, dispatch, proofObjs.length, proofStatus]);

  React.useEffect(() => {
    if (!curCart.OrderProds) {
      dispatch(setCurCartById(_id));
    }
  }, [_id, curCart.OrderProds, dispatch]);

  React.useEffect(() => {
    if (orderPostStatus === "loading" || orderPostStatus === "error") {
      setDisableBtn(true);
    } else if (orderPostStatus === "succeed" && disableBtn === true) {
      dispatch(cartDelete(_id));
      console.log(_id);
      hist.push("/order/" + curOrder?._id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curOrder?._id, hist, orderPostStatus, _id, dispatch]);

  const handleClose = () => {
    setShowProof(false);
  };
  const handleConfirmOrder = (setLoadingFunc) => {
    // console.log("confirm!!");
    // window.scrollTo(0,document.body.scrollHeight);
    // if(curCart.)
    if (!curCart?.addrInfo) {
      setLoadingFunc(false);
      setShowAlert("请选择收货地址，收货人，联系电话");
    } else {
      dispatch(fetchOrderPost({ cartObj: curCart }));
    }
  };

  console.log(curCart);

  return (
    <>
      {/* {curCartStatus === "succeed" && ( */}
      <DetailCard
        order={curCart}
        // fetchStatus={curCartStatus}
        handleFunc={handleConfirmOrder}
        // _id={_id}
        disableBtn={disableBtn}
        header={{ backLink: "DIETRO", nextLink: "CONFERMA" }}
        isCart
      />

      {proofStatus === "succeed" && (
        <ProofModal
          show={showProof}
          handleClose={handleClose}
          proofObjs={proofObjs}
        />
      )}
      <AlertModal show={showAlert} handleClose={() => setShowAlert(false)} />
    </>
  );
}

const useStyle = makeStyles({
  alertStyle: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  alertLogo: {
    width: "fit-content",
  },
  alertMessage: {
    width: "fit-content",
  },
});

const AlertModal = ({ show, handleClose }) => {
  const classes = useStyle();
  return (
    <CustomModal small show={Boolean(show)} handleClose={handleClose}>
      <div className={classes.alertStyle}>
        <div className={classes.alertLogo}>!</div>
        <div className={classes.alertMessage}>{show}</div>
      </div>
    </CustomModal>
  );
};
