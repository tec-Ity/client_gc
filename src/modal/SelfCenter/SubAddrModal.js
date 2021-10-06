import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import InputModify from "../../component/input/InputModify";
import EmptyLogo from "../Component/EmptyLogo";
import MapContainer from "../address/MapContainer";
import { useDispatch, useSelector } from "react-redux";
import { fetchPutCurClient } from "../../redux/curClient/curClientSlice";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as Pen } from "../../component/icon/pen-edit.svg";
import AddButton from "../Component/AddButton";
import CustomHr from "../../component/global/modal/component/CustomHr";

const useStyle = makeStyles({
  root: {},
  scrollBox: {
    overflowY: "scroll",
    overflowX: "hidden",
    "&::-webkit-scrollbar": { display: "none" },
    maxHeight: "390px",
  },
  defaultAddrRow: {
    color: "#1d1d38",
    boxSizing: "border-box",
    // border: "1px solid",
    width: "100%",
    height: "100px",
    padding: "14px 20px",
    paddingRight: "10px",
    boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px 10px 10px 0",
    // "& div": { border: "1px solid" },
  },
  nameRow: {
    "& > :nth-child(1)": {
      fontWeight: "700",
    },
    display: "flex",
    justifyContent: "space-between",
  },
  addrRow: { fontSize: "12px", paddingTop: "10px", lineHeight: "20px" },
  noteRow: { fontSize: "12px" },
  pointer: {
    "&:hover": { cursor: "pointer" },
  },
  penIconStyle: {
    "& path": { stroke: "#91e8b3" },
  },
  tagBox: {
    position: "absolute",
    right: "-15px",
    // bottom:0
  },
  tag: {
    height: "24px",
    width: "50px",
    backgroundColor: "#91e8b3",
    color: "#1b1b38",
    borderRadius: "5.52273px 0px 0px 0px",
    boxShadow: "1px 2px 3px rgba(0, 0, 0, 0.2) ",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "700",
  },
  tagFoot: {
    position: "absolute",
    right: "0",
    // bottom:'1px',
    boxSizing: "border-box",
    height: "0",
    width: "0",
    borderLeft: " 4px solid transparent",
    borderRight: " 4px solid transparent",
    borderBottom: " 4px solid #1d1d38",
    transform: "rotate(-45deg )",
  },
  listItemAddrRow: {
    marginTop: "14px",
    marginLeft: "20px",
    marginRight: "11px",
  },
  customHr: { width: "100%", margin: "0", marginTop: "22.5px" },
});
export default function SubAddrModal(props) {
  const { addrs, showAddrAdd, openUpdate, closeUpdate } = props;
  const classes = useStyle();
  const dispatch = useDispatch();
  const curClientInfoStatus = useSelector(
    (state) => state.curClient.curClientInfoStatus
  );
  const [updateAddr, setUpdateAddr] = useState(null);
  const [justSubmitted, setJustSubmitted] = useState(false);
  const handleSortAddr = (addrId) => () => {};

  // show edit addr modal (new addr modal with address)
  const handleOpenEditAddr = (addr) => () => {
    setUpdateAddr(addr);
    openUpdate();
  };

  // delete address
  const handleDeleteAddr = (addrId) =>()=> {
    dispatch(fetchPutCurClient({ type: "addr_del", value: { addrId } }));
  };

  // used for closing addr detail modal after update 'success'
  React.useEffect(() => {
    if (justSubmitted && curClientInfoStatus === "succeed") {
      closeUpdate();
      setUpdateAddr(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curClientInfoStatus, justSubmitted]);

  return showAddrAdd === true ? (
    updateAddr ? (
      // update addr modal
      <AddrAddModal
        addr={updateAddr}
        resetAddr={() => setUpdateAddr(null)}
        setJustSubmitted={(val) => setJustSubmitted(val)}
        handleDeleteAddr={(id) => handleDeleteAddr(id)}
      />
    ) : (
      // add new addrs from map
      <AddrAddModal
        setJustSubmitted={(val) => setJustSubmitted(val)}
        handleDeleteAddr={(id) => handleDeleteAddr(id)}
      />
    )
  ) : addrs ? (
    // address list
    <>
      {addrs.length > 0 && (
        <DefaultAddr addr={addrs[0]} handleOpenEditAddr={handleOpenEditAddr} />
      )}
      <Grid container className={classes.scrollBox}>
        {addrs.map(
          (addr, index) =>
            index > 0 && (
              <ListItemAddr
                key={addr._id}
                addr={addr}
                handleSortAddr={handleSortAddr}
                handleOpenEditAddr={handleOpenEditAddr}
                handleDeleteAddr={(id) => handleDeleteAddr(id)}

              />
            )
        )}
      </Grid>
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

//the top & defualt address
function DefaultAddr(props) {
  const { addr, handleOpenEditAddr } = props;
  const classes = useStyle();
  return (
    <Grid container item className={classes.defaultAddrRow}>
      <Grid container item xs={6} className={classes.nameRow}>
        <div>{addr.name?.toUpperCase()}</div>
        <div>{addr.phone}</div>
      </Grid>
      <Grid container item xs={12} className={classes.addrRow}>
        {addr.address}
      </Grid>
      <Grid container item xs={12} className={classes.noteRow}>
        <Grid item xs={10}>
          <div>{addr.note}</div>
        </Grid>
        <Grid
          item
          xs={1}
          className={classes.pointer}
          onClick={handleOpenEditAddr(addr)}>
          <Pen className={classes.penIconStyle} />
        </Grid>
        <Grid item xs={1} style={{ position: "relative" }}>
          <div className={classes.tagBox}>
            <div className={classes.tag}>
              <div>ORA</div>
            </div>
            <div className={classes.tagFoot}></div>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}

//address other than default
function ListItemAddr(props) {
  const { addr, handleOpenEditAddr, handleDeleteAddr } = props;
  const classes = useStyle();

  return (
    <>
      <Grid item xs={12}>
        <CustomHr position={classes.customHr} />
      </Grid>
      <Grid container item className={classes.listItemAddrRow}>
        <Grid container item xs={6} className={classes.nameRow}>
          <div>{addr.name?.toUpperCase()}</div>
          <div>{addr.phone}</div>
        </Grid>
        <Grid container item xs={12} className={classes.addrRow}>
          {addr.address}
        </Grid>
        <Grid container item xs={12} className={classes.noteRow}>
          <Grid item xs={10}>
            <div>{addr.note}</div>
          </Grid>
          <Grid
            item
            xs={1}
            container
            alignItems='flex-end'
            className={classes.pointer}
            onClick={handleOpenEditAddr(addr)}>
            <Pen className={classes.penIconStyle} />
          </Grid>
          <Grid item xs={1} container alignItems='flex-end'>
            <div onClick={handleDeleteAddr(addr._id)}>
              <AddButton del />
            </div>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
export function AddrAddModal(props) {
  const {
    addr,
    isUpdate = addr ? true : false,
    resetAddr,
    setJustSubmitted,
  } = props;
  const dispatch = useDispatch();
  const [newAddr, setNewAddr] = useState({
    nome: isUpdate && addr.name ? addr.name : "",
    tel: isUpdate && addr.phone ? addr.phone : "",
  });

  //reset last passed updated address information
  React.useEffect(() => {
    return () => {
      isUpdate && resetAddr();
    };
  }, [isUpdate, resetAddr]);

  const handleChange = (section, value) => {
    setNewAddr((prev) => ({ ...prev, [section]: value }));
  };
  const handleSubmit = (address) => {
    // console.log(address);
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
    // console.log(value);
    if (isUpdate) {
      value._id = isUpdate && addr._id && addr._id;
      dispatch(fetchPutCurClient({ type: "addr_put", value }));
    } else {
      dispatch(fetchPutCurClient({ type: "addr_post", value }));
    }
    setJustSubmitted(true);
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
          isUpdate={isUpdate}
          updateAddr={isUpdate && addr}
          mapSize={{ height: "230px" }}
          btnLabel='OK'
          getSelectedLocation={handleSubmit}
        />
      </Grid>
    </>
  );
}
