import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid } from "@material-ui/core";
import CustomModal from "../../component/global/modal/CustomModal";
import {
  setShowLogin,
  setShowRegister,
} from "../../redux/curClient/curClientSlice";
import RegisterForm from "./RegisterForm";
import { makeStyles } from "@material-ui/core/styles";
import CustomHr from "../../component/global/modal/component/CustomHr";
import { useTranslation } from "react-i18next";

const useStyle = makeStyles((theme) => ({
  registerForm: {
    width: "500px",
  },
  loginStyle: {
    marginBottom: "25px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  loginLink: {
    color: "#1d1d38",
    textDecoration: "underline",
    "&:hover": { color: "#C0E57B", fontWeight: "700" },
  },
}));

export default function RegisterModalUI(props) {
  const { t } = useTranslation();
  const classes = useStyle();
  const dispatch = useDispatch();
  const showRegister = useSelector((state) => state.curClient.showRegister);

  const handleClose = () => {
    dispatch(setShowRegister(false));
    dispatch(setShowLogin(false));
  };

  return (
    <CustomModal show={showRegister} handleClose={handleClose}>
      <Grid container direction="column" alignItems="center">
        <Grid item className={classes.registerForm}>
          <RegisterForm {...props} />
        </Grid>

        <Grid item xs={10}>
          <CustomHr />
        </Grid>

        <Grid item container className={classes.loginStyle}>
          <div style={{ margin: "8px" }}>{t("login.hasAccount")} &nbsp;</div>
          <div>
            <span
              className={classes.loginLink}
              onClick={() => {
                dispatch(setShowRegister(false));
                dispatch(setShowLogin(true));
              }}
            >
              {t("login.login")}
            </span>
          </div>
        </Grid>
      </Grid>
    </CustomModal>
  );
}
