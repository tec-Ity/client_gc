import React, { useEffect, useState } from "react";
import CustomModal from "../../component/global/modal/CustomModal";
import CardWraper from "../../component/global/modal/component/CardWraper";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCurClientInfo,
  setShowSelfCenter,
} from "../../redux/curClient/curClientSlice";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import CustomHr from "../../component/global/modal/component/CustomHr";
import CustomButton from "../../component/global/modal/component/CustomButton";
import { Link } from "react-router-dom";
import clsx from "clsx";
import china from "../../component/icon/china.svg";
import italy from "../../component/icon/italy.svg";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import InputModify from "../../component/input/InputModify";
import { fetchPutCurClient } from "../../redux/curClient/curClientSlice";
import { logout_Prom } from "../../api";

export default function SelfCenterModal() {
  const dispatch = useDispatch();
  const initialShowSubModal = {
    name: false,
    account: false,
    social: false,
    method: false,
    addr: false,
    pwd: false,
  };
  const [showSubModal, setShowSubModal] = useState(initialShowSubModal);
  const [showMainModal, setShowMainModal] = useState(true);
  const showSelfCenter = useSelector((state) => state.curClient.showSelfCenter);
  const curClientInfo = useSelector((state) => state.curClient.curClientInfo);
  const curClientInfoStatus = useSelector(
    (state) => state.curClient.curClientInfoStatus
  );
  const [tempInfo, setTempInfo] = useState(curClientInfo);

  useEffect(() => {
    if (localStorage.getItem("thirdPartyLogin")) {
      (function (d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "./thirdPartyLogin.js";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "ThirdPartyLogin");
    }
  }, []);
  
  const handleCloseAll = () => {
    dispatch(setShowSelfCenter(false));
  };
  const handleShowSub = (section) => () => {
    setTempInfo(curClientInfo);
    setShowSubModal((prev) => ({ ...prev, [section]: true }));
    setShowMainModal(false);
  };

  const handleCloseSub = () => {
    setShowMainModal(true);
    setShowSubModal(initialShowSubModal);
  };

  const handleChange = (section, value) => {
    setTempInfo((prev) => ({ ...prev, [section]: value }));
  };

  const handleSubmit = (section) => () => {
    dispatch(fetchPutCurClient({ type: section, value: tempInfo[section] }));
  };

  //fetch cur Client info
  useEffect(() => {
    // console.log("e", curClientInfoStatus);
    if (curClientInfoStatus === "idle") {
      dispatch(fetchCurClientInfo());
    } else if (curClientInfoStatus === "error") {
      setTimeout(() => {
        dispatch(fetchCurClientInfo());
      }, 2000);
    }
  }, [curClientInfoStatus, dispatch]);

  const classes = useStyle();
  return (
    <>
      <CustomModal
        timeout={0}
        show={showSelfCenter && showMainModal}
        handleClose={handleCloseAll}>
        {curClientInfoStatus === "succeed" && curClientInfo && (
          <CardWraper
            title={
              curClientInfo.nome
                ? "CIAO! " + curClientInfo.nome
                : "CIAO! " + curClientInfo.code
            }>
            <Grid container item xs={12} className={classes.gridItemStyle}>
              <CustomHr position={classes.hrStyle} />
            </Grid>
            {/* info section */}
            <Grid container item xs={12} className={classes.gridItemStyle}>
              <Grid container item xs={12} className={classes.infoRowStyle}>
                <SelfCenterRow
                  handleFunc={handleShowSub("name")}
                  label='Nome:'
                  value={curClientInfo.nome || "Add your name"}
                />
              </Grid>
              <Grid container item xs={12} className={classes.infoRowStyle}>
                <SelfCenterRow
                  handleFunc={handleShowSub("account")}
                  label='Account:'
                  value={curClientInfo.code}
                />
              </Grid>
              <Grid container item xs={12} className={classes.infoRowStyle}>
                <SelfCenterRow
                  handleFunc={handleShowSub("social")}
                  label='Social:'
                  value={
                    curClientInfo.socials.length > 0
                      ? curClientInfo.socials.map((s) => s.social_type + " ")
                      : "暂无第三方登录"
                  }
                />
              </Grid>
              <Grid container item xs={12} className={classes.infoRowStyle}>
                <SelfCenterRow
                  handleFunc={handleShowSub("method")}
                  label='Metodo di pagamento:'
                  value={"暂无支付方式"}
                />
              </Grid>
              <Grid container item xs={12} className={classes.infoRowStyle}>
                <SelfCenterRow
                  handleFunc={handleShowSub("addr")}
                  label='Indirizzi:'
                  value={
                    curClientInfo.addrs.length > 0
                      ? curClientInfo.addrs[0]
                      : "暂无地址"
                  }
                />
              </Grid>
              <Grid container item xs={12} className={classes.infoRowStyle}>
                <LanguageRow />
              </Grid>
              <Grid container item xs={12} className={classes.infoRowStyle}>
                <SelfCenterRow
                  handleFunc={handleShowSub("pwd")}
                  label='Password'
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
              className={clsx(classes.gridItemStyle, classes.logoutRow)}>
              <div>User Center</div>
              <Link to='#' onClick={handleLogout}>
                LOG OUT
              </Link>
            </Grid>
          </CardWraper>
        )}
      </CustomModal>
      {showSubModal.name === true && (
        <RowModal
          show={showSubModal.name}
          handleClose={handleCloseSub}
          label='Modifica il tuo nome:'>
          <InputModify
            value={tempInfo.nome || ""}
            iconType='done'
            placeholder={tempInfo.nome ? null : "Add your name"}
            handleChange={(value) => handleChange("nome", value)}
            handleFunc={handleSubmit("nome")}
          />
        </RowModal>
      )}
      {showSubModal.account === true && (
        <RowModal
          show={showSubModal.account}
          handleClose={handleCloseSub}
          label='Modifica il tuo account:'></RowModal>
      )}
      {showSubModal.social === true && (
        <RowModal
          show={showSubModal.social}
          handleClose={handleCloseSub}
          label='Modifica il tuo social:'></RowModal>
      )}
      {showSubModal.method === true && (
        <RowModal
          show={showSubModal.method}
          handleClose={handleCloseSub}
          label='Modifica i metodi di pagamento:'></RowModal>
      )}
      {showSubModal.addr === true && (
        <RowModal
          show={showSubModal.name}
          handleClose={handleCloseSub}
          label='Modifica i tuoi indirizzi:'></RowModal>
      )}
      {showSubModal.pwd === true}
    </>
  );
}

const RowModal = (props) => {
  const { show, handleClose, label, children } = props;
  const classes = useStyle();
  return (
    <CustomModal timeout={0} show={show} handleClose={handleClose} small>
      <Grid container justifyContent='center' className={classes.subModal}>
        <Grid
          container
          item
          xs={12}
          alignItems='center'
          className={classes.subHeader}>
          <Link to='#'>
            <ArrowBackIosIcon onClick={handleClose} />
          </Link>
          <div>{label}</div>
        </Grid>

        <Grid container item xs={12}>
          <CustomHr position={classes.subHrStyle} />
        </Grid>
        <Grid
          container
          item
          xs={12}
          justifyContent='center'
          style={{ marginTop: "20px" }}>
          {children}
        </Grid>
      </Grid>
    </CustomModal>
  );
};

const SelfCenterRow = (props) => {
  const { label, value, handleFunc } = props;
  const classes = useStyle();
  return (
    <Grid
      container
      item
      xs={12}
      justifyContent='space-between'
      alignItems='center'>
      <div className={classes.desp}>
        <div>{label}</div>
        <div>{value}</div>
      </div>
      <CustomButton
        label='MODIFICA'
        handleFunc={handleFunc}
        alterStyle={classes.modifyBtnStyle}
      />
    </Grid>
  );
};

const LanguageRow = () => {
  const classes = useStyle();
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
        <Button className={classes.nationBtn}>
          <img src={china} alt='中文' />
        </Button>
        <Button className={classes.nationBtn}>
          <img src={italy} alt='italiano' />
        </Button>
      </div>
    </Grid>
  );
};

