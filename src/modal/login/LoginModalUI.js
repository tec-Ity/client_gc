import React from "react";
// import { Link } from "react-router-dom";
import { Grid, makeStyles } from "@material-ui/core";
import ThirdParty from "./ThirdParty";
import LoginForm from "./LoginForm";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowLogin,
  setShowRegister,
} from "../../redux/curClient/curClientSlice";
import CustomModal from "../../component/global/modal/CustomModal";
import CustomHr from "../../component/global/modal/component/CustomHr";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  loginForm: {
    width: "500px",
  },
  ThirdParty: {},
  registerStyle: {
    marginBottom: "25px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  registerLink: {
    color: "#1d1d38",
    cursor: "pointer",
    textDecoration: "underline",
    "&:hover": { color: "#C0E57B", fontWeight: "700" },
  },
}));

export default function LoginModalUI(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const showLogin = useSelector((state) => state.curClient.showLogin);
  const classes = useStyles();
  const handleClose = () => {
    dispatch(setShowLogin(false));
  };

  return (
    <CustomModal show={showLogin} handleClose={handleClose}>
      <Grid container direction="column" alignItems="center">
        <Grid item className={classes.loginForm}>
          <LoginForm {...props} />
        </Grid>
        <Grid item style={{ margin: "13px" }}>
          <span>{t("login.orThirdParty")}</span>
        </Grid>
        <Grid item style={{ height: "100px" }}>
          <ThirdParty />
        </Grid>
        <Grid item xs={10}>
          <CustomHr />
        </Grid>

        <Grid item container className={classes.registerStyle}>
          <div style={{ margin: "8px" }}>{t("login.firstTime")} &nbsp;</div>
          <div>
            <span
              className={classes.registerLink}
              onClick={() => {
                dispatch(setShowRegister(true));
              }}
            >
              {t("login.register")}
            </span>
          </div>
        </Grid>
      </Grid>
    </CustomModal>
  );
}
