import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";

const useStyle = makeStyles((theme) => ({
  root: {},
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  //default LG
  backTemplate: {
    width: "500px",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
    height: "600px",
    padding: "3px",
    borderRadius: "20px 0",
    background:
      " linear-gradient(270deg, #91E8B3 0%, #C0E57B 100%, #C0E57B 100%)",
  },
  paperStyle: {
    width: "auto",
    // [theme.breakpoints.down("sm")]: {
    //   width: "100%",
    // },
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: "20px 0",
    fontFamily: "Montserrat",
    // boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.1)",
  },
  //custom Small
  backTemplateSm: {
    width: "500px",
    height: "280px",
    padding: "3px",
    borderRadius: "20px 0",
    background:
      " linear-gradient(270deg, #91E8B3 0%, #C0E57B 100%, #C0E57B 100%)",
  },
  paperStyleSm: {
    width: "auto",
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: "20px 0",
    fontFamily: "Montserrat",
    // boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.1)",
  },
}));

export default function CustomModal({
  children,
  show,
  handleClose,
  small = false,
  timeout = 500,
}) {
  const classes = useStyle();
  return (
    <Modal
      className={classes.modal}
      open={show}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout }}
    >
      <Fade in={show}>
        <div className={small ? classes.backTemplateSm : classes.backTemplate}>
          <div className={small ? classes.paperStyleSm : classes.paperStyle}>
            {children}
          </div>
        </div>
      </Fade>
    </Modal>
  );
}
