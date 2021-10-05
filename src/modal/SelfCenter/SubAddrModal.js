import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import InputModify from "../../component/input/InputModify";
import EmptyLogo from "../Component/EmptyLogo";
import MapContainer from "../address/MapContainer";
import { useDispatch } from "react-redux";
import { fetchPutCurClient } from "../../redux/curClient/curClientSlice";

export default function SubvAddrModal(props) {
  const { addr, handleChange, handleSubmit, showAddrAdd } = props;

  return showAddrAdd === true ? (
    // add new addr from map
    <AddrAddModal />
  ) : addr ? (
    // address list
    <>
      <Grid item></Grid>
      <Grid item></Grid>
    </>
  ) : (
    // empty
    <EmptyLogo
      type='user'
      label='INDIRIZZO VUOTO'
      text='Aggiungi il tuo indirizzo ora!'
    />
  );
}

export function AddrAddModal() {
  const dispatch = useDispatch();
  const [newAddr, setNewAddr] = useState({ nome: "", tel: "" });
  const handleChange = (section, value) => {
    setNewAddr((prev) => ({ ...prev, [section]: value }));
  };
  const handleSubmit = (address) => {
    console.log(address);
    const cityShortName = address?.location?.address_components?.find((addr) =>
      addr.types?.find((type) => type === "administrative_area_level_2")
    ).short_name;
    const postCode = address?.location?.address_components?.find((addr) =>
      addr.types?.find((type) => type === "postal_code")
    ).short_name;
    const formattedAddress = address?.location?.formatted_address;
    const value = {
      Cita: cityShortName,
      name: newAddr.nome,
      phone: newAddr.tel,
      address: formattedAddress,
      postcode: postCode,
      note: address?.note,
    };
    console.log(value);
    dispatch(fetchPutCurClient({ type: "addr_post", value }));

  };
  return (
    <>
      <Grid item style={{ width: "100%", marginBottom: "10px" }}>
        <InputModify
          placeholder='Il nome del destinatario'
          value={newAddr.nome}
          handleChange={(value) => handleChange("nome", value)}
        />
      </Grid>
      <Grid item style={{ width: "100%", marginBottom: "10px" }}>
        <InputModify
          placeholder='Num. di telefono del destinatario'
          value={newAddr.tel}
          handleChange={(value) => handleChange("tel", value)}
        />
      </Grid>
      <Grid item style={{ width: "100%" }}>
        <MapContainer
          mapSize={{ height: "230px" }}
          btnLabel='OK'
          getSelectedLocation={handleSubmit}
        />
      </Grid>
    </>
  );
}
