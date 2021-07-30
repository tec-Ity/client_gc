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
} from '../../redux/filter/filterSlice'
import { fetchProdListQuery } from "../../redux/shop/shopSlice";

export default function ShopSectionExpand(props) {
  const dispatch = useDispatch();
  const selFirstCateg = useSelector((state) => state.filter.selFirstCateg);
  const selSecondCateg = useSelector((state) => state.filter.selSecondCateg);
  const title = useSelector((state) => state.filter.title);
  const query = useSelector((state) => state.filter.query);
  const prodListQuery = useSelector((state) => state.shop.prodListQuery);
  const prodStatusQuery = useSelector((state) => state.shop.prodStatusQuery);
  const prodErrorQuery = useSelector((state) => state.shop.prodErrorQuery);

  useEffect(() => {
    // console.log("query", query);
    let callQuery = false;
    try {
      let queryURL = "?";
      if (query.categs.length > 0) {
        queryURL += "&Categs=" + query.categs;
        callQuery = true;
      }
      if (query.nations.length > 0) {
        queryURL += "&Nations=" + query.nations;
        callQuery = true;
      }
      if (query.isDiscount !== null) {
        queryURL += "&is_discount=" + query.isDiscount;
        callQuery = true;
      }
      // console.log(queryURL);
      callQuery === true
        ? dispatch(fetchProdListQuery(queryURL))
        : dispatch(fetchProdListQuery());
    } catch (e) {
      console.log(e);
    }
  }, [dispatch, query, title]);

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

  const prodList = () => {
    // console.log("status", prodStatusQuery);
    if (prodStatusQuery === "loading") {
      return <div>Loading......</div>;
    } else if (prodStatusQuery === "succeed") {
      return prodListQuery.length > 0 ? (
        prodListQuery.map((prod) => <div key={prod._id}>{prod.nome}</div>)
      ) : (
        <div>暂无产品</div>
      );
    } else if (prodStatusQuery === "error") {
      return <div>{prodErrorQuery}</div>;
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
        {/* {console.log("list", prodListQuery)} */}
        {prodList()}
      </div>
      <button onClick={goBack}>back</button>
    </div>
  );
}
