import React, { useState } from "react";
import CustomModal from "../../component/global/modal/CustomModal";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowAddrSel,
  setUserCurLocation,
} from "../../redux/curClient/curClientSlice";
import {
  Grid,
  OutlinedInput,
  InputAdornment,
  Container,
} from "@material-ui/core";
import { ReactComponent as Pin } from "../../component/icon/mapInsertLocation.svg";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as BackArrow } from "../../component/icon/chevron-left.svg";
import CustomHr from "../../component/global/modal/component/CustomHr";
import CustomButton from "../../component/global/modal/component/CustomButton";
import MapContainer from "./MapContainer";
import { getGeocode } from "use-places-autocomplete";
import { ReactComponent as CurLocationIcon } from "../../component/icon/currentLocation.svg";
import { ReactComponent as LocateIcon } from "../../component/icon/locate.svg";
import { ReactComponent as UserIcon } from "../../component/icon/user.svg";
import { ReactComponent as CheckCircleIcon } from "../../component/icon/check-circle.svg";

const useStyle = makeStyles({
  root: { fontFamily: "Montserrat" },
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
    // marginBottom: "30px",
  },
  inputStyle: {
    height: "40px",
    fontFamily: "Montserrat",
    // '&::placeholder':{fontFamily: 'Montserrat'},
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
    // "& .MuiFormLabel": { color: "red" },
    // "& .Mui-focused .MuiFormLabel-root": { color: "#c0e57b" },
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
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
    "& path": { fill: "#c0e57b" },
    "& circle": { fill: "#c0e57b" },
  },
  locationBox: {
    marginTop: "22px",
    minHeight: "325px",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  locationBoxTitle: {
    fontWeight: "600",
    color: "#c0e57b",
    paddingLeft: "5px",
  },
  iconStyle: {
    "& path": { fill: "#c0e57b" },
    marginLeft: "13px",
    height: "20px",
    width: "20px",
  },
  locateButton: {
    color: "#91e8b3",
    fontWeight: "600",
    fontSize: "0.75em",
    "&:hover": { cursor: "pointer" },
  },
  locateButtonIconStyle: {
    "& path": { fill: "#91e8b3" },
    position: "relative",
    top: "2px",
    right: "5px",
  },
  savedLocation: {
    "&:hover": {
      //   backgroundColor: "#c0e57b",
      background:
        "linear-gradient(270deg, rgba(145, 232, 179, 0.3) 0%, rgba(192, 229, 123, 0.3) 100%, rgba(192, 229, 123, 0.3) 100%)",
      borderRadius: "100px 100px 100px 0",
    },
  },
  //bold on selection icon
  boldOnSelection: {
    fontWeight: "700",
  },
  //custom compo
  customHr: { width: "100%" },
  customHrSm: { color: "#1d1d38", opacity: "0.5" },
  customBtnStyle: {
    fontSize: "14px",
    height: "30px",
  },
});

export default function AddrModal() {
  const classes = useStyle();
  const [showNewAddr, setShowNewAddr] = useState(false);
  //   const showAddrSel = useSelector((state) => state.curClient.showAddrSel);
  const dispatch = useDispatch();
  const userCurLocation = useSelector(
    (state) => state.curClient.userCurLocation
  );
  const [selectedLocation, setSelectedLocation] = useState(null);
  const getCurrentPosition = React.useCallback(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      console.log(pos);
      const result = await getGeocode({
        location: {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        },
      });
      console.log("geo", result);
      dispatch(setUserCurLocation(result[0]?.formatted_address));
      const shortName = result[0].address_components.find((address) =>
        address.types.find((type) => type === "administrative_area_level_2")
      ).short_name;
      console.log(shortName);
    });
  }, [dispatch]);
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
                <Grid item container xs={12} style={{ paddingRight: 0 }}>
                  <Grid item container justifyContent='flex-start' xs={1}>
                    <CurLocationIcon className={classes.iconStyle} />
                  </Grid>
                  <Grid
                    item
                    container
                    xs={7}
                    className={classes.locationBoxTitle}>
                    La tua posizione attuale
                  </Grid>
                  <Grid item container justifyContent='flex-end' xs={4}>
                    <div
                      onClick={getCurrentPosition}
                      className={classes.locateButton}>
                      <LocateIcon className={classes.locateButtonIconStyle} />
                      Rilocalizzare
                    </div>
                  </Grid>
                </Grid>
                {/* location body */}
                <Grid item container xs={12}>
                  {/* offset  */}
                  <Grid item container xs={1} />
                  <Grid item container xs={11}>
                    {userCurLocation
                      ? userCurLocation
                      : "Please get current location"}
                  </Grid>
                </Grid>
              </Grid>
              {/* hr */}
              <Grid item container xs={12}>
                <CustomHr position={classes.customHr} />
              </Grid>
              {/* -------------------------saved locations ------------------------- */}
              <Grid item container xs={12} spacing={3}>
                {/* head */}
                <Grid item container xs={12}>
                  {/* icon */}
                  <Grid item container justifyContent='flex-start' xs={1}>
                    <UserIcon className={classes.iconStyle} />
                  </Grid>
                  {/* title */}
                  <Grid
                    item
                    container
                    xs={7}
                    className={classes.locationBoxTitle}>
                    I miei indirizzi salvati:
                  </Grid>
                  <Grid item container justifyContent='center' xs={4} />
                </Grid>
                {/* location body */}
                <Grid item container xs={12}>
                  {/* info */}
                  <Grid
                    item
                    container
                    xs={12}
                    className={classes.savedLocation}>
                    {/* offset */}
                    <Grid item container xs={1}></Grid>
                    {/* info */}
                    <Grid
                      item
                      container
                      justifyContent='center'
                      xs={11}
                      className={selectedLocation && classes.boldOnSelection}>
                      <Grid item container xs={10}>
                        <Grid item xs={12}>
                          Via Num, CAP, CITTA’
                        </Grid>
                        <Grid item xs={12} style={{ opacity: "0.5" }}>
                          Username-Tel.
                        </Grid>
                      </Grid>
                      {/* check icon */}
                      <Grid item container xs={2}>
                        <CheckCircleIcon />
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* hr */}
                  <Grid item container xs={12}>
                    <Grid item container xs={1}></Grid>
                    <Grid item xs={11}>
                      <hr className={classes.customHrSm} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container item xs={12} style={{ paddingTop: "25px" }}>
              <CustomButton
                label="CONFERMA L'INDIRIZZO"
                alterStyle={classes.customBtnStyle}
              />
            </Grid>
          </Grid>
        </Container>
      </CustomModal>
      {/* new location modal */}
      <CustomModal
        show={showNewAddr === true}
        handleClose={() => setShowNewAddr(false)}>
        <Container>
          <Grid container item xs={12}>
            <AddrSelHeader
              title='Inserisci il tuo indirizzo'
              goBack={() => setShowNewAddr(false)}
              showInput={false}
            />
            <Grid item xs={12}>
              <MapContainer btnLabel="CONFERMA L'INDIRIZZO" />
            </Grid>
            {/* <Grid container item xs={12} style={{ paddingTop: "30px" }}>
              <CustomButton
                label="CONFERMA L'INDIRIZZO"
                alterStyle={classes.customBtnStyle}
              />
            </Grid> */}
          </Grid>
        </Container>
      </CustomModal>
    </>
  );
}

function AddrSelHeader({ title, goBack = null, handleAdd, showInput = true }) {
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
      {showInput && (
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
      )}
    </>
  );
}
