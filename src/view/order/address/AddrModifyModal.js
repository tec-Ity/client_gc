import React, { useState, useEffect } from "react";
import CustomModal from "../../../component/global/modal/CustomModal";
import { Grid, Container } from "@material-ui/core";
import CustomHr from "../../../component/global/modal/component/CustomHr";
import SubAddrModal from "../../../modal/SelfCenter/SubAddrModal";
import { useSelector, useDispatch } from "react-redux";
import { fetchCurClientInfo } from "../../../redux/curClient/curClientSlice";
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

  return (
    <CustomModal show={show} handleClose={handleClose}>
      <Container>
        <Grid container>
          <Grid container item xs={12} justifyContent='space-between'>
            <div>select new addr</div>
            <div onClick={() => setShowAddNew(true)}>+</div>
          </Grid>
          <Grid item xs={12}>
            <CustomHr />
          </Grid>
          <Grid container item xs={12} justifyContent='center'>
                
          </Grid>
        </Grid>
      </Container>
    </CustomModal>
  );
}
