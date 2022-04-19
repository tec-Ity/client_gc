import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSelFirstCateg,
  setSelSecondCateg,
  setIsHome,
  setQuery,
  setTitle,
  setBackToFirst,
  goBack,
  fetchNationIds,
} from "../../../redux/filter/filterSlice";
import ShopSideBarUI from "./ShopSideBarUI";
import { useTranslation } from "react-i18next";
import { Drawer } from "@material-ui/core";
import { setShowDrawer } from "../../../redux/shop/shopSlice";

export default function ShopSideBar(props) {
  const { t } = useTranslation();
  const { categs } = props;
  const [children, setChildren] = useState();
  const [firstCategData, setFirstCategData] = useState({
    _id: "",
    code: "",
    img: "",
  });

  const dispatch = useDispatch();
  const selFirstCateg = useSelector((state) => state.filter.selFirstCateg);
  const selSecondCateg = useSelector((state) => state.filter.selSecondCateg);
  const backToFirst = useSelector((state) => state.filter.backToFirst);
  const isDiscount = useSelector((state) => state.filter.query.isDiscount);
  const nations = useSelector((state) => state.filter.query.nations);

  //nation ids
  // const nationIds = useSelector((state) => state.filter.nationIds);
  const nationIdsStatus = useSelector((state) => state.filter.nationIdsStatus);
  useEffect(() => {
    nationIdsStatus === "idle" &&
      dispatch(fetchNationIds(["CN", "IT", "JP", "KR"]));
  }, [dispatch, nationIdsStatus]);

  const goBackFunc = useCallback(() => {
    dispatch(goBack());
  }, [dispatch]);

  const displayChildren = useCallback(
    //find children of current first categ, for dispaly nested second categs
    (_id, farCode, farImg) => {
      console.log(farImg);
      const children = categs.find((item) => item._id === _id).Categ_sons;
      setChildren({ far: _id, farCode, farImg, list: children });
    },
    [categs]
  );

  useEffect(() => {
    return () => {
      dispatch(setQuery());
    };
  }, [dispatch]);

  const sendFirstCategData = useCallback(
    (categId, categCode, img) => {
      console.log(categId, categCode, img);
      //find its children
      displayChildren(categId, categCode, img);
      //inform selection
      dispatch(setSelFirstCateg(categId));
      dispatch(
        setTitle({
          desp: categCode,
          img,
          code: "",
        })
      );

      //find its children categs
      const selChildren = categs.find(
        (item) => item._id === categId
      ).Categ_sons;

      //find all prods belong to it
      dispatch(
        setQuery({
          categs: selChildren?.map((child) => child._id),
        })
      );
      window.scrollTo(0, 250);

      //display expand
      dispatch(setIsHome(false));
      setTimeout(() => {
        //clear all second categ selection
        dispatch(setSelSecondCateg(null));
        //store expanded first categ data
        setFirstCategData({ _id: categId, code: categCode });
        //set expand title
      }, 300);
    },
    [categs, dispatch, displayChildren]
  );

  const sendSecondCategData = useCallback(
    (categId, categCode, img, farCode) => {
      //check first time seleciton
      if (categId !== selSecondCateg) {
        dispatch(setIsHome(false));
        dispatch(setSelSecondCateg(categId));
        dispatch(
          setTitle({
            desp: farCode,
            img,
            code: categCode,
          })
        );
        dispatch(
          setQuery({
            categs: [categId],
          })
        );
      }
      window.scrollTo(0, 250);
    },
    [dispatch, selSecondCateg]
  );

  useEffect(() => {
    //when first categ not selected clear common children list
    selFirstCateg === null && setChildren([]);
  }, [selFirstCateg]);

  useEffect(() => {
    //used for the back button in second categ expand section
    if (backToFirst === true) {
      const { _id, code, img } = firstCategData;
      sendFirstCategData(_id, code, img);
      dispatch(setBackToFirst(false));
    }
  }, [backToFirst, firstCategData, dispatch, sendFirstCategData]);

  const handleDiscount = () => {
    dispatch(setSelSecondCateg(null));
    goBackFunc();
    if (isDiscount === true) {
      dispatch(setIsHome(true));
      dispatch(setQuery({ isDiscount: null }));
    } else {
      dispatch(setIsHome(false));
      dispatch(setQuery({ isDiscount: true }));
      dispatch(
        setTitle({
          desp: t("shop.sidebar.discounted"),
          img: "",
        })
      );
    }
  };

  const handleNation = (nation) => () => {
    if (selSecondCateg) {
      dispatch(setSelSecondCateg(null));
    }
    if (selFirstCateg) {
      goBackFunc();
    }
    //re start
    if (nations.length >= 3 && !nations.find((n) => n === nation)) {
      // //console.log("back");
      dispatch(setIsHome(true));
      dispatch(setQuery({ nations: [] }));
    } else {
      if (nations.length >= 0) {
        const index = nations.indexOf(nation);
        //found duplicate nation
        if (index !== -1) {
          // //console.log("nations", nations);
          // //console.log("index", index);
          const newNations = [...nations];
          newNations.splice(index, 1);
          // //console.log("new", newNations);
          dispatch(setQuery({ nations: newNations }));
          if (newNations.length === 0) {
            dispatch(setIsHome(true));
          }
          dispatch(
            setTitle({
              desp: `Nationals ${newNations}`,
              img: "",
            })
          );
        } else {
          dispatch(setIsHome(false));
          dispatch(setQuery({ nations: [...nations, nation] }));
          dispatch(
            setTitle({
              desp: `Nationals ${[...nations, nation]}`,
              img: "",
            })
          );
        }
      }
    }
  };
  const view = useSelector((state) => state.root.view);
  const showDrawer = useSelector((state) => state.shop.showDrawer);
  return view === "web" ? (
    <ShopSideBarUI
      nations={nations}
      isDiscount={isDiscount}
      handleDiscount={handleDiscount}
      handleNation={handleNation}
      categs={categs}
      children={children}
      selFirstCateg={selFirstCateg}
      selSecondCateg={selSecondCateg}
      goBackFunc={goBackFunc}
      sendFirstCategData={sendFirstCategData}
      sendSecondCategData={sendSecondCategData}
    />
  ) : (
    <Drawer open={showDrawer} onClose={() => dispatch(setShowDrawer(false))}>
      <ShopSideBarUI
        nations={nations}
        isDiscount={isDiscount}
        handleDiscount={handleDiscount}
        handleNation={handleNation}
        categs={categs}
        children={children}
        selFirstCateg={selFirstCateg}
        selSecondCateg={selSecondCateg}
        goBackFunc={goBackFunc}
        sendFirstCategData={sendFirstCategData}
        sendSecondCategData={sendSecondCategData}
      />
    </Drawer>
  );
}
