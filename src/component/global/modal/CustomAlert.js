import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CustomModal from "./CustomModal";
import { ReactComponent as AlertLogo } from "../../icon/alertIcon.svg";

const useStyle = makeStyles({
  alertStyle: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  alertLogoStyle: {
    width: "46px",
    height: "46px",
    paddingBottom: "15px",
  },
  alertTitleStyle: {
    textAlign: "center",
    width: "163px",
    fontWeight: 700,
    fontSize: "20px",
    paddingBottom: "30px",
  },
  alertMessageStyle: {
    textAlign: "center",
    width: "316px",
    paddingBottom: "15px",
  },
  alertButtonStyle: {
    color: "#c0e57b",
    textDecoration: "underline",
    fontSize: "18px",
    cursor: "pointer",
  },
});

export default function CustomAlert({
  show,
  handleClose,
  alertTitle,
  alertMessage,
  alertButton,
  handleFunc,
}) {
  const classes = useStyle();
  return (
    <CustomModal small show={Boolean(show)} handleClose={handleClose}>
      <div className={classes.alertStyle}>
        <div className={classes.alertLogoStyle}>
          <AlertLogo />
        </div>
        <div className={classes.alertTitleStyle}>{alertTitle}</div>
        <div className={classes.alertMessageStyle}>{alertMessage}</div>
        <div className={classes.alertButtonStyle} onClick={handleFunc}>
          {alertButton}
        </div>
      </div>
    </CustomModal>
  );
}
