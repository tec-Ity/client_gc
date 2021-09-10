import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { fetch_Prom } from "../../api";
import { useSelector, useDispatch } from "react-redux";
import { setShowLogin } from "../../redux/curClient/curClientSlice";
import { Container } from "@material-ui/core";
import HomeList from "./HomeList";
import HomeBanner from "./HomeBanner";

export default function HomePage() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.curClient.isLogin);
  const hist = useHistory();
  const [citys, setCitys] = useState();
  useEffect(() => {
    async function getCitys() {
      try {
        const resultCitys = await fetch_Prom("/Citas");
        // console.log("citas", resultCitys);
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
  console.log("home");
  return (
    <Container disableGutters maxWidth={false}>
      <HomeBanner
        handleFunc={() => {
          if (!isLogin) {
            dispatch(setShowLogin(true));
          }
        }}
      />
      <HomeList
        label='I nostri locali'
        list={citys}
        containerId='cityContainer'
        handleFunc={(id) => () => hist.push("/city/" + id)}
      />
    </Container>
  );
}
