import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as Pin } from "../../component/icon/pin.svg";
import {
  Grid,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import {
  setShowAddrSel,
  setShowLogin,
} from "../../redux/curClient/curClientSlice";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles({
  root: {
    background:
      "linear-gradient(290.29deg, #91E8B3 -12.39%, #C0E57B 21.51%, #D6E57B 110.42%, #C0E57B 110.42%)",
    height: "300px",
    left: "0px",
    right: "0px",
    borderRadius: "0px 0px 80px 0px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    fontFamily: "'Montserrat', sans-serif",
  },
  ben: {
    /* Benvenuti! */
    maxWidth: "508.03px",
    width: "100%",
    height: "69.45px",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "60px",
    lineHeight: "73px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#1D1D38",
    marginBottom: "20px",
  },
  addrInput: {
    cursor: "pointer",
    width: " 450px",
    height: " 53px",
    border: "none",
    background: " #FFFFFF",
    boxShadow: " 0px 0px 30px rgba(0, 0, 0, 0.1)",
    borderRadius: " 26.5px 26.5px 26.5px 0px",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "20px",
    color: "#1D1D38",
    paddingLeft: "45px",
    // "& .MuiOutlinedInput-input": {
    //   "&:placeholder-shown": {
    //     // paddingLeft: "10%",
    //   },
    // },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },
  pinStyle: {
    "&:hover": {
      background: "transparent",
    },
    width: "55px",
    height: "55px",
    marginBottom: "3px",
  },
  testComp: {
    position: "absolute",
    top: "200px",
    left: "50px",
  },
});
export default function HomeBanner(props) {
  //   const { handleFunc } = props;
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
    <Grid container className={classes.root}>
      <Grid container item className={classes.ben} xs={12}>
        <div>Benvenuti!</div>
      </Grid>
      <Grid
        container
        item
        xs={12}
        justifyContent='center'
        style={{ cursor: "pointer" }}>
        <OutlinedInput
          disabled
          classes={{ root: classes.addrInput }}
          placeholder='Qual è il tuo indirizzo?'
          onClick={handleFunc}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton edge='end' classes={{ root: classes.pinStyle }}>
                <Pin className={classes.pinStyle} />
              </IconButton>
            </InputAdornment>
          }
        />
      </Grid>
    </Grid>
  );
}
