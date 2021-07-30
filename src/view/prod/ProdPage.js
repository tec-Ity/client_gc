import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { get_Prom, get_DNS } from "../../api";

export default function ProdPage() {
  const { _id } = useParams();
  const hist = useHistory();

  const [prodInfo, setProdInfo] = useState();

  useEffect(() => {
    async function getProdInfo() {
      try {
        const resultProdInfo = await get_Prom("/Prod/" + _id);
        console.log(resultProdInfo);
        if (resultProdInfo.status === 200) {
          setProdInfo(resultProdInfo.data.object);
        }
      } catch (e) {
        console.log(e);
      }
    }
    getProdInfo();
  }, [_id]);
  return (
    <div>
      {_id}
      <button onClick={() => hist.goBack()}>back</button>

      {prodInfo && (
        <div>
          <img
            src={get_DNS() + prodInfo.img_urls[0]}
            alt={_id}
            style={{ width: "200px", height: "200px", objectFit: "scale-down" }}
          />
          <div>
            <h1>{prodInfo.nome}</h1>
          </div>

          
        </div>
      )}
    </div>
  );
}
