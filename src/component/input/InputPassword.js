import React, { useState } from "react";
import clsx from "clsx";
// import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useTranslation } from "react-i18next";

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
}));

const EndADM = ({ showPwd, toggleShowPwd }) => {
  return (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={toggleShowPwd}
        onMouseDown={(e) => e.preventDefault()}
        edge="end"
      >
        {showPwd ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );
};

export default function InputPassword(props) {
  const {
    type = "pwd" || "pwdConfirm",
    pwdLabelWidth = 70,
    password,
    handleChange,
  } = props;
  const { t } = useTranslation();
  const [showPwd, setShowPwd] = useState(false);

  const classes = useStyles();
  return (
    <FormControl
      className={clsx(classes.margin, classes.textField)}
      variant="outlined"
    >
      <InputLabel
        classes={{ root: classes.labelStyle }}
        // htmlFor='outlined-adornment-password'
      >
        {t(`login.placeholders.${type}`)}
      </InputLabel>
      <OutlinedInput
        classes={{
          root: classes.inputStyle,
          notchedOutline: classes.notchedOutline,
        }}
        type={showPwd ? "text" : "password"}
        value={password}
        onChange={handleChange(type)}
        endAdornment={
          <EndADM
            showPwd={showPwd}
            toggleShowPwd={() => {
              setShowPwd((prev) => !prev);
            }}
          />
        }
        labelWidth={pwdLabelWidth + 10}
      />
    </FormControl>
  );
}
