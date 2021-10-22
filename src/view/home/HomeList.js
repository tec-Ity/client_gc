import React, { useEffect, useRef } from "react";
import {
  Grid,
  Container,
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
} from "@material-ui/core";
import { get_DNS } from "../../api";
import { makeStyles } from "@material-ui/core/styles";
import CustomBgText from "../../component/global/background/CustomBgText";
const useStyle = makeStyles({
  root: {
    height: "150px",
    marginTop: "50px",
    // border:'1px solid',
    // marginLeft: "20px",
    // marginRight: "20px",
  },
  labelBoxStyle: {
    position: "relative",
    marginLeft: "80px",
  },
  ///cities container
  itemGrid: {
    margin: "0",
    marginTop: "330px",
    // marginLeft: "10px",
    display: "flex",
    overflowY: "scroll",
    overflowX: "hidden",
    transform: "rotate(-90deg)",
    transformOrigin: "top left",
    width: "300px",
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
    background: "transparent",
    // boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.1)",
    // borderRadius: "20px 0px",
  },
  cardActionArea: {
    // width: "100%",
    width: "250px",
    height: "150px",
    backgroundImage: "linear-gradient(270deg,#91e883, #c0e57b) ",
    fontFamily: "Montserrat",
    borderRadius: "20px 0",
    position: "relative",
    "&:hover .MuiCardActionArea-focusHighlight": {
      opacity: 0,
    },
  },
  cardMedia: {
    width: "240px",
    margin: "auto",
    background: "#fff",
    height: "140px",
    borderRadius: "20px 0",
  },
  cardBackground: {
    transition: "all 0.5s ease",
    position: "absolute",
    fontSize: "20px",
    top: "5px",
    left: "5px",
    right: "5px",
    width: "240px",
    color: "#fff",
    fontWeight: 700,
    borderRadius: "20px 0",
    height: "140px",
    // border: "1px solid",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1d1d3833",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  cardNoBackground: {
    position: "absolute",
    fontSize: "20px",
    top: "5px",
    left: "5px",
    right: "5px",
    width: "240px",
    color: "#fff",
    fontWeight: 700,
    borderRadius: "20px 0",
    height: "140px",
    // border: "1px solid",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
  console.log(list);
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
        {/* <div style={{width:'30px'}}>&nbsp;&nbsp;</div> */}
        {list &&
          list.map((item, index) => {
            const disabled = Boolean(index >= disableIndex);
            return (
              <Grid
                item
                key={item._id}
                style={{ paddingTop: index === 0 && "80px" }}>
                <Card className={classes.itemCard} id={item._id} elevation={0}>
                  <CardActionArea
                    classes={{ root: classes.cardActionArea }}
                    onClick={!disabled ? handleFunc(item) : () => {}}>
                    {item.img_url && (
                      <>
                        <CardMedia
                          component='img'
                          image={get_DNS() + item.img_url}
                          alt={item.nome}
                          title={item.nome}
                          className={classes.cardMedia}
                        />
                      </>
                    )}
                    <div
                      className={
                        item.img_url
                          ? classes.cardBackground
                          : classes.cardNoBackground
                      }>
                      {item.nome}
                    </div>
                    {/* <CardContent
                      className={
                        disabled
                          ? classes.cardContentDisabled
                          : classes.cardContent
                      }>
                      <span>{item.nome}</span>
                    </CardContent> */}
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
}
