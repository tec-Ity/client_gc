import React from "react";
import {
  makeStyles,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import DoneIcon from "@material-ui/icons/Done";

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
    height:'30px',
    '&:hover':{
        background:'transparent'
    }
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

  return (
    <OutlinedInput
      classes={{ root: classes.root }}
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      placeholder={placeholder}
      endAdornment={<EndADM iconType={iconType} handleFunc={handleFunc} />}
    />
  );
}

const EndADM = ({ iconType, handleFunc }) => {
  const classes = useStyle();
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
    <InputAdornment position='end'>
      <IconButton
        classes={{ root: classes.endAdornmentStyle }}
        onClick={handleFunc}
        onMouseDown={(e) => e.preventDefault()}
        edge='end'>
        {getIcon(iconType)}
      </IconButton>
    </InputAdornment>
  );
};
