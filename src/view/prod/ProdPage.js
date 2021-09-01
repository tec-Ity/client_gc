import React from "react";
import { useHistory, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { get_DNS } from "../../api";
import { fetchProdById } from "../../redux/shop/shopSlice";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CustomHr from "../../component/global/modal/component/CustomHr";
import ProdListItemControl from "../../component/prodList/itemControl/ProdListItemControl";
import { fetchCartByShop } from "../../redux/cart/cartSlice";
import CustomBgText from "../../component/global/background/CustomBgText";
import ProdList from "../../component/prodList/ProdList";
import clsx from "clsx";
// import { setClickCategFromRemote } from "../../redux/filter/filterSlice";
import moment from "moment";

const useStyle = makeStyles((theme) => ({
  root: {
    fontFamily: "Montserrat",
    fontSize: "15px",
    color: "#1d1d38",
    position: "relative",
  },
  headerStyle: {
    height: "73px",
    marginBottom: "20px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  backStyle: {
    marginRight: "5%",
    display: "flex",
    justifyContent: "center",
    "& :nth-child(1)": {
      height: "20px",
      width: "20px",
    },
    "&:hover": {
      color: "#e47f10",
    },
  },
  backLink: {
    paddingTop: "1px",
  },
  bread: {
    "& span": {
      marginLeft: "5px",
      marginRight: "5px",
    },
    "& :nth-child(1)": {
      "&:hover": {
        color: "#e47f10",
      },
    },
    "& :nth-child(3)": {
      "&:hover": {
        color: "#e47f10",
      },
    },
    "& :nth-child(5)": {
      color: "#c4c4c4",
    },
  },
  prodInfoContainer: {
    minHeight: "500px",
  },
  imgContainer: {
    display: "flex",
    justifyContent: "center",
    maxHeight: "400px",
    overflowY: "scroll",
    alignContent: "flex-start",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },

  imgBox: {
    maxHeight: "86px",
    maxWidth: "86px",
    height: "auto",
    width: "86px",
    boxSizing: "border-box",
    borderRadius: "5px 5px 5px 0",
    boxShadow: "0px 0px 30.8463px rgba(0, 0, 0, 0.1)",
    marginTop: "15%",
  },
  mainImgBox: {
    maxHeight: "400px",
    width: "400px",
    maxWidth: "400px",
    boxShadow: "0px 0px 30.8463px rgba(0, 0, 0, 0.1)",
    borderRadius: "20.5642px 20.5642px 20.5642px 0px",
  },
  mainImg: {
    width: "98%",
    height: "98%",
    objectFit: "scale-down",
  },
  prodDetailBox: {
    maxWidth: "500px",
    maxHeight: "100%",
  },
  prodDetailNameBox: {
    "& :first-child": {
      margin: "15px 0 0 15px",
      fontSize: "30px",
      fontWeight: "700",
    },
  },
  attrRow: {
    fontSize: "15px",
    margin: "0 15px 0 15px",
  },
  attrList: {
    fontWeight: "700",
  },
  priceStyle: {
    fontSize: "20px",
  },
  btnStyle: {
    marginLeft: "15px",
    marginBottom: "15px",
  },

  //prod background
  bgMain: {
    height: "1000px",
    width: "200%",
    position: "absolute",
    overflow: "hidden",
    bottom: "-1%",
    left: "-50%",
    "&::after": {
      content: '""',
      bottom: "",
      borderRadius: "50%",
      position: "absolute",
      width: "200%",
      height: "150%",
      left: "-50%",
      right: "0",
      background: "#c0e57b",
      opacity: "0.1",
    },
  },
  // bgTest:{
  //   margin: "0 auto",
  //   width: "500px",
  //   height: "200px",
  //   background: "lightblue",
  //   position: "relative",
  //   overflow: "hidden",
  //   "&::after": {
  //     content: '""',
  //     position: "absolute",
  //     height: "80px",
  //     left: "0%",
  //     right: "0",
  //     borderRadius: "100%",
  //     bottom: "",
  //     background: "#fff",
  //   },
  // },

  //prod decription + recommand
  moreInfoContainer: {
    height: "900px",
  },

  gridItem: {},

  //desp
  despTitleBox: {
    position: "relative",
  },
  titleBox: {
    width: "460px",
    height: "40px",
    fontSize: "30px",
  },
  titleBg: {
    width: "460px",
  },
  desp: {
    maxWidth: "750px",
    width: "100%",
    margin: "auto",
    marginTop: "50px",
    marginBottom: "50px",
  },

  //recommend
  recommandTitleBox: {
    position: "relative",
  },
  titleBoxRec: {
    width: "460px",
    height: "40px",
    fontSize: "30px",
  },
  titleBgRec: {
    width: "460px",
  },
  recommand: {
    maxWidth: "750px",
    width: "100%",
    margin: "auto",
    marginTop: "50px",
    marginBottom: "50px",
  },
  prodRow: {
    paddingLeft: "20px",
    paddingTop: "50px",
  },
}));

export default function ProdPage() {
  const { _id } = useParams();
  const hist = useHistory();
  const dispatch = useDispatch();
  const curProd = useSelector((state) => state.shop.curProd);
  const curProdStatus = useSelector((state) => state.shop.curProdStatus);
  // const categStatus = useSelector((state) => state.shop.categStatus);
  const curCartStatus = useSelector((state) => state.cart.curCartStatus);
  const classes = useStyle();

  React.useEffect(() => {
    const fetchProd = () => {
      if (
        //first time fetch
        curProdStatus === "idle" ||
        //fetch for different prods
        (curProdStatus === "succeed" &&
          Object.keys(curProd).length > 0 &&
          curProd._id !== _id)
      ) {
        dispatch(fetchProdById(_id));
      } else if (curProdStatus === "error") {
        setTimeout(() => {
          dispatch(fetchProdById(_id));
        }, 2000);
      }
    };
    fetchProd();
  }, [_id, curProd, curProdStatus, dispatch]);

  React.useEffect(() => {
    if (curProdStatus === "succeed" && curProd.Shop) {
      if (curCartStatus === "idle") {
        dispatch(fetchCartByShop(curProd.Shop));
      } else if (curCartStatus === "error") {
        setTimeout(() => {
          dispatch(fetchCartByShop(curProd.Shop));
        }, 2000);
      }
    }
  }, [curCartStatus, curProd.Shop, curProdStatus, dispatch]);

  return (
    <Container className={classes.root} maxWidth={false} disableGutters>
      <div className={classes.bgMain}></div>
      <div className={classes.bgTest}></div>

      {/* header */}
      <Container>
        <div className={classes.headerStyle}>
          {/* back link */}
          <div className={classes.backStyle}>
            <div>
              <ArrowBackIcon />
            </div>
            <div className={classes.backLink} onClick={() => hist.goBack()}>
              BACK
            </div>
          </div>
          {/* bread nav */}
          {curProdStatus === "succeed" && (
            <div className={classes.bread}>
              <span
                onClick={() => {
                  dispatch();
                  // setClickCategFromRemote(curProd.Categs[0].Categ_far._id)
                  hist.goBack();
                }}>
                {curProd.Categ.Categ_far.code}
              </span>
              <span> &gt; </span>
              <span
                onClick={() => {
                  // dispatch(setClickCategFromRemote(curProd.Categs[0]._id));
                  hist.goBack();
                }}>
                {curProd.Categ.code}
              </span>
              <span> &gt; </span>
              <span>{curProd.nome}</span>
            </div>
          )}
        </div>
      </Container>

      {curProdStatus === "succeed" && (
        <>
          {/* prod img & attr */}
          <Container className={classes.prodInfoContainer} disableGutters>
            <Grid container justifyContent='space-evenly'>
              {/* ------------side imgs ------------*/}
              <Grid container item className={classes.imgContainer} xs={1}>
                {curProd.img_urls?.map((img) => {
                  return (
                    <Grid item xs={12} key={img} className={classes.imgBox}>
                      <img
                        className={classes.mainImg}
                        src={get_DNS() + img}
                        alt={curProd.code}
                      />
                    </Grid>
                  );
                })}
              </Grid>

              {/* ------------main imgs------------ */}
              <Grid item xs={5} className={classes.mainImgBox}>
                <img
                  className={classes.mainImg}
                  src={get_DNS() + curProd.img_urls[0]}
                  alt={curProd.code}
                />
              </Grid>
              {/* ------------detail------------ */}
              <Grid
                container
                item
                xs={6}
                alignContent='space-between'
                className={classes.prodDetailBox}>
                <Grid container item xs={12}>
                  {/* +++ name and hr+++ */}
                  <Grid item xs={12} className={classes.prodDetailNameBox}>
                    <div>{curProd.nome}</div>
                    <CustomHr />
                  </Grid>
                  {/* +++attr and price section+++ */}
                  <Grid container item xs={12} spacing={1}>
                    {curProd.Attrs.map((attr) => {
                      // +++ attr row +++
                      return (
                        <Grid
                          container
                          item
                          xs={12}
                          key={attr.nome}
                          className={classes.attrRow}>
                          <Grid container item xs={4}>
                            {attr.nome}
                          </Grid>
                          <Grid
                            container
                            item
                            xs={8}
                            className={classes.attrList}>
                            {attr.options.map((op) => {
                              return (
                                <Grid item xs={3}>
                                  {op}
                                </Grid>
                              );
                            })}
                          </Grid>
                        </Grid>
                      );
                    })}
                    {curProd.Attrs.length > 0 && (
                      <Grid item xs={12}>
                        <CustomHr />
                      </Grid>
                    )}
                    {/* +++ price +++ */}
                    <Grid container item xs={12} className={classes.attrRow}>
                      <Grid container item xs={4}>
                        <div className={classes.priceStyle}>PREZZO</div>
                      </Grid>
                      <Grid container item xs={8} className={classes.attrList}>
                        {curProd.price_max === curProd.price_min ? (
                          <div className={classes.priceStyle}>
                            €{curProd.price.toFixed(2)}
                          </div>
                        ) : (
                          <div className={classes.priceStyle}>
                            <span>€{curProd.price_min.toFixed(2)}</span>
                            <span>~</span>
                            <span>€{curProd.price_max.toFixed(2)}</span>
                          </div>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container item xs={12} className={classes.btnStyle}>
                  <ProdListItemControl prod={curProd} />
                </Grid>
              </Grid>
            </Grid>
          </Container>

          {/*prod desp & recommendation & background  */}
          <Container className={classes.moreInfoContainer}>
            <Grid container style={{ marginTop: "60px" }}>
              <Grid container item xs={12} className={classes.gridItem}>
                <div style={{ position: "relative" }}>
                  <CustomBgText
                    label='Caratteristiche del prodotto'
                    style={{
                      box: classes.titleBox,
                      bg: classes.titleBg,
                    }}
                  />
                </div>
              </Grid>
              <Grid container item xs={12} className={classes.gridItem}>
                <div className={classes.desp}>
                  Di origine ancora piuttosto incerta (sembra provenire dalla
                  Siberia), il gruppo delle insalate era già conosciuto e
                  coltivato dai Romani, che, ritenendole piuttosto insipide,
                  preferivano consumarle associandole a foglie aromatizzanti di
                  rucola. Pianta a ciclo di coltivazione annuale, appartenente
                  alla famiglia delle Composite, l'iceberg presenta un apparato
                  radicale superficiale, con fusto breve e carnoso su cui si
                  inseriscono le foglie. Per quanto riguarda il terreno, questa
                  specie vegetale non ha esigenze particolari e si adatta bene
                  sia ai terreni sabbiosi che a quelli argillosi. L'iceberg
                  appartiene alla subspecie capitata, caratterizzata da grumoli
                  rotondeggianti, più o meno compatti e foglie lisce.
                </div>
              </Grid>
              <Grid container item xs={12} className={classes.gridItem}>
                <div style={{ position: "relative" }}>
                  <CustomBgText
                    label='Ti potrebbe interessare'
                    style={{
                      box: classes.titleBoxRec,
                      bg: classes.titleBgRec,
                    }}
                  />
                </div>
              </Grid>
              <Grid
                container
                item
                xs={12}
                className={clsx(classes.gridItem, classes.prodRow)}>
                <ProdList
                  type={null}
                  queryURL={
                    "?Categs=" +
                    [curProd.Categ._id] +
                    "&Shops=" +
                    curProd.Shop._id +
                    "&pagesize=4" +
                    "&upd_after=" +
                    moment(curProd.at_crt).format("MM/DD/YYYY") +
                    "&excludes=" +
                    [curProd._id] +
                    "&sortKey=at_upd&sortVal=1"
                  }
                />
                {/* {console.log(moment(curProd.at_crt).format("MM/DD/YYYY"))} */}
              </Grid>
            </Grid>
          </Container>
        </>
      )}
    </Container>
  );
}
