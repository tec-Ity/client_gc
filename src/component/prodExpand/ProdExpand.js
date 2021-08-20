import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { goBack } from "../../redux/filter/filterSlice";
import ProdList from "../prodList/ProdList";
import MoreButton from "./MoreButton";
import ExpandTitle from "./Tilte";
import Container from "@material-ui/core/Container";

export default function ProdExpand(props) {
  const dispatch = useDispatch();
  const title = useSelector((state) => state.filter.title);
  const query = useSelector((state) => state.filter.query);
  const [queryURL, setQueryURL] = useState(null);
  useEffect(() => {
    // console.log("query", query);
    let callQuery = false;
    try {
      let queryUrl = "?";
      if (query.categs.length > 0) {
        queryUrl += "&Categs=" + query.categs;
        callQuery = true;
      }
      if (query.nations.length > 0) {
        queryUrl += "&Nations=" + query.nations;
        callQuery = true;
      }
      if (query.isDiscount === true) {
        queryUrl += "&is_discount=true";
        callQuery = true;
      }
      // console.log("query", queryUrl);
      callQuery === true ? setQueryURL(queryUrl) : setQueryURL(null);
    } catch (e) {
      console.log(e);
    }
  }, [dispatch, query]);

  const Back = () => {
    dispatch(goBack());
  };

  return (
    <Container
      style={{
        minHeight: "400px",
        padding: 0,
        marginBottom: "30px",
        marginTop: "15px",
      }}>
      <div>
        {queryURL || props.prods ? (
          queryURL ? (
            <>
              <ExpandTitle title={title} />
              <ProdList queryURL={queryURL} />
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
      <>{props.prods && <MoreButton farId={props.far.id} />}</>
      {queryURL && <button onClick={Back}>back</button>}
    </Container>
  );
}
