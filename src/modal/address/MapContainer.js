import React, { useState } from "react";
//map
import {
  GoogleMap,
  //   useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
// import mapIcon from "../../component/icon/pin.svg";
//place
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import mapStyle from "../../mapStyle";
import moment from "moment";
import { InputAdornment, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { ReactComponent as Pin } from "../../component/icon/mapInsertLocation.svg";
import userPin from "../../component/icon/map_user.svg";
import { makeStyles } from "@material-ui/core/styles";
import CustomButton from "../../component/global/modal/component/CustomButton";
import InputModify from "../../component/input/InputModify";
//parameters avoid re-render for <GoogleMap>
// const libraries = ["places"];

const center = {
  lat: 45.483602659991114,
  lng: 9.189416277420541,
};
const options = {
  styles: mapStyle,
  disableDefaultUI: true,
  zoomControl: true,
};
const useStyle = makeStyles({
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
});
export default function MapContainer(props) {
  const {
    inputStyle,
    getSelectedLocation,
    btnLabel,
    mapSize = null,
    isUpdate,
    updateAddr,
  } = props;
  const [selected, setSelected] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [addrDetailToPass, setAddrDetailToPass] = useState({
    note: isUpdate && updateAddr.note ? updateAddr.note : "",
  });

  const mapContainerStyle = {
    width: mapSize?.width ? mapSize.width : "100%",
    height: mapSize?.height ? mapSize.height : "270px",
    marginTop: "22px",
  };

  //   //func in r-g-m
  //   const { isLoaded, loadError } = useLoadScript({
  //     googleMapsApiKey: "AIzaSyBGjEZfiy-qg-pIE4g_uFHxMGEkALwDc5c",
  //     libraries, //put library outside compmponent to avoid unnacessary rerenders
  //   });

  //set pin marker
  //   const onMapClick = React.useCallback(
  //     (event) =>
  //       setMarkers((prev) => [
  //         ...prev,
  //         {
  //           lat: event.latLng.lat(),
  //           lng: event.latLng.lng(),
  //           time: new Date(),
  //         },
  //       ]),
  //     []
  //   );

  //assign ref on mapload only onece prevent re-rendering
  const mapRef = React.useRef(null);
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  //locate address on map
  const panTo = React.useCallback(async ({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
    setUserLocation({ lat, lng, time: new Date(), type: "user" });
    const result = await getGeocode({
      location: { lat, lng },
    });
    setAddrDetailToPass((prev) => ({
      ...prev,
      location: result[0],
    }));
    //   getSelectedLocation({ lat, lng, location: result[0] });
  }, []);

  //   if (loadError) return "Error loading maps";
  //   if (!isLoaded) return "Loading Maps";

  return (
    <>
      {/* search box */}
      <Search panTo={panTo} style={inputStyle} updateAddr={updateAddr} />

      {/* locate user location */}
      {/* <Locate panTo={panTo} /> */}

      {/* map entity */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        options={options}
        // onClick={onMapClick}
        onLoad={onMapLoad}>
        {/* markers */}
        {markers.map((marker) => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => setSelected(marker)}
            icon={{
              url: Pin,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(20, 20),
              scaledSize: new window.google.maps.Size(40, 40),
            }}
          />
        ))}
        {userLocation && (
          <Marker
            key={userLocation.time.toISOString()}
            position={{ lat: userLocation.lat, lng: userLocation.lng }}
            onClick={() => setSelected(userLocation)}
            icon={{
              url: userPin,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(20, 20),
              scaledSize: new window.google.maps.Size(40, 40),
            }}
          />
        )}
        {/* pop window when click marker */}
        {selected && (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => setSelected(null)}>
            {selected.type === "user" ? (
              <div>You are here</div>
            ) : (
              <div>
                <h2>Shop Is Here</h2>
                <p>{moment(selected.time).format("MM/DD/YYYY")}</p>
              </div>
            )}
          </InfoWindow>
        )}
      </GoogleMap>
      {/* addtional information ex scala numCivico */}
      <div style={{ marginTop: "20px" }}>
        <InputModify
          placeholder='Scala / porta / indicazione ecc...'
          value={addrDetailToPass.note}
          handleChange={(note) =>
            setAddrDetailToPass((prev) => ({ ...prev, note }))
          }
        />
      </div>
      <div style={{ marginTop: "20px" }}>
        <CustomButton
          label={btnLabel}
          handleFunc={() => {
            // hook function from parent component to retreve address data
            getSelectedLocation(addrDetailToPass);
          }}
        />
      </div>
    </>
  );
}
// {/* locate user location */}
// function Locate({ panTo }) {
//   return (
//     <button
//       style={{ zIndex: 10 }}
//       onClick={() =>
//         navigator.geolocation.getCurrentPosition(async (pos) => {
//           // console.log(pos);
//           panTo({ lat: pos.coords.latitude, lng: pos.coords.longitude });
//           const result = await getGeocode({
//             location: { lat: pos.coords.latitude, lng: pos.coords.longitude },
//           });
//           // console.log("geo", result);
//           const shortName = result[0].address_components.find((address) =>
//             address.types.find((type) => type === "administrative_area_level_2")
//           ).short_name;
//           console.log(shortName);
//         })
//       }>
//       <img src='../component/icon/user.svg' alt='User' />
//     </button>
//   );
// }

// {/* search box input */}
function Search({ panTo, style, updateAddr }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 45.483602659991114, lng: () => 9.189416277420541 },
      radius: 200 * 1000, //200KM
    },
  });
  const classes = useStyle();
  //   console.log(status);
  //   console.log(value);
  //   console.log(data[0]);
  const options = data.map((d) => {
    // console.log(d);
    return d.description;
  });

  React.useEffect(() => {
    async function preSetUpdateAddress() {
      if (updateAddr) {
        setValue(updateAddr.address);
        const result = await getGeocode({ address: updateAddr.address });
        // console.log(result);
        const { lat, lng } = await getLatLng(result[0]);
        panTo({ lat, lng });
      }
    }
    preSetUpdateAddress();
  }, [panTo, setValue, updateAddr, value]);

  //   console.log(options);
  return (
    <Autocomplete
      disablePortal
      ListboxProps={{ style: { fontFamily: "Montserrat" } }}
      style={{ fontFamily: "Montserrat" }}
      autoHighlight
      id='places-autocomplete'
      onChange={async (e, value) => {
        try {
          if (status === "OK") {
            // console.log(value);
            setValue(value, false); //set the user selection without calling API
            const result = await getGeocode({ address: value });
            // console.log(result);
            const { lat, lng } = await getLatLng(result[0]);
            panTo({ lat, lng });
            clearSuggestions();
          }
        } catch (error) {
          console.log(error);
        }
      }}
      filterOptions={(x) => x}
      options={options}
      sx={{ width: 300 }}
      inputValue={value || ""}
      onInputChange={(e, value) => setValue(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          size='small'
          classes={{ root: classes.inputStyle }}
          variant='outlined'
          placeholder='Qual è il tuo indirizzo?'
          disabled={!ready}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position='end'>
                <Pin className={classes.pinStyle} />
              </InputAdornment>
            ),
            style: { fontFamily: "Montserrat" },
          }}>
          {/* {console.log(params)} */}
        </TextField>
      )}
    />
  );
}