const handleLogout = async () => {
  const tpl = localStorage.getItem("thirdPartyLogin");
  switch (tpl) {
    case "facebook":
      window.FB.getLoginStatus(async function (response) {
        console.log(response);
        window.FB.logout(function (response) {
          console.log(response);
          async function func() {
            const result = await logout_Prom();
            if (result.status !== 200) {
              alert(result.message);
            }
            // setRefresh(r=>r+1)
          }
          func();
        });
      });
      return;
    case "google":
      var auth2;
      window.gapi.load("auth2", function () {
        /**
         * Retrieve the singleton for the GoogleAuth library and set up the
         * client.
         */
        async function authInit() {
          auth2 = await window.gapi.auth2.init({
            client_id: localStorage.getItem("google"),
          });

          console.log(auth2);
          auth2 = window.gapi.auth2.getAuthInstance();
          console.log(auth2);
          auth2.signOut().then(function () {
            console.log("用户注销成功");
            async function func() {
              const result = await logout_Prom();
              if (result.status !== 200) {
                alert(result.message);
              }
            }
            func();
          });
        }
        authInit();
      });

      return;

    default:
      const result = await logout_Prom();
      if (result.status !== 200) {
        alert(result.message);
      }
      return;
  }
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
  ///sub modal style
  subModal: {
    paddingLeft: "7%",
    paddingRight: "7%",
  },
  subHeader: {
    color: "#1d1d38",
    fontSize: "15px",
    marginTop: "20px",
    "& :visited": {
      color: "#1d1d38",
    },
  },
  subHrStyle: {
    width: "100%",
    marginLeft: "0",
    marginRight: "0",
  },
});
