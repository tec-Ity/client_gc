import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { setShowAddrSel } from "../../../redux/curClient/curClientSlice";
import { InputAdornment, OutlinedInput } from "@material-ui/core";
import { ReactComponent as ArrowDown } from "../../icon/chevron-down.svg";
import { ReactComponent as Pin } from "../../icon/mapInsertLocation.svg";

export default function NavAddr() {
  const dispatch = useDispatch();
  const view = useSelector((state) => state.root.view);
  const userSelectedLocation = useSelector(
    (state) => state.curClient.userSelectedLocation
  );
  console.log(userSelectedLocation);
  const comps = {
    web: UIWeb,
    mobile: UIMobile,
  };
  const address = {
    deliverToMsg: "Consegna a:",
    onClick: () => dispatch(setShowAddrSel(true)),
    addrInfo: (
      <>
        <div>{userSelectedLocation?.addr?.slice(0, 30) + "..."}</div>
        <div>
          <ArrowDown />
        </div>
      </>
    ),
    selector: "",
  };
  const Comps = comps[view];
  return (
    <Comps address={address} userSelectedLocation={userSelectedLocation} />
  );
}

const useStyle = makeStyles({
  //addr sectionHeader
  addrBoxWeb: {
    marginLeft: "60px",
    minWidth: "235px",
    // consegna a
    "& > :nth-child(1)": {
      fontWeight: "600",
      fontSize: "12px",
    },
    // addr + icon
    "& > :nth-child(2)": {
      cursor: "pointer",
      display: "flex",
      // addr
      "& > :nth-child(1)": { fontSize: "15px" },
      //icon box
      "& > :nth-child(2)": {
        // icon
        display: "flex",
        alignItems: "center",
        "& > :nth-child(1)": { height: "18px", width: "18px" },
      },
    },
  },
  addrBoxMobile: {
    height: "100%",
    display: "flex",
    fontSize: "12px",
    justifyContent: "center",
    alignItmes: "center",
    fontFamily: "Montserrat",
    "& > div": {
      display: "flex",
      alignItems: "center",
    },
  },
  addrInput: {
    marginLeft: "20px",
    height: "28px",
    width: "100%",
    maxWidth: "250px",
    backgroundColor: "#fff",
    fontFamily: "Montserrat",
    borderRadius: "14px 14px 14px 0px",
    paddingLeft: "10px",
    fontSize: "12px",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "1.5px solid #c0e57b",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#E47F10",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderWidth: "2px",
      borderColor: "#E47F10",
    },
  },
  pinIcon: {
    height: "17px",
    width: "17px",
    "& path": {
      fill: "#c0e57b",
    },
  },
});

function UIWeb({ address, userSelectedLocation }) {
  const classes = useStyle();
  console.log(address);
  return (
    <div className={classes.addrBoxWeb}>
      <div>{address.deliverToMsg}</div>
      <div onClick={address.onClick}>
        {userSelectedLocation ? (
          address.addrInfo
        ) : (
          <div>Scegli il tuo indirizzo</div>
        )}
      </div>
    </div>
  );
}

function UIMobile({ address, userSelectedLocation }) {
  const classes = useStyle();
  return (
    <div className={classes.addrBoxMobile}>
      <div>{address.deliverToMsg}</div>
      <div onClick={address.onClick}>
        {userSelectedLocation ? (
          address.addrInfo
        ) : (
          <OutlinedInput
            classes={{ root: classes.addrInput }}
            placeholder="Qual è il tuo indirizzo?"
            endAdornment={<Pin className={classes.pinIcon} />}
          />
        )}
      </div>
    </div>
  );
}
