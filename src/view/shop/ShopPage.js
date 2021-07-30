import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import ShopSideBar from "./ShopSideBar";
import ShopDetail from "./ShopDetail";
import ShopProdSection from "./shopProdSection/ShopProdSection";
import ShopSelection from "./ShopSelection";
import {
  fetchProdListHome,
  fetchCategList,
  setCurShop,
} from "../../redux/shop/shopSlice";
import { useDispatch, useSelector } from "react-redux";

export default function ShopPage() {
  const { _id } = useParams();
  const hist = useHistory();
  const dispatch = useDispatch();
  const categs = useSelector((state) => state.shop.categList);
  const prevShopId = useSelector((state) => state.shop.curShop);
  const categStatus = useSelector((state) => state.shop.categStatus);
  const categError = useSelector((state) => state.shop.categError);

  useEffect(() => {
    // console.log('shopPage')
    // 会渲染好几次sideBar并console好几次
    if (prevShopId !== _id) {
      // console.log("enter new shop");
      dispatch(fetchCategList());
      // console.log("status", categStatus);
      if (categStatus === "succeed") {
        dispatch(fetchProdListHome(categs));
        dispatch(setCurShop(_id));
      }
    }
  }, [_id, categStatus, categs, dispatch, prevShopId]);

  return (
    <div style={{ border: "1px solid" }}>
      <h1>SHOP</h1>
      <div>display categlist of shop {_id}</div>

      <button
        onClick={() => {
          hist.goBack();
        }}>
        返回
      </button>
      <button
        onClick={() => {
          hist.push("/prod/test");
        }}>
        test prod
      </button>

      <ShopDetail />
      <ShopSelection />

      {categs.length > 0 && (
        <>
          <ShopSideBar categs={categs} />

          <ShopProdSection />
        </>
      )}
    </div>
  );
}
