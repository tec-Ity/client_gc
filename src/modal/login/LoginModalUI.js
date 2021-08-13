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
    textDecoration:'underline',
    "&:hover": { color: "#C0E57B", fontWeight: "700" },
  },
}));

export default function LoginModalUI(props) {
  const dispatch = useDispatch();
  const showLogin = useSelector((state) => state.curClient.showLogin);
  const classes = useStyles();
  const handleClose = () => {
    dispatch(setShowLogin(false));
  };

  return (
    <CustomModal show={showLogin} handleClose={handleClose}>
      <Grid container direction='column' alignItems='center'>
        <Grid item className={classes.loginForm}>
          <LoginForm {...props} />
        </Grid>
        <Grid item style={{ margin: "13px" }}>
          <span>o accedi con</span>
        </Grid>
        <Grid item>
          <ThirdParty />
        </Grid>
        <Grid item xs={10}>
          <CustomHr/>
        </Grid>

        <Grid item container className={classes.registerStyle}>
          <div style={{ margin: "8px" }}>Prima volta qui? &nbsp;</div>
          <div>
            <span
              className={classes.registerLink}
              onClick={() => {
                console.log(111)
                dispatch(setShowRegister(true))}}>
              REGISTRATI
            </span>
          </div>
        </Grid>
      </Grid>
    </CustomModal>
  );
}
