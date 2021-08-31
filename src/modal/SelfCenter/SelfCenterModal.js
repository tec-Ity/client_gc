import React, { useEffect } from "react";
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

export default function SelfCenterModal() {
  const showSelfCenter = useSelector((state) => state.curClient.showSelfCenter);
  const curClientInfo = useSelector((state) => state.curClient.curClientInfo);
  const curClientInfoStatus = useSelector(
    (state) => state.curClient.curClientInfoStatus
  );

  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setShowSelfCenter(false));
  };

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
    <CustomModal show={showSelfCenter} handleClose={handleClose}>
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
                label='Nome:'
                value={curClientInfo.nome || "Add your name"}
              />
            </Grid>
            <Grid container item xs={12} className={classes.infoRowStyle}>
              <SelfCenterRow label='Account:' value={curClientInfo.code} />
            </Grid>
            <Grid container item xs={12} className={classes.infoRowStyle}>
              <SelfCenterRow
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
                label='Metodo di pagamento:'
                value={"暂无支付方式"}
              />
            </Grid>
            <Grid container item xs={12} className={classes.infoRowStyle}>
              <SelfCenterRow
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
              <SelfCenterRow label='Password' value={"**********"} />
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
            <Link onClick={() => ""}>LOG OUT</Link>
          </Grid>
        </CardWraper>
      )}
    </CustomModal>
  );
}

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

const useStyle = makeStyles({
  root: {},
  gridItemStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "7%",
    marginRight: "7%",
  },
  infoRowStyle: {
    height: "55px",
  },
  hrStyle: {
    width: "100%",
    margin: "3px",
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
    height: "80px",
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
});
