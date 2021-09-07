import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import { useParams, useHistory } from "react-router";
import { fetch_Prom } from "../../api";
import HomeBanner from "../home/HomeBanner";
import HomeList from "../home/HomeList";

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
    <Container maxWidth={false} disableGutters>
      <HomeBanner />
      <HomeList
        list={shops}
        containerId='shopContainer'
        handleFunc={(id) => () => {
          hist.push("/shop/" + id);
        }}
      />
    </Container>
  );
}
