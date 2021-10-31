import React, { useState } from "react";
import CustomModal from "../../component/global/modal/CustomModal";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCurClientInfo,
  setShowAddrSel,
  setUserCurCity,
  setUserCurLocation,
  setUserSelectedLocation,
} from "../../redux/curClient/curClientSlice";
import { Grid, Container } from "@material-ui/core";
// import { ReactComponent as Pin } from "../../component/icon/mapInsertLocation.svg";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as BackArrow } from "../../component/icon/chevron-left.svg";
import CustomHr from "../../component/global/modal/component/CustomHr";
import CustomButton from "../../component/global/modal/component/CustomButton";
import MapContainer, { Search } from "./MapContainer";
import { getGeocode } from "use-places-autocomplete";
import { ReactComponent as CurLocationIcon } from "../../component/icon/currentLocation.svg";
import { ReactComponent as LocateIcon } from "../../component/icon/locate.svg";
import { ReactComponent as UserIcon } from "../../component/icon/user.svg";
import { ReactComponent as CheckCircleIcon } from "../../component/icon/check-circle.svg";
import { useHistory } from "react-router";

const useStyle = makeStyles({
  root: { fontFamily: "Montserrat", color: "#1d1d38" },
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
    // border: "1px solid",
    marginTop: "22px",
    height: "325px",
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
  //addr list item style
  savedLocation: {
    padding: "5px 0",
    "& div": { fontSize: "15px" },
    "&:hover": {
      cursor: "pointer",
      background:
        "linear-gradient(270deg, rgba(145, 232, 179, 0.3) 0%, rgba(192, 229, 123, 0.3) 100%, rgba(192, 229, 123, 0.3) 100%)",
      borderRadius: "100px 100px 100px 0",
    },
  },
  selSavedLocation: {
    fontWeight: "600",
    padding: "5px 0",
    "& div": { fontSize: "15px" },
    "&:hover": {
      cursor: "pointer",
    },
    background:
      " linear-gradient(270deg, #91E8B3 0%, #C0E57B 100%, #C0E57B 100%)",
    borderRadius: "100px 100px 100px 0",
  },
  selectedIcon: {
    height: "21px",
    width: "21px",
    "& path": { fill: "#1d1d38" },
  },
  //bold on selection icon
  boldOnSelection: {
    fontWeight: "600",
  },
  //custom compo
  customHr: { width: "100%", marginRight: "0", marginLeft: "0" },
  customHrSm: { color: "#1d1d38", opacity: "0.5" },
  customBtnStyle: {
    fontSize: "14px",
    height: "30px",
  },
});

