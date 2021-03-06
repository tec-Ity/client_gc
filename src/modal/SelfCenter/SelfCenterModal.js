import React, { useEffect, useState } from "react";
import CustomModal from "../../component/global/modal/CustomModal";
import CardWraper from "../../component/global/modal/component/CardWraper";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCurClientInfo,
  setShowSelfCenter,
} from "../../redux/curClient/curClientSlice";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import CustomHr from "../../component/global/modal/component/CustomHr";
import CustomButton from "../../component/global/modal/component/CustomButton";
import clsx from "clsx";
import { fetchPutCurClient } from "../../redux/curClient/curClientSlice";
import LogOutComp from "./LogOutComp";
import SubSelfModals from "./SubSelfModals";
import LanguageComp from "./LanguageComp";
import { useTranslation } from "react-i18next";
// import { slice } from "lodash";

const initialShowSubModal = {
  name: false,
  account: false,
  social: false,
  method: false,
  addr: false,
  addrAdd: false,
  pwd: false,
};
export default function SelfCenterModal() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showSubModal, setShowSubModal] = useState(initialShowSubModal);
  const [showMainModal, setShowMainModal] = useState(true);
  const showSelfCenter = useSelector((state) => state.curClient.showSelfCenter);
  const curClientInfo = useSelector((state) => state.curClient.curClientInfo);
  // //console.log(curClientInfo);
  const curClientInfoStatus = useSelector(
    (state) => state.curClient.curClientInfoStatus
  );
  const curClientInfoUpdateStatus = useSelector(
    (state) => state.curClient.curClientInfoUpdateStatus
  );
  const [tempInfo, setTempInfo] = useState(curClientInfo);
  const [justSubmitted, setJustSubmitted] = useState(null);

  const handleCloseSub = React.useCallback(() => {
    setShowMainModal(true);
    setShowSubModal(initialShowSubModal);
  }, []);

  useEffect(() => {
    if (curClientInfoUpdateStatus === "succeed" && justSubmitted) {
      handleCloseSub();
      setJustSubmitted((prev) => null);
    }
  }, [curClientInfoUpdateStatus, handleCloseSub, justSubmitted]);

  const handleCloseAll = () => {
    dispatch(setShowSelfCenter(false));
  };
  const handleShowSub = React.useCallback(
    (section, show = true) =>
      () => {
        setTempInfo(curClientInfo);
        setShowSubModal((prev) => ({ ...prev, [section]: show }));
        setShowMainModal(false);
      },
    [curClientInfo]
  );

  const handleChange = (section, value) => {
    setTempInfo((prev) => ({ ...prev, [section]: value }));
  };

  const handleSubmit = (section) => () => {
    setJustSubmitted(section);
    let value;
    switch (section) {
      case "password":
        value = {
          pwd: tempInfo.pwd,
          pwdOrg: tempInfo.pwdOrg,
        };
        break;
      case "general":
        value = {
          nome: tempInfo.nome,
        };
        break;

      default:
        value = tempInfo[section];
        break;
    }
    // //console.log({ type: section, value });
    dispatch(fetchPutCurClient({ type: section, value }));
  };

  //fetch cur Client info
  useEffect(() => {
    // //console.log("e", curClientInfoStatus);
    if (curClientInfoStatus === "idle") {
      dispatch(fetchCurClientInfo());
    } else if (curClientInfoStatus === "error") {
      setTimeout(() => {
        dispatch(fetchCurClientInfo());
      }, 2000);
    }
  }, [curClientInfoStatus, dispatch]);
  // //console.log(selectedLocation);
  const classes = useStyle();

  return (
    <>
      <CustomModal
        timeout={0}
        show={showSelfCenter && showMainModal}
        handleClose={handleCloseAll}
      >
        {curClientInfoStatus === "succeed" && curClientInfo && (
          // header
          <CardWraper
            type="user"
            title={
              curClientInfo.nome
                ? t("selfCenter.welcome") + curClientInfo.nome
                : t("selfCenter.welcome") + curClientInfo.code
            }
          >
            {/* hr */}
            <Grid container item xs={12} className={classes.gridItemStyle}>
              <CustomHr position={classes.hrStyle} />
            </Grid>
            {/* info section */}
            <Grid container item xs={12} className={classes.gridItemStyle}>
              <Grid container item xs={12} className={classes.infoRowStyle}>
                <SelfCenterRow
                  handleFunc={handleShowSub("name")}
                  label={t("selfCenter.name")}
                  value={
                    curClientInfo.nome || t("selfCenter.placeholders.name")
                  }
                />
              </Grid>
              <Grid container item xs={12} className={classes.infoRowStyle}>
                <SelfCenterRow
                  handleFunc={handleShowSub("account")}
                  label={t("selfCenter.account")}
                  value={curClientInfo.code}
                />
              </Grid>
              <Grid container item xs={12} className={classes.infoRowStyle}>
                <SelfCenterRow
                  handleFunc={handleShowSub("social")}
                  label={t("selfCenter.social")}
                  value={
                    curClientInfo.socials.length > 0
                      ? curClientInfo.socials.map((s) => s.social_type + " ")
                      : t("selfCenter.placeholders.social")
                  }
                />
              </Grid>
              <Grid container item xs={12} className={classes.infoRowStyle}>
                <SelfCenterRow
                  handleFunc={handleShowSub("method")}
                  label={t("selfCenter.paymentMethod")}
                  value={t("selfCenter.placeholders.paymentMethod")}
                />
              </Grid>
              <Grid container item xs={12} className={classes.infoRowStyle}>
                <SelfCenterRow
                  handleFunc={handleShowSub("addr")}
                  label={t("selfCenter.address")}
                  value={
                    curClientInfo?.addrs?.length > 0
                      ? curClientInfo.addrs[0].address?.slice(0, 35) + "..."
                      : t("selfCenter.placeholders.address")
                  }
                />
              </Grid>
              <Grid container item xs={12} className={classes.infoRowStyle}>
                <LanguageComp />
              </Grid>
              <Grid container item xs={12} className={classes.infoRowStyle}>
                <SelfCenterRow
                  handleFunc={handleShowSub("pwd")}
                  label={t("selfCenter.password")}
                  value={"**********"}
                />
              </Grid>
            </Grid>
            <Grid container item xs={12} className={classes.gridItemStyle}>
              <CustomHr position={classes.hrStyle} />
            </Grid>
            <Grid
              container
              item
              xs={12}
              className={clsx(classes.gridItemStyle, classes.logoutRow)}
            >
              <div>{t("selfCenter.userCenter")}</div>
              <LogOutComp />
            </Grid>
          </CardWraper>
        )}
      </CustomModal>
      <SubSelfModals
        showSubModal={showSubModal}
        handleCloseSub={handleCloseSub}
        tempInfo={tempInfo}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleShowSub={handleShowSub}
      />
    </>
  );
}

