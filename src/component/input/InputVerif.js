import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "95%",
  },

  labelStyle: {
    color: "#1D1D38",
    fontFamily: "Montserrat",
    "&.Mui-focused": {
      color: "#1D1D38",
    },
  },
  inputStyle: {
    borderRadius: "100px 100px 100px 0px",
    "& $notchedOutline": {
      borderColor: "#1D1D38",
    },
    "&.Mui-focused $notchedOutline": {
      borderColor: "#1D1D38",
    },
    "&:hover $notchedOutline": {
      borderWidth: "2px",
      borderColor: "#1D1D38",
    },
  },
  notchedOutline: {},

  recieveButton: {
    width: "68px",
    height: "22px",
    border: "2px solid",
    background: "#1D1D38",
    borderRadius: "26.5px 26.5px 26.5px 0",
    borderColor: "#1d1d38",
    color: "#f0f0f0",
    fontFamily: "Montserrat",
    fontSize: "14px",
    "&:hover": {
      background: "#1d1d38",
    },
    "&:disabled": {
      background: "#fff",
    },
  },
  recieveButtonOnClicked: {
    width: "68px",
    height: "22px",
    border: "2px solid",
    background: "#1D1D38",
    borderRadius: "26.5px 26.5px 26.5px 0",
    borderColor: "#1d1d38",
    color: "#f0f0f0",
    fontFamily: "Montserrat",
    fontSize: "14px",
    "&:hover": {
      background: "#1D1D38",
    },
  },
}));

export default function InputVerif(props) {
  const { handleSendCode, handleChange, verifCode } = props;
  const classes = useStyles();
  const [btnDisabled, setBtnDisabled] = useState(false);
  console.log(classes.recieveButton);
  const EndADM = (
    <InputAdornment position='end'>
      <Button
        disabled={btnDisabled}
        className={classes.recieveButton}
        onClick={() => {
          setBtnDisabled(true);
          handleSendCode();
        }}>
        RICEVI
      </Button>
    </InputAdornment>
  );
  return (
    <FormControl
      className={clsx(classes.margin, classes.textField)}
      variant='outlined'>
      <InputLabel
        classes={{ root: classes.labelStyle }}
        // htmlFor='outlined-adornment-password'
      >
        Codice di verifica:
      </InputLabel>
      <OutlinedInput
        classes={{
          root: classes.inputStyle,
          notchedOutline: classes.notchedOutline,
        }}
        value={verifCode}
        onChange={handleChange("otp")}
        endAdornment={EndADM}
        labelWidth={150}
      />
    </FormControl>
  );
}
