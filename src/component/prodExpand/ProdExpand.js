import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { goBack, setQuery } from "../../redux/filter/filterSlice";
import ProdList from "../prodList/ProdList";
import ExpandTitle from "./ExpandTitle";
import Container from "@material-ui/core/Container";
import CustomButton from "../global/modal/component/CustomButton";

export default function ProdExpand(props) {
  const dispatch = useDispatch();
  const title = useSelector((state) => state.filter.title);
  const query = useSelector((state) => state.filter.query);
  const nationIds = useSelector((state) => state.filter.nationIds);
  const prodListQueryStatus = useSelector(
    (state) => state.shop.prodListQueryStatus
  );
  const prodListQueryTot = useSelector((state) => state.shop.prodListQueryTot);
  const [queryURL, setQueryURL] = useState(null);
//   const [pageNum, setPageNum] = useState(1);
  const [isReload, setIsReload] = useState(true);
//   const [atBottom, setAtBottom] = React.useState(false);
  const pageSize = 30;
  useEffect(() => {
    // //console.log("query", query);
    let validQuery = false;
    try {
      let queryUrl = "";
      if (query.categs.length > 0) {
        queryUrl += "&Categs=" + query.categs;
        validQuery = true;
      }
      if (query.nations.length > 0) {
        queryUrl +=
          "&Nations=" +
          query.nations.map(
            (n) => nationIds?.find((idObj) => idObj.code === n)?.id
          );
        validQuery = true;
      }
      if (query.isDiscount === true) {
        queryUrl += "&is_discount=true";
        validQuery = true;
      }
      //test query field for changing page size
      validQuery === true && (queryUrl += "&pagesize=" + pageSize);

    //   console.log(query);
      //valid query
      if (validQuery === true) {
        queryUrl += "&page=" + query.page;
        // console.log(queryUrl);
        //initial
        if (query.page === 1) {
          setIsReload(true);
          setQueryURL(queryUrl);
        } else {
          //repeted, no action
          if (queryUrl === queryURL) {
            // console.log("repeted");
          }
          //change page
          else {
            setIsReload(false);
            setQueryURL(queryUrl);
          }
        }
      } else {
        setQueryURL(null);
      }
    } catch (e) {}
  }, [dispatch, nationIds, query]);

  //   useEffect(() => {
  //     const handleScroll = () => {
  //       const element = document.getElementById("prod-container");
  //       //if bottom?
  //       if (element.getBoundingClientRect().bottom <= window.innerHeight) {
  //         if (atBottom === false) {
  //           setPageNum((prev) => prev + 1);
  //           setAtBottom(true);
  //         }
  //       } else {
  //         setAtBottom(false);
  //       }
  //     };
  //     window.addEventListener("scroll", handleScroll);
  //     return () => {
  //       window.removeEventListener("scroll", handleScroll);
  //     };
  //   }, []);

  //   useEffect(() => {
  //     dispatch(setQuery({ page: pageNum }));
  //   }, [dispatch, pageNum]);

  const handleFunc = () => {
    document.getElementById(props.far.id + "categBar").click();
  };

  return (
    <Container
      style={{
        minHeight: "400px",
        padding: 0,
        marginBottom: "30px",
        marginTop: "15px",
        maxWidth: "781px",
      }}>
      <div id='prod-container'>
        {queryURL || props.prods ? (
          queryURL ? (
            <>
              <ExpandTitle title={title} />
              {/* add is reload */}
              <ProdList queryURL={queryURL} isReload={isReload} />
              {prodListQueryTot > 0 &&
                query.page * pageSize < prodListQueryTot && (
                  <CustomButton
                    label='VEDI DI PIÙ'
                    handleFunc={(setLoading) => {
                      dispatch(setQuery({ page: query.page + 1 }));
                      if (prodListQueryStatus === "succeed") setLoading(false);
                    }}
                  />
                )}
            </>
          ) : (
            <>
              <ExpandTitle title={props.title} />
              <ProdList prods={props.prods} />
            </>
          )
        ) : (
          <div>暂无产品</div>
        )}
      </div>

      <div style={{ marginTop: "20px" }}>
        {props.prods && (
          <CustomButton label='VEDI DI PIÙ' handleFunc={handleFunc} />
        )}
      </div>
    </Container>
  );
}
