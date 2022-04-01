import React, { useState, useEffect } from "react";
import { ReactComponent as Magnifier } from "../../icon/magnifier.svg";
import { makeStyles } from "@material-ui/core/styles";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchProds } from "../../../redux/shop/shopSlice";
import { Grid } from "@material-ui/core";
import { get_DNS } from "../../../api";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const useStyle = makeStyles({
  root: {
    height: "35px",
    width: "100%",
    maxWidth: "390px",
    marginLeft: "60px",
    marginRight: "35px",
    transition: "all 0.3s",
  },
  searchBox: {
    zIndex: 99,
    transition: "all 0.3s",
    height: "35px",
    width: "100%",
    maxWidth: "390px",
    minWidth: "0px",
    backgroundColor: "#fff",
    fontFamily: "Montserrat",
    borderRadius: "17.5px 18.5px 18.5px 0px",
    paddingLeft: "10px",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "1.5px solid #fff",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#E47F10",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderWidth: "2px",
      borderColor: "#E47F10",
    },
  },
  searchIcon: {
    height: "22px",
    width: "22px",
    paddingLeft: "5px",
    borderLeft: "1.5px solid #c0e57b",
    "& > :nth-child(1)": {
      height: "22px",
      "& path:nth-of-type(1)": { fill: "#c0e57b" },
      "& path:nth-of-type(2)": { stroke: "#c0e57b" },
      "& circle": { fill: "#c0e57b" },
    },
  },
  resultBox: {
    zIndex: 99,
    position: "relative",
    backgroundColor: "#fff",
    marginRight: "40px",
    border: "1px solid #c0e57b",
    display: "flex",
    justifyContent: "center",
    padding: "10px",
  },
  resultList: {
    backgroundColor: "#fff",
    maxHeight: "400px",
    overflowY: "scroll",
    width: "100%",
    maxWidth: "285px",
    minWidth: "275px",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  resultCount: {
    height: "30px",
    borderBottom: "1px solid #c0e57b",
    fontSize: "14px",
    display: "flex",
    alignItems: "flex-end",
    paddingBottom: "10px",
    marginBottom: "10px",
    "& > :first-child": {
      fontWeight: 700,
    },
  },
  resultLink: {
    textDecoration: "none",
    color: "#1d1d38",
    display: "block",
    marginBottom: "10px",
  },
  resultListItem: {
    width: "100%",
    padding: "5px",
    "&:hover": {
      backgroundColor: "#c0e57b4d",
    },
    //img
    "& > :nth-child(1) > :nth-child(1)": {
      height: "86px",
      width: "86px",
      objectFit: "scale-down",
    },
    //info
    "& > :nth-child(2)": {
      paddingLeft: "10px",
      paddingBottom: "5px",
      alignContent: "space-between",
      //name
      "& > :nth-child(1)": { fontWeight: 700, fontSize: "14px" },
      "& > :nth-child(2)": {},
    },
  },
  viewMore: {
    cursor: "pointer",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "14px",
    "& > :nth-child(2)": {
      fontSize: "20px",
      position: "relative",
      top: "-10px",
    },
  },
  resultBackground: {
    zIndex: 98,
    position: "fixed",
    top: "0",
    bottom: "0",
    right: "0",
    left: "0",
    backgroundColor: "#0000004d",
  },
});

const pageSize = 30;
export default function SearchInput() {
  const { t } = useTranslation();
  const classes = useStyle();
  const dispatch = useDispatch();
  const [pageNum, setPageNum] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [showSearchBox, setShowSearchBox] = useState(false);
  const searchProds = useSelector((state) => state.shop.searchProds);
  const searchProdsCount = useSelector((state) => state.shop.searchProdsCount);
  const searchProdsStatus = useSelector(
    (state) => state.shop.searchProdsStatus
  );
  useEffect(() => {
    searchValue && dispatch(fetchSearchProds({ searchValue, pageNum }));
  }, [dispatch, pageNum, searchValue]);
  return (
    <div className={classes.root}>
      <OutlinedInput
        classes={{ root: classes.searchBox }}
        placeholder={t("components.search.prod")}
        onClick={(e) => {
          e.target.style.minWidth = "200px";
        }}
        onBlur={(e) => {
          e.target.style.minWidth = "0px";
        }}
        onChange={(e) => {
          setPageNum(1);
          if (e.target.value) {
            setSearchValue(e.target.value);
            setShowSearchBox(true);
          } else {
            setShowSearchBox(false);
          }
        }}
        endAdornment={
          <InputAdornment className={classes.searchIcon} position="end">
            <Magnifier />
          </InputAdornment>
        }
      />
      {showSearchBox === true && (
        <>
          <div className={classes.resultBox}>
            <div className={classes.resultList}>
              <div className={classes.resultCount}>
                <span> {searchProdsCount} </span> &nbsp; prodotti correlati
              </div>
              {searchProds.map((prod, index) => (
                <Link
                  to={`/prod/${prod._id}`}
                  className={classes.resultLink}
                  key={prod._id}
                  onClick={() => setShowSearchBox(false)}
                >
                  <Grid container className={classes.resultListItem}>
                    <Grid item xs={4}>
                      {prod.img_urls[0] ? (
                        <img
                          src={get_DNS() + prod.img_urls[0]}
                          alt={prod.nome}
                        />
                      ) : (
                        <div style={{ backgroundColor: "#c0e57b4d" }}></div>
                      )}
                    </Grid>
                    <Grid item container xs={8}>
                      <Grid item xs={12}>
                        {prod.nome?.slice(0, 35) +
                          (prod.nome?.length > 35 ? "..." : "")}
                      </Grid>
                      <Grid item xs={12}>
                        €
                        {prod.price_max === prod.price_min
                          ? String(
                              prod?.Skus[0]?.price_sale?.toFixed(2)
                            )?.replace(".", ",")
                          : `${String(prod?.price_min.toFixed(2))?.replace(
                              ".",
                              ","
                            )} - ${String(prod?.price_min.toFixed(2))?.replace(
                              ".",
                              ","
                            )}`}
                      </Grid>
                    </Grid>
                  </Grid>
                </Link>
              ))}
              {pageNum * pageSize < searchProdsCount && (
                <div
                  onClick={() => setPageNum((prev) => prev + 1)}
                  className={classes.viewMore}
                >
                  <div>view more</div>
                  <div>...</div>
                </div>
              )}
            </div>
          </div>
          <div
            className={classes.resultBackground}
            onClick={() => setShowSearchBox(false)}
          ></div>
        </>
      )}
    </div>
  );
}
