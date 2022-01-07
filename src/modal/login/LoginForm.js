import React from "react";
import InputAccount from "../../component/input/InputAccount";
import InputPassword from "../../component/input/InputPassword";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {},
  welcome: {
    fontFamily: "Montserrat",
    fontWeight: "bold",
    fontSize: "25px",
    lineHeight: "30px",
    textAlign: "center",
    margin: "40px 0 30px 0",
    color: " #1D1D38",
  },
  gridItem: {
    width: "100%",
  },
  margin: {
    margin: theme.spacing(1),
  },
  forgetPwd: {
    width: "fit-content",
    position: "absolute",
    right: "5%",
  },
  forgetLink: {
    textDecoration: "none",
    fontSize: "9px",
    opacity: "0.7",
    "&:visited": {
      color: "#1d1d38",
    },
    "&:hover": {
      opacity: "1",
    },
  },
  loginButton: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
    width: "98%",
    // height: "30%",
    border: "2px solid",
    borderRadius: "26.5px 26.5px 26.5px 0",
    borderColor: "#1d1d38",
    color: "#1d1d38",
    fontFamily: "Montserrat",
    fontWeight: "700",
    fontSize: "18.75px",
    "&:hover": {
      backgroundColor: "#1d1d38",
      color: "#fff",
    },
  },
}));

export default function LoginForm(props) {
  const { t } = useTranslation();
  const { handleLogin, handleChange, loginData, showPhonePre, showAlert } =
    props;
  const classes = useStyles();

  return (
    <form autoComplete="off">
      <Grid
        container
        direction="column"
        alignItems="center"
        className={classes.root}
      >
        <Grid item xs={6}>
          <div className={classes.welcome}>{t("selfCenter.welcome")}</div>
        </Grid>
        {showAlert && (
          <Grid item xs={10} container>
            <div
              style={{
                color: "red",
                fontSize: "12px",
                paddingLeft: "10px",
                paddingBottom: "5px",
              }}
            >
              {t("login.alert.wrongCred")}
            </div>
          </Grid>
        )}
        <Grid item xs={10} className={classes.gridItem}>
          <InputAccount
            showPhonePre={showPhonePre}
            phonePre={loginData.phonePre}
            account={loginData.account}
            handleChange={handleChange}
          />
        </Grid>

        <Grid item xs={10} className={classes.gridItem}>
          <InputPassword
            pwdLabel="Password"
            password={loginData.password}
            handleChange={handleChange}
          />
          <div style={{ width: "400px", position: "relative" }}>
            <div className={classes.forgetPwd}>
              <Link to="/" className={classes.forgetLink}>
                {t("login.forgetPwd")}
              </Link>
            </div>
          </div>
        </Grid>

        <Grid item xs={10} className={clsx(classes.gridItem)}>
          <div className={classes.margin}>
            <Button
              classes={{
                root: classes.loginButton,
              }}
              variant="outlined"
              type="submit"
              size="large"
              // color='primary'
              onClick={handleLogin}
            >
              {t("login.login")}
            </Button>
          </div>
        </Grid>
      </Grid>
    </form>
  );
}
