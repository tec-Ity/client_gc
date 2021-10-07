import React, { useEffect, useRef } from "react";
import {
  Grid,
  Container,
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CustomBgText from "../../component/global/background/CustomBgText";
const useStyle = makeStyles({
  root: {
    height: "330px",
    marginTop: "50px",
    // marginLeft: "20px",
    // marginRight: "20px",
  },
  labelBoxStyle: {
    position: "relative",
    marginLeft: "50px",
  },
  ///cities container
  itemGrid: {
    margin: "0",
    marginTop: "330px",
    display: "flex",
    overflowY: "scroll",
    overflowX: "hidden",
    transform: "rotate(-90deg)",
    transformOrigin: "top left",
    width: "350px",
    // maxHeight: "1280px",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    flexWrap: "wrap",
  },
  itemCard: {
    transform: "rotate(90deg)",
    width: "250px",
    height: "240px",
    boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.1)",
    borderRadius: "20px 0px",
  },
  cardActionArea: {
    width: "100%",
    height: "100%",
    fontFamily: "Montserrat",
  },
  cardMedia: {
    width: "99%",
    height: "200px",
  },
  cardContent: {
    padding: "0px",
    height: "40px",
    background: "#c0e57b",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
  },
  cardContentDisabled: {
    padding: "0px",
    height: "40px",
    background: "#1d1d384d",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    color: "#1d1d38",
  },
  bg: {
    width: "200px",
    height: "24px",
  },
  txt: {
    fontSize: "30px",
    paddingBottom: "6px",
  },
});

export default function HomeList(props) {
  const { containerId, label, list, handleFunc, disableIndex } = props;
  const classes = useStyle();
  const ref = useRef(null);

  useEffect(() => {
    const setStyle = () => {
      ref.current.style.height =
        document.getElementById(containerId)?.clientWidth + "px";
    };
    //init width
    setStyle();
    //init event listenr
    window.addEventListener("resize", setStyle);
    return () => {
      window.removeEventListener("resize", setStyle);
    };
  });

  return (
    <Container
      disableGutters
      maxWidth={false}
      className={classes.root}
      id={containerId}>
      {label && (
        <div className={classes.labelBoxStyle}>
          <CustomBgText
            label={label}
            style={{ bg: classes.bg, txt: classes.txt }}
          />
        </div>
      )}
      <Grid ref={ref} container className={classes.itemGrid} spacing={10}>
        {list &&
          list.map((item, index) => {
            const disabled = Boolean(index >= disableIndex);
            return (
              <Grid item key={item._id}>
                <Card className={classes.itemCard} id={item._id}>
                  <CardActionArea
                    className={classes.cardActionArea}
                    onClick={!disabled ? handleFunc(item._id) : () => {}}>
                    <CardMedia
                      component='img'
                      alt={item.nome}
                      title={item.nome}
                      className={classes.cardMedia}
                    />
                    <CardContent
                      className={
                        disabled
                          ? classes.cardContentDisabled
                          : classes.cardContent
                      }>
                      <span>{item.nome}</span>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
}
