import React, { useState } from "react";
import CustomModal from "../../component/global/modal/CustomModal";
import { useDispatch } from "react-redux";
import { setShowAddrSel } from "../../redux/curClient/curClientSlice";
import {
  Grid,
  OutlinedInput,
  InputAdornment,
  Container,
  Autocomplete,
} from "@material-ui/core";
import { ReactComponent as Pin } from "../../component/icon/pin.svg";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as BackArrow } from "../../component/icon/chevron-left.svg";
import CustomHr from "../../component/global/modal/component/CustomHr";
import CustomButton from "../../component/global/modal/component/CustomButton";
// import MapContainer from "./MapContainer";
const useStyle = makeStyles({
  root: {},
  titleStyle: {
    // border: "1px solid",
    position: "relative",
    paddingTop: "50px",
    marginBottom: "44px",
    fontSize: "20px",
    fontWeight: "700",
  },
  goBack: {
    position: "absolute",
    left: "0",
    top: "45px",
  },
  inputRowStyle: {
    marginBottom: "30px",
  },
  inputStyle: {
    height: "40px",
    fontFamily: "Montserrat",
    fontSize: "16px",
    width: "100%",
    "&::after": { borderRadius: "100px 100px 100px 0" },
    "& .MuiOutlinedInput-notchedOutline": {
      //   border: "1px solid",
      borderColor: "#c0e57b",
      border: "1.5px solid",
      //   borderImage:
      //     "linear-gradient(90deg, rgba(192,229,123,1) 0%, rgba(145,232,179,1) 100%) 1",
      borderRadius: "100px 100px 100px 0",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#c0e57b",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderWidth: "2px",
      borderColor: "#c0e57b",
    },
  },
  pinStyle: {
    height: "20px",
    width: "20px",
    "& path": { stroke: "#c0e57b" },
    "& circle": { stroke: "#c0e57b" },
  },
  locationBox: {
    minHeight: "325px",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },

  customHr: { width: "100%" },
  customHrSm: { width: "100%", marginLeft: 0 },
});

export default function AddrModal() {
  const classes = useStyle();
  const [showNewAddr, setShowNewAddr] = useState(false);
  //   const showAddrSel = useSelector((state) => state.curClient.showAddrSel);
  const dispatch = useDispatch();
  return (
    <>
      {/* selection modal */}
      <CustomModal
        show={showNewAddr === false}
        handleClose={() => dispatch(setShowAddrSel(false))}>
        <Container>
          <Grid container className={classes.root}>
            <AddrSelHeader
              title='Scegli il tuo indirizzo'
              handleAdd={() => setShowNewAddr(true)}
            />
            {/* locations section */}
            <Grid
              container
              item
              alignItems='flex-start'
              alignContent='flex-start'
              className={classes.locationBox}>
              {/* current location */}
              <Grid item container xs={12} spacing={3}>
                {/* head */}
                <Grid item container xs={12}>
                  <Grid item container justifyContent='center' xs={2}>
                    icon
                  </Grid>
                  <Grid item container xs={6}>
                    La tua posizione attuale
                  </Grid>
                  <Grid item container justifyContent='center' xs={4}>
                    Rilocalizzare
                  </Grid>
                </Grid>
                {/* location body */}
                <Grid item container xs={12}>
                  <Grid item container xs={2} />
                  <Grid item container xs={10}>
                    xxxxx
                  </Grid>
                </Grid>
              </Grid>
              {/* hr */}
              <Grid item container xs={12}>
                <CustomHr position={classes.customHr} />
              </Grid>
              {/* saved locations */}
              <Grid item container xs={12} spacing={3}>
                {/* head */}
                <Grid item container xs={12}>
                  <Grid item container justifyContent='center' xs={2}>
                    icon
                  </Grid>
                  <Grid item container xs={6}>
                    I miei indirizzi salvati:
                  </Grid>
                  <Grid item container justifyContent='center' xs={4} />
                </Grid>
                {/* location body */}
                <Grid item container xs={12}>
                  <Grid item container xs={2} />
                  <Grid item container justifyContent='center' xs={10}>
                    <Grid item xs={12}>
                      Via Num, CAP, CITTA’
                    </Grid>
                    <Grid item xs={12}>
                      Username-Tel.
                    </Grid>
                    <Grid item xs={12}>
                      <CustomHr position={classes.customHrSm} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container item xs={12}>
              <CustomButton label="CONFERMA L'INDIRIZZO" />
            </Grid>
          </Grid>
        </Container>
      </CustomModal>
      {/* new location modal */}
      <CustomModal
        show={showNewAddr === true}
        handleClose={() => setShowNewAddr(false)}>
        <Container>
          <AddrSelHeader
            title='Inserisci il tuo indirizzo'
            goBack={() => setShowNewAddr(false)}
          />
        </Container>
      </CustomModal>
    </>
  );
}

function AddrSelHeader({ title, goBack = null, handleAdd, children = null }) {
  const classes = useStyle();
  return (
    <>
      <Grid
        item
        container
        xs={12}
        justifyContent='center'
        className={classes.titleStyle}>
        {goBack && (
          <div onClick={goBack} className={classes.goBack}>
            <BackArrow />
          </div>
        )}
        <div>{title}</div>
      </Grid>
      {!children ? (
        <Grid
          item
          container
          xs={12}
          justifyContent='center'
          className={classes.inputRowStyle}>
          <OutlinedInput
            classes={{ root: classes.inputStyle }}
            placeholder='Qual è il tuo indirizzo?'
            onClick={handleAdd}
            startAdornment={
              <InputAdornment position='start'>
                <Pin className={classes.pinStyle} />
              </InputAdornment>
            }
          />
        </Grid>
      ) : (
        children
      )}
    </>
  );
}
