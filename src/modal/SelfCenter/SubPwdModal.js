import React, { useCallback, useState, useEffect } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import InputModify from "../../component/input/InputModify";
import CustomButton from "../../component/global/modal/component/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { fetchPutCurClient } from "../../redux/curClient/curClientSlice";

const useStyles = makeStyles({
  root: {
    // border: "1px solid",
    height: "350px",
    display: "flex",
    justifyContent: "center",
    alignItems: "space-evenly",
  },
});
export default function SubPwdModal(props) {
  const { handleClose } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const curClientInfoUpdateStatus = useSelector(
    (state) => state.curClient.curClientInfoUpdateStatus
  );
  const [justSubmitted, setJustSubmitted] = useState(false);
  const [pwdInfo, setPwdInfo] = useState({
    oldPwd: "",
    newPwd: "",
    newPwdConfirm: "",
  });

  useEffect(() => {
    if (justSubmitted === true && curClientInfoUpdateStatus === "succeed") {
      handleClose();
    }
  }, [curClientInfoUpdateStatus, handleClose, justSubmitted]);

  const handleChange = useCallback(
    (type) => (value) => {
      setPwdInfo((prev) => ({ ...prev, [type]: value }));
    },
    []
  );

  const handleSubmitPwdInfo = useCallback(() => {
    // //console.log(pwdInfo);
    if (
      pwdInfo.oldPwd.length > 0 &&
      pwdInfo.newPwd.length > 0 &&
      pwdInfo.newPwdConfirm.length > 0 &&
      pwdInfo.newPwd === pwdInfo.newPwdConfirm
    )
      dispatch(
        fetchPutCurClient({
          type: "password",
          value: { pwd: pwdInfo.newPwd, pwdOrg: pwdInfo.oldPwd },
        })
      );
    setJustSubmitted(true);
  }, [dispatch, pwdInfo]);
  return (
    <Grid className={classes.root} container>
      <Grid item xs={12}>
        <InputModify
          value={pwdInfo.oldPwd}
          handleChange={handleChange("oldPwd")}
          placeholder='Inserisci la password vecchia:'
        />
      </Grid>
      <Grid item xs={12}>
        <InputModify
          iconType='pwd'
          value={pwdInfo.newPwd}
          handleChange={handleChange("newPwd")}
          placeholder='Nuova password:'
        />
      </Grid>
      <Grid item xs={12}>
        <InputModify
          iconType='pwd'
          value={pwdInfo.newPwdConfirm}
          handleChange={handleChange("newPwdConfirm")}
          placeholder='Conferma la tua password:'
        />
      </Grid>
      <Grid item xs={12}>
        <CustomButton label='CONTINUA' handleFunc={handleSubmitPwdInfo} />
      </Grid>
      {/* <Grid item xs={12}>
        <div>o hai dimenticato la tua password?</div>
      </Grid> */}
    </Grid>
  );
}
