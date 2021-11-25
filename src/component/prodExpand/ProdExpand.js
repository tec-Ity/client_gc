import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { goBack } from "../../redux/filter/filterSlice";
import ProdList from "../prodList/ProdList";
import ExpandTitle from "./ExpandTitle";
import Container from "@material-ui/core/Container";
import CustomButton from "../global/modal/component/CustomButton";

export default function ProdExpand(props) {
  const dispatch = useDispatch();
  const title = useSelector((state) => state.filter.title);
  const query = useSelector((state) => state.filter.query);
  const nationIds = useSelector((state) => state.filter.nationIds);
  const [queryURL, setQueryURL] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [isReload, setIsReload] = useState(true);

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
      validQuery === true && (queryUrl += "&pagesize=6");

      //valid query
      if (validQuery === true) {
        queryUrl += "&page=" + pageNum;
        //initial
        if (pageNum === 1) {
          setQueryURL(queryUrl);
        } else {
          //repeted, no action
          if (queryUrl === queryURL) {
            console.log("repeted");
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
  }, [dispatch, nationIds, pageNum, query]);

  const Back = () => {
    dispatch(goBack());
  };

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
      <div>
        {queryURL || props.prods ? (
          queryURL ? (
            <>
              <ExpandTitle title={title} />
              {/* add is reload */}
              <ProdList queryURL={queryURL} isReload={isReload} />
              <button onClick={() => setPageNum((prev) => prev + 1)}>
                more
              </button>
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

      {/* {queryURL && <button onClick={Back}>back</button>} */}
    </Container>
  );
}
