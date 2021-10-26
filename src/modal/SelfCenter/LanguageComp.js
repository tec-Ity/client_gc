import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import china from "../../component/icon/china.svg";
import italy from "../../component/icon/italy.svg";
import { useTranslation } from "react-i18next";

const useStyle = makeStyles({
  LanguageRowStyle: {
    fontWeight: "400",
  },
  nationBox: {
    display: "flex",
    width: "100px",
  },
  nationBtn: {
    // border: "1px solid",
    padding: "0",
    borderRadius: "100%",
    // maxWidth: "48px",
    width: "64px",
    height: "64px",
    "&:hover": {
      // '& :nth-child(1)':{
      //   opacity:'0.8'
      // },
      background: "transparent",
    },
    // background: "green",

    "& .MuiButton-label": {
      borderRadius: "100%",

      width: "48px",
      height: "48px",
      "&:hover": {
        backgroundImage:
          "linear-gradient(270deg, rgba(145, 232, 179, 0.3) 0%, rgba(192, 229, 123, 0.3) 100%, rgba(192, 229, 123, 0.3) 100%)",
        "& svg": {
          borderRadius: "100%",
        },
      },
    },
  },
  nationBtnSelected: {
    padding: "0",
    borderRadius: "100%",
    width: "64px",
    height: "64px",
    "&:hover": {
      background: "transparent",
    },
    "& .MuiButton-label": {
      borderRadius: "100%",
      width: "48px",
      height: "48px",
      background: "#c0e57b",
      "& svg": {
        borderRadius: "100%",
      },
    },
  },
});
export default function LanguageComp() {
  const classes = useStyle();
  const { i18n } = useTranslation();
  return (
    <Grid
      container
      item
      xs={12}
      justifyContent='space-between'
      alignItems='center'
      className={classes.LanguageRowStyle}>
      <div>Lingue:</div>
      <div className={classes.nationBox}>
        <Button
          className={
            i18n.resolvedLanguage === "zh"
              ? classes.nationBtnSelected
              : classes.nationBtn
          }
          onClick={() => i18n.changeLanguage("zh")}>
          <img src={china} alt='中文' />
        </Button>
        <Button
          className={
            i18n.resolvedLanguage === "it"
              ? classes.nationBtnSelected
              : classes.nationBtn
          }
          onClick={() => i18n.changeLanguage("it")}>
          <img src={italy} alt='italiano' />
        </Button>
      </div>
    </Grid>
  );
}
