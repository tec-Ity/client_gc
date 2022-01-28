import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as Pin } from "../../component/icon/pin.svg";
import { ReactComponent as Locate } from "../../component/icon/locate.svg";
import { useTranslation } from "react-i18next";
import {
  Grid,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Container,
} from "@material-ui/core";
import {
  setShowAddrSel,
  setShowLogin,
} from "../../redux/curClient/curClientSlice";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "transparent",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: "150px",
    paddingRight: "150px",
    [theme.breakpoints.down("sm")]: {
      paddingRight: "0",
      justifyContent: "center",
      paddingTop: "100px",
    },
    [theme.breakpoints.down("xs")]: {
      paddingTop: "50px",
    },
  },
  root2: {
    background: "transparent",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: "150px",
    // paddingRight: "150px",
    [theme.breakpoints.down("sm")]: {
      paddingRight: "0",
      justifyContent: "center",
      paddingTop: "100px",
    },
    [theme.breakpoints.down("xs")]: {
      paddingTop: "50px",
    },
  },
  gridStyle: {
    width: "100%",
    maxWidth: "508px",
  },
  gridStyle2: {
    maxWidth: "1000px",
  },
  msg: {
    maxWidth: "508.03px",
    width: "100%",
    height: "105px",
    fontWeight: "700",
    fontSize: "40px",
    color: "#1D1D38",
    marginBottom: "20px",
    textAlign: "center",
    whiteSpace: "pre-line",
    [theme.breakpoints.down("xs")]: {
      fontSize: "45px",
      height: "150px",
    },
    "& > :nth-child(2)": { color: "#fff" },
  },
  msg2: {
    // width: "100%",
    fontWeight: "700",
    fontSize: "80px",
    textAlign: "center",
    whiteSpace: "pre-wrap",
    // alignItems: "center",
    // justifyContent: "center",
    "& > :nth-child(2)": { color: "#fff" },
  },
  addrBox: {
    "& > div": {
      display: "flex",
      justifyContent: "center",
      paddingBottom: "30px",
    },
    //insert
    "& > :nth-child(1)": {
      fontSize: "14px",
    },
    //locate
    "& > :nth-child(3)": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "18px",
      color: "#fff",
      fontWeight: "700",
      "& > :nth-child(1)": {
        "& path": { fill: "#fff" },
        height: "24px",
        width: "24px",
        marginRight: "10px",
      },
    },
  },
  addrInput: {
    width: " 450px",
    height: " 53px",
    background: " #FFFFFF",
    boxShadow: " 0px 0px 30px rgba(0, 0, 0, 0.1)",
    borderRadius: " 26.5px 26.5px 26.5px 0px",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "20px",
    color: "#1D1D38",
    paddingLeft: "45px",

    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .MuiOutlinedInput-input": { cursor: "pointer" },
  },
  pinStyle: {
    "&:hover": {
      background: "transparent",
    },
    width: "55px",
    height: "55px",
    marginBottom: "3px",
  },
}));
export default function HomeBanner(props) {
  //   const { handleFunc } = props;
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.curClient.isLogin);
  const handleFunc = () => {
    if (!isLogin) {
      dispatch(setShowLogin(true));
    } else {
      dispatch(setShowAddrSel(true));
    }
  };

  return (
    <Container disableGutters className={classes.root2}>
      <Grid container className={classes.gridStyle2}>
        <Grid item className={classes.msg2} xs={12}>
          <span>{t("home.slogan.black")}</span>
          <span>{t("home.slogan.white")}</span>
        </Grid>
        <Grid
          container
          item
          xs={12}
          justifyContent="center"
          className={classes.addrBox}
        >
          <Grid item xs={12}>
            {t("home.adress.tooltip")}
          </Grid>
          <Grid item xs={12}>
            <OutlinedInput
              disabled
              style={{ cursor: "pointer" }}
              classes={{ root: classes.addrInput }}
              placeholder={t("address.enterAddr")}
              onClick={handleFunc}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton edge="end" classes={{ root: classes.pinStyle }}>
                    <Pin className={classes.pinStyle} />
                  </IconButton>
                </InputAdornment>
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Locate />
            <div>{t("home.adress.finder")}</div>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
