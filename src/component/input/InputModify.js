import React from "react";
import { makeStyles, OutlinedInput } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import DoneIcon from "@material-ui/icons/Done";
const useStyle = makeStyles({
  root: {
    width: "100%",
    // maxWidth: "413px",
    height: "30px",
    fontFamily: "Montserrat",
    borderRadius: "15.625px 15.625px 15.625px 0px",
    fontWeight: "700",

    "& .MuiOutlinedInput-notchedOutline": {
      //   border: "1px solid",
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
});

export default function InputModify(props) {
  const classes = useStyle();
  const {
    value = "",
    handleChange,
    handleFunc,
    iconType = null,
    placeholder = "",
  } = props;
  const getIcon = (type) => {
    switch (type) {
      case "edit":
        return <EditIcon />;
      case "add":
        return <AddIcon />;
      case "done":
        return <DoneIcon />;
      default:
        break;
    }
  };
  return (
    <OutlinedInput
      classes={{ root: classes.root }}
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      placeholder={placeholder}
      endAdornment={
        <div style={{ color: "#c0e57b" }} onClick={handleFunc}>
          {getIcon(iconType)}
        </div>
      }
    />
  );
}
