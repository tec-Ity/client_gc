import React, { useState } from "react";
import InputAccount from "../../component/input/InputAccount";
import InputPassword from "../../component/input/InputPassword";
import { Button, Grid } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
const ColorButton = withStyles((theme) => ({
  root: {
    width: "100%",
    height:"50px",
    marginTop:theme.spacing(2),
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
    variant:'outlined',
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  root: {},
  gridItem: {
    width: "100%",
  },
  loginButton:{
    width:"100%",
    border:"2px solid",
    borderRadius:"26.5px"
  }
}));

export default function LoginForm(props) {
  const { handleLogin, handleChange, loginData, showPhonePre } = props;
  const classes = useStyles();

  return (
    <form autoComplete='off'>
      <Grid
        container
        direction='column'
        alignItems='center'
        className={classes.root}>
        <Grid item xs={6}>
          <h1>Welcome</h1>
        </Grid>
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
            pwdLabel='Password'
            password={loginData.password}
            handleChange={handleChange}
          />
        </Grid>
        <br />
        <Grid item xs={5} className={classes.gridItem}>
          <Button
            className={classes.loginButton}
            variant='outlined'
            type='submit'
            size='large'
            // color='primary'
            onClick={handleLogin}>
            Login
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
