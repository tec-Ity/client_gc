import React, { useState } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
// import { fetchProofOrder } from "../../redux/cart/cartSlice";
import DetailCard from "./component/DetailCard";
import ProofModal from "./component/ProofModal";
import { fetchOrderPost } from "../../redux/order/orderSlice";
import { cartDelete, selectCurCart } from "../../redux/cart/cartSlice";
import CustomAlert from "../../component/global/modal/CustomAlert";
import { useTranslation } from "react-i18next";

export default function CartDetailPage() {
  const { t } = useTranslation();
  const { _id } = useParams();
  const dispatch = useDispatch();
  const [showProof, setShowProof] = React.useState();
  const [disableBtn, setDisableBtn] = React.useState(false);
  const curCart = useSelector(selectCurCart(_id));
  const proofObjs = useSelector((state) => state.cart.proofObjs);
  const proofStatus = useSelector((state) => state.cart.proofStatus);
  const orderPostStatus = useSelector((state) => state.order.orderPostStatus);
  const curOrder = useSelector((state) => state.order.curOrder);
  const [showAlert, setShowAlert] = useState(false);
  const hist = useHistory();

  React.useEffect(() => {
    if (orderPostStatus === "loading" || orderPostStatus === "error") {
      setDisableBtn(true);
    } else if (orderPostStatus === "succeed" && disableBtn === true) {
      dispatch(cartDelete(_id));
      //   //console.log(_id);
      hist.push("/order/" + curOrder?._id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curOrder?._id, hist, orderPostStatus, _id, dispatch]);

  const handleClose = () => {
    setShowProof(false);
  };

  const handleConfirmOrder = (setLoadingFunc) => {
    //console.log(curCart);
    // window.scrollTo(0,document.body.scrollHeight);

    if (!(curCart?.clientInfo && curCart.clientInfo.personalInfo)) {
      setLoadingFunc(false);
      setShowAlert("请选择收货地址，收货人，联系电话");
    } else {
      dispatch(fetchOrderPost({ cartObj: curCart }));
    }
  };

  //   //console.log(curCart)
  return (
    <>
      {/* {curCartStatus === "succeed" && ( */}
      <DetailCard
        order={curCart}
        // fetchStatus={curCartStatus}
        handleFunc={handleConfirmOrder}
        // _id={_id}
        disableBtn={disableBtn}
        header={{
          backLink: t("global.general.goBack"),
          nextLink: t("global.button.confirm"),
        }}
        isCart
      />

      {proofStatus === "succeed" && (
        <ProofModal
          show={showProof}
          handleClose={handleClose}
          proofObjs={proofObjs}
        />
      )}
      <CustomAlert
        show={showAlert}
        handleClose={() => setShowAlert(false)}
        alertTitle={t("cart.alert.title")}
        alertMessage={t("cart.alert.message")}
      />
    </>
  );
}
