import React, { useState } from "react";
import {
  makeStyles,
  OutlinedInput,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
// import EditIcon from "@material-ui/icons/Edit";
// import AddIcon from "@material-ui/icons/Add";
// import DoneIcon from "@material-ui/icons/Done";
// import { Visibility, VisibilityOff } from "@material-ui/icons";
import { fetch_Prom } from "../../api";

const useStyle = makeStyles({
  root: {
    width: "100%",
    // maxWidth: "413px",
    height: "40px",
    fontFamily: "Montserrat",
    borderRadius: "100px 100px 100px 0px",
    // fontWeight: "700",

    "& .MuiOutlinedInput-notchedOutline": {
      border: "1.5px solid",
      borderColor: "#c0e57b",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#c0e57b",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderWidth: "2px",
      borderColor: "#c0e57b",
    },
  },
  endAdornmentStyle: {
    color: "#c0e57b",
    height: "30px",
    "&:hover": {
      background: "transparent",
    },
  },
});

export default function InputModifyPhonePre({
  value = "",
  handleChange,
  handleFunc,
  iconType = null, //edit|add|done|pwd
  placeholder = "",
  disabled = false,
}) {
  const classes = useStyle();
  const [nations, setNations] = React.useState([]);
  const [phonePre, setPhonePre] = useState("0039");

  React.useEffect(() => {
    async function getNation() {
      const result = await fetch_Prom("/Nations");
      const nations = result?.data?.objects;
      setNations(nations);
    }
    getNation();
  }, []);
  return (
    <OutlinedInput
      classes={{ root: classes.root }}
      value={value}
      disabled={disabled}
      onChange={(e) => handleChange(e.target.value)}
      placeholder={placeholder}
      startAdornment={
        <InputAdornment position='start'>
          <FormControl>
            <Select
              disableUnderline
              displayEmpty={false}
              labelId='country-select-label'
              id='country-select'
              value={phonePre}
              onChange={(e) => setPhonePre(e.target.value)}
              label='Age'>
              <MenuItem value=''>--请选择区号--</MenuItem>
              {nations?.map((nation) => {
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
      }
      //   endAdornment={
      //     <InputAdornment position='end'>
      //     <IconButton
      //       classes={{ root: classes.endAdornmentStyle }}
      //       onClick={handleFunc(phonePre)}
      //       onMouseDown={(e) => e.preventDefault()}
      //       edge='end'>
      //       <DoneIcon />
      //     </IconButton>
      //   </InputAdornment>
      //   }
    />
  );
}
