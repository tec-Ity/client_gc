import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

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
}));

const EndADM = ({ showPwd, toggleShowPwd }) => {
  return (
    <InputAdornment position='end'>
      <IconButton
        aria-label='toggle password visibility'
        onClick={toggleShowPwd}
        onMouseDown={(e) => e.preventDefault()}
        edge='end'>
        {showPwd ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );
};

export default function InputPassword(props) {
  const {
    pwdLabel = "Password",
    pwdLabelWidth = 70,
    password,
    handleChange,
  } = props;
  const [showPwd, setShowPwd] = useState(false);

  const classes = useStyles();
  return (
    <FormControl
      className={clsx(classes.margin, classes.textField)}
      variant='outlined'>
      <InputLabel htmlFor='outlined-adornment-password'>{pwdLabel}</InputLabel>
      <OutlinedInput
        id='outlined-adornment-password'
        type={showPwd ? "text" : "password"}
        value={password}
        onChange={
          pwdLabel === "Password"
            ? handleChange("password")
            : handleChange("passwordConfirm")
        }
        endAdornment={
          <EndADM
            showPwd={showPwd}
            toggleShowPwd={() => {
              setShowPwd((prev) => !prev);
            }}
          />
        }
        labelWidth={pwdLabelWidth}
      />
    </FormControl>
  );
}
