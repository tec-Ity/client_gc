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
import { set } from "lodash";
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
  const { t } = useTranslation();
  const { handleSendCode, handleChange, verifCode, handleFormCheck } = props;
  const classes = useStyles();
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [countDown, setCountDown] = useState(-1);
  const myTimer = React.useRef(null);

  React.useEffect(() => {
    // console.log("effect", countDown);
    if (countDown === 0) {
      // console.log("end", countDown);
      clearInterval(myTimer.current);
      setBtnDisabled(false);
    } else if (countDown === 60) {
      // console.log("start", countDown);
      myTimer.current = setInterval(() => {
        // console.log("timer", countDown);
        setCountDown((prev) => prev - 1);
      }, 1000);
    }
  }, [countDown]);
  // console.log(countDown);
  const EndADM = (
    <InputAdornment position="end">
      <Button
        disabled={btnDisabled}
        className={classes.recieveButton}
        onClick={() => {
          if (handleFormCheck()) {
            setBtnDisabled(true);
            handleSendCode();
            setCountDown(60);
          }
        }}
      >
        {countDown > 0 ? countDown + t("login.timer") : t("login.receive")}
      </Button>
    </InputAdornment>
  );
  return (
    <FormControl
      className={clsx(classes.margin, classes.textField)}
      variant="outlined"
    >
      <InputLabel
        classes={{ root: classes.labelStyle }}
        // htmlFor='outlined-adornment-password'
      >
        {t("login.placeholders.verifCode")}
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
