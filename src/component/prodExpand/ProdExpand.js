import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setIsHome,
  setSelFirstCateg,
  setQuery,
  setTitle,
  setSearch,
  setSelSecondCateg,
  setBackToFirst,
} from "../../redux/filter/filterSlice";
import { fetchProdListQuery } from "../../redux/shop/shopSlice";
import ProdList from "../prodList/ProdList";

export default function ShopSectionExpand(props) {
  const dispatch = useDispatch();
  const selFirstCateg = useSelector((state) => state.filter.selFirstCateg);
  const selSecondCateg = useSelector((state) => state.filter.selSecondCateg);
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

  const goBack = () => {
    if (selSecondCateg !== null) {
      dispatch(setSelSecondCateg(null));
      dispatch(setBackToFirst(true));
    } else if (selFirstCateg !== null) {
      dispatch(setSelFirstCateg(null));
      dispatch(setIsHome(true));
      dispatch(setSearch());
      dispatch(setQuery());
      dispatch(setTitle());
    }
  };
  const sectionTitle = title.desp && (
    <div>
      <div>---{title.desp}---</div>
      {title.img ? <img src={title.img} alt={title.desp} /> : <div></div>}
    </div>
  );

  return (
    <div>
      Expand Section
      <div>{sectionTitle}</div>
      <div>
        {queryURL?<ProdList queryURL={queryURL} />:<div>暂无产品</div>}
      </div>
      <button onClick={goBack}>back</button>
    </div>
  );
}
