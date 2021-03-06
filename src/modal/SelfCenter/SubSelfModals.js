import React from "react";
import CustomModal from "../../component/global/modal/CustomModal";
import InputModify from "../../component/input/InputModify";
import SubAddrModal from "./SubAddrModal";
import AddButton from "../Component/AddButton";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CustomHr from "../../component/global/modal/component/CustomHr";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import SubPwdModal from "./SubPwdModal";
import SubAccountModal from "./SubAccountModal";
import CustomButton from "../../component/global/modal/component/CustomButton";
import { useTranslation } from "react-i18next";

const useStyle = makeStyles({
  root: {},
  ///sub modal style
  subModal: {
    width: "100%",
  },
  subHeader: {
    color: "#1d1d38",
    fontSize: "15px",
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-between",
  },
  subBackBtn: {
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "pointer",
    },
  },
  subHrStyle: {
    width: "100%",
    marginLeft: "0",
    marginRight: "0",
    marginbottom: "0",
  },
  confirmButton: {
    position: "absolute",
    bottom: "20px",
    width: "90%",
  },
});

export default function SubSelfModals(props) {
  const { t } = useTranslation();
  const {
    showSubModal,
    handleCloseSub,
    tempInfo,
    handleChange,
    handleSubmit,
    handleShowSub,
    inCart = false,
  } = props;
  const classes = useStyle();
  return (
    <>
      {showSubModal.name === true && (
        <RowModal
          show={showSubModal.name}
          handleClose={handleCloseSub}
          label={t("selfCenter.modify") + t("selfCenter.name")}
        >
          <InputModify
            value={tempInfo.nome || ""}
            iconType="done"
            placeholder={
              tempInfo.nome ? null : t("components.placeholders.nameInput")
            }
            handleChange={(value) => handleChange("nome", value)}
            handleFunc={handleSubmit("general")}
          />
        </RowModal>
      )}
      {/* --------account--------------- */}
      {showSubModal.account === true && (
        <RowModal
          show={showSubModal.account}
          handleClose={handleCloseSub}
          label={t("selfCenter.modify") + t("selfCenter.account")}
        >
          <SubAccountModal
            handleClose={handleCloseSub}
            accountInfo={{
              code: tempInfo.code,
              phone: tempInfo.phone,
              email: tempInfo.email,
            }}
          />
        </RowModal>
      )}

      {showSubModal.social === true && (
        <RowModal
          show={showSubModal.social}
          handleClose={handleCloseSub}
          label={t("selfCenter.modify") + t("selfCenter.social")}
        ></RowModal>
      )}

      {showSubModal.method === true && (
        <RowModal
          show={showSubModal.method}
          handleClose={handleCloseSub}
          label={t("selfCenter.modify") + t("selfCenter.paymentMethod")}
        ></RowModal>
      )}

      {/* -------- address modal ------------*/}
      {showSubModal.addr === true && (
        <RowModal
          show={showSubModal.addr}
          handleClose={
            showSubModal.addrAdd === true
              ? handleShowSub("addrAdd", false)
              : handleCloseSub
          }
          label={t("selfCenter.modify") + t("selfCenter.address")}
          large={true}
          extraIcon={
            showSubModal.addrAdd === false && (
              <AddButton handleFunc={handleShowSub("addrAdd")} />
            )
          }
        >
          <SubAddrModal
            showAddrAdd={showSubModal.addrAdd}
            addrs={tempInfo.addrs}
            openUpdate={handleShowSub("addrAdd")}
            closeUpdate={handleShowSub("addrAdd", false)}
            inCart={inCart}
          />
          {inCart && !showSubModal.addrAdd && (
            <CustomButton
              label="OK"
              alterStyle={classes.confirmButton}
              handleFunc={handleCloseSub}
            />
          )}
        </RowModal>
      )}
      {showSubModal.pwd === true && (
        <RowModal
          show={showSubModal.pwd}
          handleClose={handleCloseSub}
          large
          label={t("selfCenter.modify") + t("selfCenter.password")}
        >
          <SubPwdModal handleClose={handleCloseSub} />
        </RowModal>
      )}
    </>
  );
}

const RowModal = (props) => {
  const {
    show,
    handleClose,
    label,
    extraIcon,
    children,
    large = false,
  } = props;
  const classes = useStyle();
  return (
    <CustomModal
      timeout={0}
      show={show}
      handleClose={handleClose}
      small={large === false}
    >
      <Container style={{ height: "100%", position: "relative" }}>
        <Grid container justifyContent="center" className={classes.subModal}>
          <Grid
            container
            item
            xs={12}
            alignItems="center"
            className={classes.subHeader}
          >
            <div className={classes.subBackBtn} onClick={handleClose}>
              <ArrowBackIosIcon />
              <div>{label}</div>
            </div>
            <div>{extraIcon}</div>
          </Grid>

          <Grid container item xs={12}>
            <CustomHr position={classes.subHrStyle} />
          </Grid>
          <Grid container item xs={12} justifyContent="center">
            {children}
          </Grid>
        </Grid>
      </Container>
    </CustomModal>
  );
};
