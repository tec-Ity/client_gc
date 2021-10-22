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
  useEffect(() => {
    // console.log("query", query);
    let callQuery = false;
    try {
      let queryUrl = "";
      if (query.categs.length > 0) {
        queryUrl += "&Categs=" + query.categs;
        callQuery = true;
      }
      if (query.nations.length > 0) {
        // console.log('id',nationIds)
        queryUrl +=
          "&Nations=" +
          query.nations.map(
            (n) => nationIds?.find((idObj) => idObj.code === n)?.id
          );
        callQuery = true;
      }
      if (query.isDiscount === true) {
        queryUrl += "&is_discount=true";
        callQuery = true;
      }
      //   console.log("query", queryUrl);
      callQuery === true ? setQueryURL(queryUrl) : setQueryURL(null);
    } catch (e) {
      //   console.log(e);
    }
  }, [dispatch, nationIds, query]);

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

      <div style={{ marginTop: "20px" }}>
        {props.prods && (
          <CustomButton label='VEDI DI PIÙ' handleFunc={handleFunc} />
        )}
      </div>

      {queryURL && <button onClick={Back}>back</button>}
    </Container>
  );
}
