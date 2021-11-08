import React, { useState, useEffect } from "react";
import CustomModal from "../../../component/global/modal/CustomModal";
import { Grid, Container } from "@material-ui/core";
import CustomHr from "../../../component/global/modal/component/CustomHr";
import SubAddrModal from "../../../modal/SelfCenter/SubAddrModal";
import { useSelector, useDispatch } from "react-redux";
import { fetchCurClientInfo } from "../../../redux/curClient/curClientSlice";
import AddButton from "../../../modal/Component/AddButton";
import SubSelfModals from "../../../modal/SelfCenter/SubSelfModals";

export default function AddrModifyModal({ show, handleClose }) {
  const dispatch = useDispatch();
  const [showAddNew, setShowAddNew] = React.useState(false);
  const curClientInfo = useSelector((state) => state.curClient.curClientInfo);
  // console.log(curClientInfo);
  const curClientInfoStatus = useSelector(
    (state) => state.curClient.curClientInfoStatus
  );

  //fetch cur Client info
  useEffect(() => {
    // console.log("e", curClientInfoStatus);
    if (curClientInfoStatus === "idle") {
      dispatch(fetchCurClientInfo());
    } else if (curClientInfoStatus === "error") {
      setTimeout(() => {
        dispatch(fetchCurClientInfo());
      }, 2000);
    }
  }, [curClientInfoStatus, dispatch]);
  console.log(curClientInfo);
  return (
    <SubSelfModals
      tempInfo={{ addrs: curClientInfo.addrs }}
      showSubModal={{ addr: show, addrAdd: showAddNew }}
      handleShowSub={(section, show = true) =>
        () => {
          section === "addrAdd" && setShowAddNew(show);
        }}
      handleCloseSub={handleClose}
      inCart
    />
  );
}
