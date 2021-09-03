import React from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartById, fetchProofOrder } from "../../redux/cart/cartSlice";
import DetailCard from "./component/DetailCard";
import ProofModal from "./component/ProofModal";
import { fetchChangeStatus } from "../../redux/order/orderSlice";

export default function CartDetailPage() {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const [showProof, setShowProof] = React.useState();
  const curCart = useSelector((state) => state.cart.curCart);
  const proofObjs = useSelector((state) => state.cart.proofObjs);
  const proofStatus = useSelector((state) => state.cart.proofStatus);
  const curCartStatus = useSelector((state) => state.cart.curCartStatus);

  /**proof call twice----------- */
  React.useEffect(() => {
    if (proofStatus === "idle") {
      dispatch(fetchProofOrder(_id));
    } else if (proofStatus === "succeed") {
      if (proofObjs.length > 0) {
        setShowProof(true);
      }
      dispatch(fetchCartById(_id));
    }
  }, [_id, dispatch, proofObjs.length, proofStatus]);

  const handleClose = () => {
    setShowProof(false);
  };

  // console.log(_id);

  const handleConfirmOrder = () => {
    // console.log("confirm!!");
    // window.scrollTo(0,document.body.scrollHeight);
    dispatch(fetchChangeStatus({ _id, action: "CONFIRM" }));
  };

  return (
    <>
      {curCartStatus === "succeed" && (
        <DetailCard
          order={curCart}
          fetchStatus={curCartStatus}
          handleFunc={handleConfirmOrder}
          // _id={_id}
          header={{ backLink: "DIETRO", nextLink: "CONFERMA" }}
          isCart
        />
      )}

      {proofStatus === "succeed" && (
        // proofObjs.length > 0 &&
        <ProofModal
          show={showProof}
          handleClose={handleClose}
          proofObjs={proofObjs}
        />
      )}
    </>
  );
}
