import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { fetch_Prom } from "../../api";

export default function City() {
  const { _id } = useParams();
  const hist = useHistory();
  const [shops, setShops] = useState();

  useEffect(() => {
    async function getShops() {
      try {
        const resultShops = await fetch_Prom("/Shops?serve_Citas=" + [_id]);
        if (resultShops.status === 200) {
          // console.log(resultShops.data.objects);
          setShops(resultShops.data.objects);
        } else {
          console.log(resultShops.message);
        }
      } catch (e) {
        console.log(e);
      }
    }
    getShops();
  }, [_id]);

  return (
    <>
      <h1>CITY</h1>
      <div>display shoplist of city {_id}</div>
      <button
        onClick={() => {
          hist.goBack();
        }}>
        返回
      </button>

      {shops &&
        shops.map((shop) => {
          return (
            <button
              key={shop._id}
              id={shop._id}
              onClick={(e) => {
                console.log(e.target.id);
                hist.push("/shop/" + e.target.id);
              }}>
              {shop.nome + " " + shop.addr}
            </button>
          );
        })}
    </>
  );
}
