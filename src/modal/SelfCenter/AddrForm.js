import { Grid } from "@material-ui/core";
import React from "react";
import CustomButton from "../../../component/global/modal/component/CustomButton";
import InputModify from "../../../component/input/InputModify";

export default function AddrForm(props) {
  const { addr, handleChange, handleSubmit } = props;

  return (
    <Grid container>
      {/* name
            addr + postcode + city +  state + country
            phone
            email
        */}
      {/* name */}
      <Grid item xs={12}>
        <InputModify
          label='name'
          value={addr?.firstname || ""}
          handleChange={(value) => handleChange("firstname", value)}
        />
      </Grid>
      {/* address */}
      <Grid item xs={12}>
        <InputModify
          label='address'
          value={addr?.address || ""}
          handleChange={(value) => handleChange("address", value)}
        />
      </Grid>
      {/* phone */}
      <Grid item xs={12}>
        <InputModify
          label='phone'
          value={addr?.phone || ""}
          handleChange={(value) => handleChange("phone", value)}
        />
      </Grid>
      {/* email */}
      <Grid item xs={12}>
        <InputModify
          label='email'
          value={addr?.email || ""}
          handleChange={(value) => handleChange("email", value)}
        />
      </Grid>
      <Grid item xs={12} style={{ paddingTop: "10px" }}>
        <CustomButton label='OK' handelFunc={() => handleSubmit("addr_post")} />
      </Grid>
    </Grid>
  );
}
