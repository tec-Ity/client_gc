import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import InputAccount from "../../component/input/InputAccount";
import InputPassword from "../../component/input/InputPassword";
import { makeStyles } from "@material-ui/core/styles";
import InputVerif from "../../component/input/InputVerif";
import { useTranslation } from "react-i18next";

const useStyle = makeStyles((theme) => ({
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

  registerButton: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: "97%",
    height: "35.63%",
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

export default function RegisterForm(props) {
  const { t } = useTranslation();
  const classes = useStyle();
  const {
    showPhonePre,
    registerData,
    handleChange,
    handleSubmit,
    handleSendCode,
  } = props;
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

        <Grid item xs={10} className={classes.gridItem}>
          <InputAccount
            showPhonePre={showPhonePre}
            phonePre={registerData.phonePre}
            account={registerData.account}
            handleChange={handleChange}
          />
        </Grid>

        <Grid item xs={10} className={classes.gridItem}>
          <InputPassword
            password={registerData.password}
            handleChange={handleChange}
          />
        </Grid>

        <Grid item xs={10} className={classes.gridItem}>
          <InputPassword
            pwdLabel="Confirm Password"
            pwdLabelWidth={135}
            password={registerData.passwordConfirm}
            handleChange={handleChange}
          />
        </Grid>

        <Grid item xs={10} className={classes.gridItem}>
          <InputVerif
            handleChange={handleChange}
            handleSendCode={handleSendCode}
          />
        </Grid>

        <Grid item xs={10} className={classes.gridItem}>
          <div className={classes.margin}>
            <Button
              classes={{
                root: classes.registerButton,
              }}
              variant="outlined"
              type="submit"
              size="large"
              // color='primary'
              onClick={handleSubmit}
            >
              {t("login.register")}
            </Button>
          </div>
        </Grid>
      </Grid>
    </form>
  );
}
