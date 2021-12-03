import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import InputModify from "../../component/input/InputModify";
import InputModifyPhonePre from "../../component/input/InputModifyPhonePre";
import { fetch_Prom } from "../../api";
import { makeStyles } from "@material-ui/core";
import CustomButton from "../../component/global/modal/component/CustomButton";
// import { useDispatch } from "react-redux";
// import { fetchPutCurClient } from "../../redux/curClient/curClientSlice";
const useStyle = makeStyles({
  otpBtn: {
    color: "#fff",
    background: "#c0e57b",
    borderRadius: "20px 20px 20px 0",
    height: "30px",
  },
  confirmBtn: {
    background: "#c0e57b",
    height: "30px",
  },
});
export default function SubAccountModal({ accountInfo, handleClose }) {
  const [editSection, setEditSection] = useState(null);
  //console.log(editSection);

  if (editSection)
    return (
      <EditSectionModal
        handleClose={handleClose}
        editSection={editSection}
        editInfo={
          editSection === "phone"
            ? accountInfo.phone
            : editSection === "email"
            ? accountInfo.email
            : ""
        }
      />
    );
  else
    return (
      <Grid container>
        <Grid item xs={12} style={{ paddingBottom: "5px" }}>
          <InputModify value={accountInfo.code || ""} disabled />
        </Grid>
        <Grid item xs={12} style={{ paddingBottom: "5px" }}>
          <InputModify
            disabled
            value={accountInfo.phone || ""}
            placeholder='Add a phone number'
            iconType='edit'
            handleFunc={() => {
              //console.log(11);
              setEditSection("phone");
            }}
          />
        </Grid>
        <Grid item xs={12} style={{ paddingBottom: "5px" }}>
          <InputModify
            disabled
            value={accountInfo.email || ""}
            placeholder='Add an email'
            iconType='edit'
            handleFunc={() => setEditSection("email")}
          />
        </Grid>
      </Grid>
    );
}

function EditSectionModal({ editInfo, handleClose, editSection }) {
  const classes = useStyle();
  //   const dispatch = useDispatch();
  const [infoUpdate, setInfoUpdate] = useState({ phonePre: "0039" });
  const handleSendCode = async () => {
    if (infoUpdate.account && infoUpdate.pwd) {
      editSection === "phone"
        ? await fetch_Prom("/obtain_otp", "POST", {
            phoneNum: infoUpdate.account,
            phonePre: infoUpdate.phonePre,
          })
        : await fetch_Prom("/obtain_otp", "POST", {
            email: infoUpdate.account,
          });
      //console.log(result);
    } else alert("请先输入账号和密码");
  };
  const handleSubmit = async () => {
    if (infoUpdate.account && infoUpdate.pwd && infoUpdate.otp) {
      const obj = {};
      if (infoUpdate.phonePre) {
        obj.phonePre = infoUpdate.phonePre;
        obj.phoneNum = infoUpdate.account;
      } else {
        obj.email = infoUpdate.account;
      }
      obj.pwd = infoUpdate.pwd;
      obj.otp = infoUpdate.otp;
      //console.log(obj);
      const result = await fetch_Prom("/reActive", "PUT", obj);
      //console.log(result);
      if (result.status === 200) {
        //console.log("success");
        handleClose();
      }
    } else {
      alert("请输入完整信息");
    }
  };
  //console.log(editSection);
  return (
    <Grid container>
      <Grid item xs={12} style={{ paddingBottom: "5px" }}>
        {editSection === "phone" ? (
          <InputModifyPhonePre
            value={infoUpdate.account || ""}
            placeholder={`Enter new ${editSection}`}
            iconType='edit'
            handleChange={(val) =>
              setInfoUpdate((prev) => ({ ...prev, account: val }))
            }
            handleFunc={(phonePre) => () =>
              setInfoUpdate((prev) => ({ ...prev, phonePre }))}
          />
        ) : (
          <InputModify
            value={infoUpdate.account || ""}
            placeholder={`Enter new ${editSection}`}
            iconType='edit'
            handleChange={(val) =>
              setInfoUpdate((prev) => ({ ...prev, account: val }))
            }
          />
        )}
      </Grid>
      <Grid item xs={12} style={{ paddingBottom: "5px" }}>
        <InputModify
          placeholder='password'
          value={infoUpdate.pwd || ""}
          iconType='pwd'
          handleChange={(val) =>
            setInfoUpdate((prev) => ({ ...prev, pwd: val }))
          }
        />
      </Grid>
      <Grid item xs={8} style={{ paddingBottom: "10px" }}>
        <InputModify
          value={infoUpdate.otp}
          placeholder='输入验证码'
          handleChange={(val) =>
            setInfoUpdate((prev) => ({ ...prev, otp: val }))
          }
        />
      </Grid>
      <Grid
        container
        item
        xs={4}
        style={{ paddingBottom: "10px" }}
        justifyContent='center'
        alignItems='center'>
        <Button
          disabled={!infoUpdate.account}
          variant='contained'
          className={classes.otpBtn}
          onClick={handleSendCode}>
          OTP
        </Button>
      </Grid>
      <Grid item xs={12}>
        <CustomButton
          label='CONFIRM'
          alterStyle={classes.confirmBtn}
          handleFunc={handleSubmit}
        />
      </Grid>
    </Grid>
  );
}
