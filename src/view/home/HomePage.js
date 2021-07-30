import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { get_Prom } from "../../api";

export default function HomePage() {
  const hist = useHistory();
  const [citys, setCitys] = useState();

  useEffect(() => {
    async function getCitys() {
      try {
        const resultCitys = await get_Prom("/Citas");
        if (resultCitys.status === 200) {
          setCitys(resultCitys.data.objects);
        } else {
          console.log(resultCitys.message);
        }
      } catch (e) {
        console.log(e);
      }
    }
    getCitys();
  }, []);

  return (
    <div>
      <h1>HOME PAGE</h1>
      {citys &&
        citys.map((city) => {
          return (
            <button
              key={city._id}
              id={city._id}
              onClick={(e) => {
                console.log(e.target.id);
                hist.push("/city/" + e.target.id);
              }}>
              {city.nome}
            </button>
          );
        })}
    </div>
  );
}
