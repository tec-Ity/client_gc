import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { get_Prom } from "../../api";
import {
  InputAdornment,
  InputLabel,
  FormControl,
  OutlinedInput,
  Select,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "95%",
  },
  noBorderColor: {
    "&:before": {
      borderColor: "white",
    },
    "&:after": {
      borderColor: "white",
    },
  },
}));

export default function InputAccount(props) {
  const { showPhonePre, phonePre, account, handleChange } = props;
  const [nations, setNations] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    async function getNation() {
      const result = await get_Prom("/Nations");
      const nations = result.data.objects;
      setNations(nations);
    }

    getNation();
  }, []);

  return (
    <FormControl
      className={clsx(classes.margin, classes.textField)}
      variant='outlined'>
      <InputLabel htmlFor='input-account-label'>Code/Email/Phone</InputLabel>
      <OutlinedInput
        id='input-account-label'
        type='text'
        value={account}
        onChange={handleChange("account")}
        startAdornment={
          showPhonePre === true && (
            <InputAdornment position='start'>
              <FormControl>
                <Select
                  className={classes.noBorderColor}
                  labelId='country-select-label'
                  id='country-select'
                  value={phonePre}
                  onChange={handleChange("phonePre")}
                  label='Age'>
                  <MenuItem value=''>--请选择区号--</MenuItem>
                  {nations.map((nation) => {
                    return (
                      <MenuItem value={nation.tel} key={nation._id}>
                        {"+" + nation.tel.substring(2)}
                      </MenuItem>
                    );
                  })}
                  <MenuItem value={10}>ten</MenuItem>
                </Select>
              </FormControl>
            </InputAdornment>
          )
        }
        labelWidth={140}
      />
    </FormControl>
  );
}
