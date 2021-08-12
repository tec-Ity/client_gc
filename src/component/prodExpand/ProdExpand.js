import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { goBack } from "../../redux/filter/filterSlice";
import ProdList from "../prodList/ProdList";
import MoreButton from "./MoreButton";
import ExpandTitle from "./Tilte";

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
      if (query.isDiscount !== null) {
        queryUrl += "&is_discount=" + query.isDiscount;
        callQuery = true;
      }

      callQuery === true ? setQueryURL(queryUrl) : setQueryURL(null);
    } catch (e) {
      console.log(e);
    }
  }, [dispatch, query]);

  const Back = () => {
    dispatch(goBack());
  };

  return (
    <div style={{ border: "1px solid" }}>
      Expand Section
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
    </div>
  );
}