const SelfCenterRow = (props) => {
  const { t } = useTranslation();
  const { label, value, handleFunc } = props;
  const classes = useStyle();
  return (
    <Grid
      container
      item
      xs={12}
      justifyContent="space-between"
      alignItems="center"
    >
      <div className={classes.desp}>
        <div>{label}</div>
        <div>{value}</div>
      </div>
      <CustomButton
        label={t("components.button.modify")}
        handleFunc={handleFunc}
        alterStyle={classes.modifyBtnStyle}
      />
    </Grid>
  );
};

const useStyle = makeStyles({
  root: {},
  gridItemStyle: {
    display: "flex",
    justifyContent: "center",
    // alignItems: "center",
    marginLeft: "7%",
    marginRight: "7%",
  },
  infoRowStyle: {
    height: "55px",
  },
  hrStyle: {
    width: "100%",
    // padding: "3px",
    maxHeight: "1px",
    marginLeft: "0",
    marginRight: "0",
  },
  //row component
  desp: {
    "& :nth-child(1)": {
      fontSize: "12px",
      fontWeight: "400",
    },
    "& :nth-child(2)": {
      fontSize: "15px",
      fontWeight: "700",
    },
  },
  modifyBtnStyle: {
    background: "#c0e57b",
    width: "75px",
    height: "23px",
    fontSize: "10px",
  },
  logoutRow: {
    justifyContent: "space-between",
    // height: "80px",
    fontSize: "15px",
    "& :nth-child(1)": {
      fontWeight: "400",
    },
    "& :nth-child(2)": {
      textDecoration: "none",
      color: "#1d1d38",
      "&:visited": {
        color: "#1d1d38",
      },
    },
  },
});
