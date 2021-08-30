import React from "react";
import CustomModal from "../../component/global/modal/CustomModal";
import CardWraper from "../../component/global/modal/component/CardWraper";

export default function SelfCenterModal() {

    const handleClose = () =>{

    }



  return (
    <CustomModal show={true} handleClose={handleClose} >
      <CardWraper>

      </CardWraper>
    </CustomModal>
  );
}
