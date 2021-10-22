import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { get_DNS } from "../../api";
import { fetchProdById } from "../../redux/shop/shopSlice";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import CustomHr from "../../component/global/modal/component/CustomHr";
import ProdListItemControl from "../../component/prodList/itemControl/ProdListItemControl";
import { setInShop } from "../../redux/cart/cartSlice";
import CustomBgText from "../../component/global/background/CustomBgText";
import ProdList from "../../component/prodList/ProdList";
import clsx from "clsx";
import moment from "moment";
import { ReactComponent as ArrowLeft } from "../../component/icon/chevron-left.svg";
import bgBottom from "../../component/icon/bgBottom.png";
const useStyle = makeStyles((theme) => ({
  root: {
    fontFamily: "Montserrat",
    fontSize: "15px",
    color: "#1d1d38",
    position: "static",
    // border:'1px solid',
    overflow: "hidden",
  },
  bgBottom: {
    position: "absolute",
    width: "100%",
    // height: "50%",
    bottom: 0,
    zIndex: "-1",
  },
  headerStyle: {
    backgroundColor: "transparent",
    marginLeft: "60px",
    marginTop: "80px",
    // height: "px",
    // marginBottom: "20px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    fontSize: "14px",
  },
  backStyle: {
    background: "transparent",
    marginRight: "5%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& :nth-child(1)": {
      height: "20px",
      width: "20px",
    },
    "&:hover": {
      color: "#e47f10",
    },
  },
  backLink: {
    textDecoration: "none",
    color: "#1d1d38",
    "&:hover": {
      color: "#1d1d38",
    },
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
    paddingLeft: "40px",
  },
  imgsContainer: {
    display: "flex",
    // justifyContent: "center",
    // paddingLeft: "10px",
    // paddingTop:"7px",
    margin: "0 20px",
    minWidth: "105px",
    maxHeight: "425px",
    marginTop: "2px",
    overflowY: "scroll",
    // width: "600px",
    alignContent: "flex-start",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },

  imgBox: {
    maxHeight: "86px",
    maxWidth: "86px",
    height: "100%",
    width: "86px",
    boxSizing: "border-box",
    borderRadius: "5px 5px 5px 0",
    boxShadow: "0px 0px 10.8463px rgba(0, 0, 0, 0.1)",
    marginTop: "18px",
    padding: "5px",
  },
  mainImgBox: {
    marginTop: "20px",
    maxHeight: "400px",
    height: "400px",
    width: "400px",
    maxWidth: "400px",
    padding: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 0px 30.8463px rgba(0, 0, 0, 0.1)",
    borderRadius: "20.5642px 20.5642px 20.5642px 0px",
  },
  mainImg: {
    // border:'1px solid',
    width: "98%",
    height: "98%",
    objectFit: "scale-down",
  },
  prodDetailBox: {
    paddingLeft: "50px",
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
  hrStyle: {
    width: "100%",
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
    paddingLeft: "66px",
  },

  gridItem: {},

  //desp
  despTitleBox: {
    position: "relative",
  },
  titleBox: {
    width: "350px",
    height: "40px",
    fontSize: "20px",
  },
  titleBg: {
    width: "350px",
    height: "24px",
  },
  titleTxt: {
    top: "3px",
  },
  desp: {
    maxWidth: "750px",
    width: "100%",
    // margin: "auto",
    marginTop: "50px",
    marginBottom: "50px",
    // wordBreak: "break-word",
    // border: "1px solid",
    textAlign: "justify",
  },

  //recommend
  recommandTitleBox: {
    position: "relative",
  },
  titleBoxRec: {
    width: "350px",
    height: "40px",
    fontSize: "20px",
  },
  titleBgRec: {
    width: "350px",
    height: "24px",
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
  const curCartStatus = useSelector((state) => state.cart.curCartStatus);
  const classes = useStyle();
  useEffect(() => {
    window.document.getElementsByTagName("html")[0].style.scrollBehavior =
      "smooth";
    window.scrollTo(0, 0);
    setTimeout(function () {
      window.scrollTo(0, 0);
    }, 500);
  }, []);
  useEffect(() => {
    dispatch(setInShop(true));
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
    return () => {
      dispatch(setInShop(false));
    };
  }, [_id, curProd, curProdStatus, dispatch]);

  useEffect(() => {
    // if (curProdStatus === "succeed" && curProd.Shop) {
    //   if (curCartStatus === "idle") {
    //     dispatch(fetchCartByShop(curProd.Shop));
    //   } else if (curCartStatus === "error") {
    //     setTimeout(() => {
    //       dispatch(fetchCartByShop(curProd.Shop));
    //     }, 2000);
    //   }
    // }
  }, [curCartStatus, curProd.Shop, curProdStatus, dispatch]);
  return (
    <>
      <img alt='bg' src={bgBottom} className={classes.bgBottom} />

      {/* header */}
      <Container maxWidth={false} style={{ background: "transparent" }}>
        <div className={classes.headerStyle}>
          {/* back link */}
          <div className={classes.backStyle}>
            <ArrowLeft />
            &nbsp;
            <Link
              to=''
              className={classes.backLink}
              onClick={() => hist.goBack()}>
              BACK
            </Link>
          </div>
          {/* bread nav */}
          {curProdStatus === "succeed" && (
            <div className={classes.bread}>
              <Link
                to=''
                className={classes.backLink}
                onClick={() => {
                  // setClickCategFromRemote(curProd.Categs[0].Categ_far._id)
                  hist.goBack();
                }}>
                {curProd.Categ.Categ_far.code}
              </Link>
              <span> &gt; </span>
              <Link
                to=''
                className={classes.backLink}
                onClick={() => {
                  // dispatch(setClickCategFromRemote(curProd.Categs[0]._id));
                  hist.goBack();
                }}>
                {curProd.Categ.code}
              </Link>
              <span> &gt; </span>
              <span>{curProd.nome}</span>
            </div>
          )}
        </div>
      </Container>

      <Container maxWidth={false} className={classes.root} disableGutters>
        {/* backgrounds */}
        <div className={classes.bgTest}></div>

        {curProdStatus === "succeed" && (
          <Container
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              //   border:"1px solid"
            }}>
            {/* prod img & attr */}
            <Container className={classes.prodInfoContainer} disableGutters>
              <Grid
                container
                // justifyContent='center'
                style={{ paddingTop: "20px" }}>
                {/* ------------side imgs ------------*/}
                <Grid
                  container
                  item
                  justifyContent='center'
                  className={classes.imgsContainer}
                  xs={1}>
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
                <Grid
                  item
                  container
                  xs={5}
                  //   md={5}
                  justifyContent='center'
                  className={classes.mainImgBox}>
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
                  xs={4}
                  alignContent='space-between'
                  className={classes.prodDetailBox}>
                  <Grid container item xs={12}>
                    {/* +++ name and hr+++ */}
                    <Grid item xs={12} className={classes.prodDetailNameBox}>
                      <div>{curProd.nome}</div>
                      <CustomHr position={classes.hrStyle} />
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
                        <div
                          className={classes.priceStyle}
                          style={{ marginRight: "20px" }}>
                          PREZZO
                        </div>
                        <div style={{ fontWeight: "700" }}>
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
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* ---------------control------------ */}
                  <Grid container item xs={12} className={classes.btnStyle}>
                    <ProdListItemControl prod={curProd} large />
                  </Grid>
                </Grid>
              </Grid>
            </Container>

            {/*prod desp & recommendation & background  */}
            <Container className={classes.moreInfoContainer} disableGutters>
              <Grid container style={{ marginTop: "60px" }}>
                <Grid container item xs={12} className={classes.gridItem}>
                  <div style={{ position: "relative" }}>
                    <CustomBgText
                      label='Caratteristiche del prodotto'
                      style={{
                        box: classes.titleBox,
                        bg: classes.titleBg,
                        txt: classes.titleTxt,
                      }}
                    />
                  </div>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  className={classes.gridItem}
                  justifyContent='center'>
                  <div className={classes.desp}>
                    Di origine ancora piuttosto incerta (sembra provenire dalla
                    Siberia), il gruppo delle insalate era già conosciuto e
                    coltivato dai Romani, che, ritenendole piuttosto insipide,
                    preferivano consumarle associandole a foglie aromatizzanti
                    di rucola. Pianta a ciclo di coltivazione annuale,
                    appartenente alla famiglia delle Composite, l'iceberg
                    presenta un apparato radicale superficiale, con fusto breve
                    e carnoso su cui si inseriscono le foglie. Per quanto
                    riguarda il terreno, questa specie vegetale non ha esigenze
                    particolari e si adatta bene sia ai terreni sabbiosi che a
                    quelli argillosi. L'iceberg appartiene alla subspecie
                    capitata, caratterizzata da grumoli rotondeggianti, più o
                    meno compatti e foglie lisce.
                  </div>
                </Grid>
                <Grid container item xs={12} className={classes.gridItem}>
                  <div style={{ position: "relative" }}>
                    <CustomBgText
                      label='Ti potrebbe interessare'
                      style={{
                        box: classes.titleBoxRec,
                        bg: classes.titleBgRec,
                        txt: classes.titleTxt,
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
          </Container>
        )}
      </Container>
    </>
  );
}
