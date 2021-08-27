import React from "react";
import CustomModal from "../../../component/global/modal/CustomModal";
import { Grid, makeStyles, Button } from "@material-ui/core";
import CustomButton from "../../../component/global/modal/component/CustomButton";
import { get_DNS } from "../../../api";

const useStyle = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  scrollBox: {
    minHeight: "224px",
  },
  gridItemStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  prodTable: {},
  imgStyle: {
    width: "63.45px",
    height: "63.45px",
    objectFit: "scale-down",
    background: "#c0e57b",
  },
}));

export default function ProofModal(props) {
  const { show, handleClose, proofObjs } = props;
  const classes = useStyle();
  const [prodList, setProdList] = React.useState();

  React.useEffect(() => {
    const mapProofProdsAsGridItem = () => {
      const tempProofList = proofObjs.map((prod, index) => {
        return (
          <Grid container item key={index}>
            <Grid item xs={3}>
              <img
                className={classes.imgStyle}
                src={get_DNS() + prod.img_url}
                alt={prod.nome}
              />
            </Grid>
            <Grid item xs={6}>
              <div title={prod.nome} style={{ overflow: "hidden" }}>
                {prod.nome}
              </div>
              <div>{prod.attrs}&nbsp;</div>
            </Grid>
            <Grid item xs={3}>
              <div>€{prod.price?.toFixed(2)}</div>
              <div>&nbsp;</div>
            </Grid>
          </Grid>
        );
      });

      setProdList(tempProofList);
    };
    mapProofProdsAsGridItem();
  }, [classes.imgStyle, proofObjs]);

  return (
    <CustomModal show={show} handleClose={handleClose}>
      <Grid container className={classes.root}>
        <Grid item xs={12} className={classes.gridItemStyle}>
          Proof ICON
        </Grid>
        <Grid item xs={12} className={classes.gridItemStyle}>
          <div>
            I seguenti prodotti sono stati automaticamente rimossi dal carrello
            perché sono scaduti/modificati.
          </div>
        </Grid>
        <Grid container item xs={12} className={classes.gridItemStyle}>
          {prodList}
        </Grid>
        <Grid item xs={12} className={classes.gridItemStyle}>
          <CustomButton label={"HO CAPITO"} />
        </Grid>
      </Grid>
    </CustomModal>
  );
}
