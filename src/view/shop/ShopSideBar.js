import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSelFirstCateg,
  setSelSecondCateg,
  setIsHome,
  setQuery,
  setTitle,
  setBackToFirst,
} from "../../redux/filter/filterSlice";

export default function ShopSideBar(props) {
  const { categs } = props;
  const [children, setChildren] = useState();
  const [firstCategData, setFirstCategData] = useState({
    _id: "",
    code: "",
  });

  const dispatch = useDispatch();
  const selFirstCateg = useSelector((state) => state.filter.selFirstCateg);
  const selSecondCateg = useSelector((state) => state.filter.selSecondCateg);
  const backToFirst = useSelector((state) => state.filter.backToFirst);
  // const isHome = useSelector((state) => state.filter.isHome);
  // console.log(categs);

  useEffect(() => {
    selFirstCateg === null && setChildren([]);
  }, [selFirstCateg, selSecondCateg]);

  const sendFirstCategData = (categId, categCode) => {
    setFirstCategData({ _id: categId, code: categCode });
    displayChildren(categId);
    dispatch(setSelFirstCateg(categId));
    dispatch(setIsHome(false));
    dispatch(
      setTitle({
        desp: categCode,
        img: "",
      })
    );
    const selChildren = categs.find((item) => item._id === categId).Categ_sons;

    dispatch(
      setQuery({
        categs: selChildren?.map((child) => child._id),
      })
    );

    // else {
    //   dispatch(setSelFirstCateg(null));
    // }
  };

  useEffect(() => {
    if (backToFirst === true) {
      const { _id, code } = firstCategData;
      sendFirstCategData(_id, code);
      dispatch(setBackToFirst(false));
    }
  }, [backToFirst, firstCategData]);

  const sendSecondCategData = (categId, categCode) => {
    if (categId !== selSecondCateg) {
      dispatch(setIsHome(false));
      dispatch(setSelSecondCateg(categId));
      dispatch(
        setTitle({
          desp: categCode,
          img: "",
        })
      );
      dispatch(
        setQuery({
          categs: [categId],
        })
      );
    }
  };

  const displayChildren = (_id) => {
    const children = categs.find((item) => item._id === _id).Categ_sons;
    setChildren({ far: _id, list: children });
  };

  const childrenList = (categID) => {
    if (children && categID === children.far) {
      if (children.list.length > 0) {
        return (
          <ul>
            {children.list.map((children) => {
              return (
                <li
                  key={children._id}
                  onClick={(e) => {
                    e.preventDefault();
                    selSecondCateg !== children._id &&
                      sendSecondCategData(children._id, children.code);
                  }}>
                  {children.code}
                </li>
              );
            })}
          </ul>
        );
      } else {
        return (
          <ul>
            <li>暂无子分类</li>
          </ul>
        );
      }
    } else return null;
  };

  const categList =
    categs &&
    categs.map((categ) => {
      return (
        <li key={categ._id}>
          <span
            id={categ._id}
            onClick={() => {
              selFirstCateg !== categ._id &&
                sendFirstCategData(categ._id, categ.code);
            }}>
            {categ.code}
          </span>
          {childrenList(categ._id)}
        </li>
      );
    });

  return (
    <nav style={{ border: "1px solid" }}>
      Categlist
      <ul>{categList}</ul>
    </nav>
  );
}