export default function AddrSelModal() {
  const classes = useStyle();
  const dispatch = useDispatch();
  const hist = useHistory();
  // show addr new modal
  const [showNewAddr, setShowNewAddr] = useState(false);
  //store addr._id or 'current' to apply onSelect style
  const [selectedLocation, setSelectedLocation] = useState(null);
  // used for store in the localStorage and display on the nav bar
  const [selectedAddr, setSelectedAddr] = useState(null);
  // city code passed to redux used to sort shops and control disable confirm button
  const [curCity, setCurCity] = useState(null);
  //   name and phone for the selected existing address
  const [curZip, setCurZip] = useState(null);
  const [personalInfo, setPersonalInfo] = useState();
  //global var to open this modal
  const showAddrSel = useSelector((state) => state.curClient.showAddrSel);
  const curClientAddrs = useSelector(
    (state) => state.curClient.curClientInfo?.addrs
  );
  const curClientInfoStatus = useSelector(
    (state) => state.curClient.curClientInfoStatus
  );
  // user GPS
  const userCurLocation = useSelector(
    (state) => state.curClient.userCurLocation
  );
  const getCurrentPosition = React.useCallback(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      //   console.log(pos);
      const result = await getGeocode({
        location: {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        },
      });
      //   console.log("geo", result);
      const shortName = result[0].address_components.find((address) =>
        address.types.find((type) => type === "administrative_area_level_2")
      ).short_name;
      //   console.log(shortName);
      dispatch(
        setUserCurLocation({
          addr: result[0]?.formatted_address,
          city: shortName,
        })
      );
      // dispatch(setUserCurCity(shortName));
    });
  }, [dispatch]);

  React.useEffect(() => {
    curClientInfoStatus === "idle" && dispatch(fetchCurClientInfo());
  }, [curClientInfoStatus, dispatch]);

  //called when address selected from current location, saved location, and searched location
  const handleSubmitSelAddr = React.useCallback(
    //address is either formated address or google api address
    (address) => {
      dispatch(setShowAddrSel(false));
      console.log(address);
      //   console.log(selectedAddr);

      //if address has location key,
      //extract city, address, and zip from google api
      const cityShortName = address?.location?.address_components?.find(
        (addr) =>
          addr.types?.find((type) => type === "administrative_area_level_2")
      ).short_name;
      const zipFromGoogle = address?.location?.address_components?.find(
        (addr) => addr.types?.find((type) => type === "postal_code")
      ).short_name;

      const formattedAddress = address?.location?.formatted_address;

      //use either data from api or selected addresses
      dispatch(setUserCurCity(curCity || cityShortName));
      dispatch(
        setUserSelectedLocation({
          addr: formattedAddress || selectedAddr,
          city: curCity || cityShortName,
          zip: curZip || zipFromGoogle,
          personalInfo,
        })
      );

      localStorage.setItem(
        "userSelAddr",
        JSON.stringify({
          addr: selectedAddr || formattedAddress,
          city: curCity || cityShortName,
          personalInfo,
        })
      );
      hist.push("/city");
    },
    [curCity, curZip, dispatch, hist, personalInfo, selectedAddr]
  );

  return (
    <>
      {/* selection modal */}
      <CustomModal
        timeout={0}
        show={showNewAddr === false && showAddrSel === true}
        handleClose={() => dispatch(setShowAddrSel(false))}
      >
        <Container>
          <Grid container className={classes.root}>
            <AddrSelHeader
              title="Scegli il tuo indirizzo"
              handleAdd={() => setShowNewAddr(true)}
            />
            {/* locations section */}
            <Grid
              container
              item
              alignItems="flex-start"
              alignContent="flex-start"
              justifyContent="center"
              className={classes.locationBox}
            >
              {/* current location */}
              <Grid item container xs={12}>
                {/* head */}
                <Grid item container xs={12} style={{ marginBottom: "15px" }}>
                  <Grid item container justifyContent="flex-start" xs={1}>
                    <CurLocationIcon className={classes.iconStyle} />
                  </Grid>
                  <Grid
                    item
                    container
                    xs={7}
                    className={classes.locationBoxTitle}
                  >
                    La tua posizione attuale
                  </Grid>
                  <Grid item container justifyContent="flex-end" xs={4}>
                    <div
                      onClick={getCurrentPosition}
                      className={classes.locateButton}
                    >
                      <LocateIcon className={classes.locateButtonIconStyle} />
                      Localizzare
                    </div>
                  </Grid>
                </Grid>
                {/* location body */}
                <Grid
                  item
                  container
                  xs={12}
                  className={
                    userCurLocation &&
                    (selectedLocation === "current"
                      ? classes.selSavedLocation
                      : classes.savedLocation)
                  }
                  onClick={() => {
                    userCurLocation && setSelectedLocation("current");
                    setCurCity(userCurLocation?.city);
                    setCurZip(userCurLocation?.zip);
                    setSelectedAddr(userCurLocation?.addr);
                  }}
                >
                  {/* offset  */}
                  <Grid item container xs={1} />
                  {/* current location  */}
                  <Grid item container xs={11}>
                    {userCurLocation
                      ? userCurLocation.addr
                      : "Please get current location"}
                  </Grid>
                </Grid>
              </Grid>
              {/* hr */}
              <Grid item container xs={12}>
                <CustomHr position={classes.customHr} />
              </Grid>
              {/* -------------------------saved locations ------------------------- */}
              <Grid item container xs={12}>
                {/* head */}
                <Grid item container xs={12} style={{ marginBottom: "15px" }}>
                  {/* icon */}
                  <Grid item container justifyContent="flex-start" xs={1}>
                    <UserIcon className={classes.iconStyle} />
                  </Grid>
                  {/* title */}
                  <Grid
                    item
                    container
                    xs={7}
                    className={classes.locationBoxTitle}
                  >
                    I miei indirizzi salvati:
                  </Grid>
                  <Grid item container justifyContent="center" xs={4} />
                </Grid>
                {/* location body */}
                <Grid item container xs={12}>
                  {/* {console.log(curClientAddrs)} */}
                  {curClientAddrs
                    ? curClientAddrs.map((addr) => (
                        <AddrListItem
                          key={addr._id}
                          selectedLocation={selectedLocation}
                          addr={addr}
                          handleClick={(setNew) => {
                            console.log(addr);
                            if (setNew) {
                              setSelectedLocation(addr._id);
                              setCurCity(addr.Cita?.code);
                              setSelectedAddr(addr.address);
                              setCurZip(addr.postcode);
                              setPersonalInfo({
                                name: addr.name,
                                phone: addr.phone,
                              });
                            } else {
                              setSelectedLocation(null);
                              setCurCity(null);
                              setSelectedAddr(null);
                              setPersonalInfo(null);
                              setCurZip(null);
                            }
                          }}
                        />
                      ))
                    : "Non ci sono indirizzi salvati."}
                </Grid>
              </Grid>
            </Grid>
            {/* confirm address btn */}
            <Grid container item xs={12} style={{ paddingTop: "25px" }}>
              <CustomButton
                disableBtn={!curCity}
                label="CONFERMA L'INDIRIZZO"
                alterStyle={classes.customBtnStyle}
                handleFunc={handleSubmitSelAddr}
              />
            </Grid>
          </Grid>
        </Container>
      </CustomModal>
      {/*------------------------ new location modal ---------------------- */}
      <CustomModal
        show={showNewAddr === true}
        timeout={0}
        handleClose={() => setShowNewAddr(false)}
      >
        <Container>
          <Grid container item xs={12}>
            <AddrSelHeader
              title="Inserisci il tuo indirizzo"
              goBack={() => setShowNewAddr(false)}
              showInput={false}
            />
            <Grid item xs={12}>
              <MapContainer
                btnLabel="CONFERMA L'INDIRIZZO"
                getSelectedLocation={handleSubmitSelAddr}
              />
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
        justifyContent="center"
        className={classes.titleStyle}
      >
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
          justifyContent="center"
          onClick={handleAdd}
          className={classes.inputRowStyle}
        >
          <Search disabled />
        </Grid>
      )}
    </>
  );
}

function AddrListItem({ selectedLocation, addr, handleClick }) {
  const classes = useStyle();
  return (
    <>
      {/* info */}
      <Grid
        item
        container
        xs={12}
        className={
          selectedLocation === addr._id
            ? classes.selSavedLocation
            : classes.savedLocation
        }
        onClick={() => {
          selectedLocation === addr._id ? handleClick() : handleClick(true); //setNew === ture
        }}
      >
        {/* offset */}
        <Grid item container xs={1}></Grid>
        {/* info */}
        <Grid item container justifyContent="center" xs={11}>
          <Grid item container xs={10}>
            <Grid item xs={12}>
              {addr.address}
            </Grid>
            <Grid item xs={12} style={{ opacity: "0.5" }}>
              {addr.name} - {addr.phone}
            </Grid>
          </Grid>
          {/* check icon */}
          <Grid
            item
            container
            xs={2}
            justifyContent="center"
            alignItems="center"
          >
            {selectedLocation === addr._id && (
              <CheckCircleIcon className={classes.selectedIcon} />
            )}
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
    </>
  );
}
