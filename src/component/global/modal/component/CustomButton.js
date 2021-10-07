import { Button, CircularProgress, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
const useStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "34px",
    borderRadius: "100px 100px 100px 0",
    background: "#1d1d38",
    fontSize: "14px",
    fontFamily: "Montserrat",
    fontWeight: "700",
    color: "#fff",
    opacity: "1",
    "&:hover": {
      opacity: "0.8",
      background: "#1d1d38",
    },
    "&:focus": {
      // background: "#e47f10",
    },
    '&.Mui-disabled':{
      color:'#fff',
      background: "#1d1d38",
      opacity: "0.3"
    }
  },
}));

export default function CustomButton(props) {
  const classes = useStyle();
  const [loading, setLoading] = React.useState(false);
  const { label, handleFunc, alterStyle = null, disableBtn } = props;
  return (
    <Button
      onClick={() => {
        setLoading(true);
        loading === false && handleFunc();
      }}
      disabled={disableBtn}
      className={clsx(classes.root, alterStyle)}>
      {loading === false ? (
        label
      ) : (
        <CircularProgress size={20} style={{color:'#fff'}}/>
      )}
    </Button>
  );
}
