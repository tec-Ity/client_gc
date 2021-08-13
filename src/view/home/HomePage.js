import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { fetch_Prom } from "../../api";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import Input from "@material-ui/core/Input";
import { setShowLogin } from "../../redux/curClient/curClientSlice";
import CartSkuCtrl from "../../modal/cart/CartSkuCtrl";
// import { OutlinedInput } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    /* Rectangle 443 */
    background:
      "linear-gradient(290.29deg, #91E8B3 -12.39%, #C0E57B 21.51%, #D6E57B 110.42%, #C0E57B 110.42%)",
    position: "absolute",
    height: "409px",
    left: "0px",
    right: "0px",
    top: "91px",
    borderRadius: "0px 0px 80px 0px",
  },
  ben: {
    /* Benvenuti! */
    position: "absolute",
    width: "508.03px",
    height: "69.45px",
    left: "calc(50% - 508.03px/2 + 1.28px)",
    top: "127px",
    fontFamily: "'Montserrat', sans-serif",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "60px",
    lineHeight: "73px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#1D1D38",
  },
  addrInput: {
    position: " absolute",
    width: " 450px",
    height: " 53px",
    left: " calc(50% - 450px/2)",
    top: " 216px",
    border: "none",
    background: " #FFFFFF",
    /* 0,0,20,0 - 10% */
    display: "flex",
    boxShadow: " 0px 0px 30px rgba(0, 0, 0, 0.1)",
    borderRadius: " 26.5px 26.5px 26.5px 0px",
  },

  inputBox: {
    fontSize: "20px",
    fontWeight: "400",
    border: "none",
    marginLeft: "10%",
    width: "70%",
    color: "#1D1D38",
    outline: "none",
    opacity: "1",

    fontFamily: "'Montserrat', sans-serif",
    "&:placeholder-shown": {
      opacity: "0.4",
    },
    // "&:focus": {
    //   // outline: "none",
    //   // borderColor:"white",
    //   color:"black",
    // },
  },
  testComp: {
    position: "absolute",
    top: "200px",
    left: "50px",
  },
});
export default function HomePage() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.curClient.isLogin);
  const hist = useHistory();
  const classes = useStyles();
  const [citys, setCitys] = useState();
  const addrPlaceHolder = "Qual è il tuo indirizzo?";
  useEffect(() => {
    async function getCitys() {
      try {
        const resultCitys = await fetch_Prom("/Citas");
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
      <div className={classes.root}>
        <div className={classes.ben}>
          <div>Benvenuti!</div>
        </div>

        <div className={classes.addrInput}>
          <input
            className={classes.inputBox}
            placeholder={addrPlaceHolder}
            onClick={() => {
              if (!isLogin) {
                dispatch(setShowLogin(true));
              }
            }}
          />
        </div>
      </div>
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
