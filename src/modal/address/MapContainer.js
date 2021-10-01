import React from "react";
//map
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import mapIcon from "../../component/icon/pin.svg";
//place
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import mapStyle from "../../mapStyle";
import moment from "moment";
import { TextField, Autocomplete } from "@material-ui/core";

//parameters avoid re-render for <GoogleMap>
const libraries = ["places"];
const mapContainerStyle = { width: "100vw", height: "90vh" };
const center = {
  lat: 45.483602659991114,
  lng: 9.189416277420541,
};
const options = {
  styles: mapStyle,
  disableDefaultUI: true,
  zoomControl: true,
};
export default function MapContainer() {
  const [selected, setSelected] = React.useState(null);
  const [markers, setMarkers] = React.useState([]);

  //func in r-g-m
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBGjEZfiy-qg-pIE4g_uFHxMGEkALwDc5c",
    libraries, //put library outside compmponent to avoid unnacessary rerenders
  });
  //set pin marker
  const onMapClick = React.useCallback(
    (event) =>
      setMarkers((prev) => [
        ...prev,
        {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
          time: new Date(),
        },
      ]),
    []
  );

  //assign ref on mapload only onece prevent re-rendering
  const mapRef = React.useRef(null);
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  //locate address on map
  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <>
      <h1 style={{ position: "absolute", top: "100px", left: 0, zIndex: 10 }}>
        Union City
        <span role='img' aria-label='emoji'></span>
      </h1>
      {/* search box */}
      <Search panTo={panTo} />

      {/* locate user location */}
      <Locate panTo={panTo} />

      {/* map entity */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}>
        {/* markers */}
        {markers.map((marker) => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => setSelected(marker)}
            icon={{
              url: mapIcon,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(20, 20),
              scaledSize: new window.google.maps.Size(40, 40),
            }}
          />
        ))}

        {/* pop window when click marker */}
        {selected && (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => setSelected(null)}>
            <div>
              <h2>Shop Is Here</h2>
              <p>{moment(selected.time).format("MM/DD/YYYY")}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </>
  );
}
// {/* locate user location */}
function Locate({ panTo }) {
  return (
    <button
      style={{ position: "absolute", top: "100px", left: "60%", zIndex: 10 }}
      onClick={() =>
        navigator.geolocation.getCurrentPosition(async (pos) => {
          // console.log(pos);
          panTo({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          const result = await getGeocode({
            location: { lat: pos.coords.latitude, lng: pos.coords.longitude },
          });
          // console.log("geo", result);
          const shortName = result[0].address_components.find((address) =>
            address.types.find((type) => type === "administrative_area_level_2")
          ).short_name;
          console.log(shortName);
        })
      }>
      <img src='../component/icon/user.svg' alt='User' />
    </button>
  );
}

// {/* search box input */}
function Search({ panTo }) {
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
  return (
    <div
      style={{
        position: "absolute",
        top: "100px",
        left: "30%",
        transform: "translationX(-50%)",
        width: "100%",
        maxwidth: "400px",
        zIndex: 10,
      }}>
      <Autocomplete
        disablePortal
        // autoComplete
        autoHighlight
        id='places-autocomplete'
        onChange={async (e, value) => {
          try {
            if (status === "OK") {
              console.log(value);
              setValue(value, false); //set the user selection without calling API
              const result = await getGeocode({ address: value });
              console.log(result);
              const { lat, lng } = await getLatLng(result[0]);
              panTo({ lat, lng });
              clearSuggestions();
            }
          } catch (error) {
            console.log(error);
          }
        }}
        options={status === "OK" ? data.map((d) => d.description) : []}
        sx={{ width: 300 }}
        inputValue={value || ""}
        onInputChange={(e, value) => setValue(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant='outlined'
            label='Enter your address'
            disabled={!ready}
          />
        )}
      />
      {console.log()}
    </div>
  );
}
