import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CustomHr from "../global/modal/component/CustomHr";

const useStyle = makeStyles((theme) => ({
  root: {
    borderRadius: "20px 0 0 0 ",
    boxShadow: "0px 0px 31.1569px rgba(0, 0, 0, 0.1)",
    height: "200px",
    marginBottom: "21px",
  },
  titleStyle: {
    width: "100%",
    height: "31.15px",
    paddingTop: "6px",
    fontSize: "25.55px",
    fontWeight: "700",
    fontFamily: "Montserrat",
    textAlign: "center",
  },
  hrStyle: {
    width: "96.5%",
    marginTop: "6px",
    marginBottom: "6px",
  },
  bannerDefault: {
    height: "150px",
    width: "100%",
    background:
      " linear-gradient(270deg, #91E8B3 0%, #C0E57B 100%, #C0E57B 100%)",
    display: "flex",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    "& div": {
      fontSize: "55px",
      fontWeight: "700",
      fontFamily: "Montserrat",
      color: "#FFFCF0",
      mixBlendMode: "overlay",
    },
  },
}));

export default function ExpandTilte(props) {
  const { title } = props;
  const classes = useStyle();
  return (
    <>
      {title.desp && (
        <div className={classes.root}>
          <div className={classes.titleStyle}>{title.desp}</div>
          <CustomHr position={classes.hrStyle} />
          {title.img ? (
            <img src={title.img} alt={title.desp} />
          ) : (
            <div className={classes.bannerDefault}>
              <div>{title.desp}</div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
