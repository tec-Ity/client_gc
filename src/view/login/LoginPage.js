// import { Link } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { delete_Prom, post_Prom, get_Prom } from "../../api";
import ThirdParty from "./ThirdParty";
import LoginForm from "./LoginForm";
import { Grid, makeStyles, Paper } from "@material-ui/core";
export default function LoginPage() {
  const [showPhonePre, setShowPhonePre] = useState(false);
  const [nations, setNations] = useState([]);
  const [loginData, setLoginData] = useState({
    account: "",
    accountType: "phone",
    phonePre: "0039",
    password: "",
  });

  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "./thirdPartyLogin.js";
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "ThirdPartyLogin");

  useEffect(() => {
    async function getNation() {
      const result = await get_Prom("/Nations");
      const nations = result.data.objects;
      setNations(nations);
    }

    getNation();
  }, []);

  const isPhone = (valueIn) => {
    if (valueIn.length === 0) {
      setShowPhonePre(false);
    } else if (valueIn[0] === "+" && !isNaN(valueIn[1]) && !isNaN(valueIn[2])) {
      setLoginData((prev) => ({
        ...prev,
        phonePre: "00" + valueIn.substring(1, 3),
      }));
      setShowPhonePre(true);
      setLoginData((prev) => ({ ...prev, account: "" }));
    } else {
      if (valueIn.indexOf("@") !== -1) {
        setShowPhonePre(false);
      } else if (isNaN(valueIn)) {
        setShowPhonePre(false);
      } else if (valueIn.length > 6 && !isNaN(valueIn)) {
        setShowPhonePre(true);
      }
    }
  };

  const handleChange = (field) => (e) => {
    if (field === "account") {
      setLoginData((prev) => ({ ...prev, account: e.target.value }));
      isPhone(e.target.value);
    } else {
      setLoginData((prev) => ({ ...prev, [field]: e.target.value }));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const system = {};
    switch (loginData.accountType) {
      case "code":
        system.code = loginData.account;
        break;
      case "email":
        system.email = loginData.account;
        break;
      case "phone":
        system.phone = loginData.account;
        system.phonePre = loginData.phonePre;
        break;
      default:
        break;
    }

    system.pwd = loginData.password;
    console.log(system);
    const result = await post_Prom("/login", { system });
    console.log(result);
    if (result.status === 200) {
      localStorage.setItem("accessToken", result.data?.accessToken);
      localStorage.setItem("crClient", result.data?.crClient);
      localStorage.setItem("refreshToken", result.data?.refreshToken);
      localStorage.setItem("thirdPartyLogin", "");
      window.location.replace('/home');
    }
  };

  const classes = useStyles();
  return (
    <div>
      {!localStorage.getItem("accessToken") && (
        <Paper elevation={3} className={classes.paperStyle}>
          <Grid container direction='column' alignItems='center' spacing={2}>
            <Grid item className={classes.loginForm}>
              <LoginForm
                loginData={loginData}
                handleLogin={handleLogin}
                handleChange={handleChange}
                showPhonePre={showPhonePre}
                nations={nations}
              />
            </Grid>
            <Grid item>
              <span>or</span>
            </Grid>
            <Grid item>
              <ThirdParty />
            </Grid>
            <Grid item>
              <hr style={{ width: "500px" }} />
            </Grid>
            <Grid item style={{ marginBottom: "25px" }}>
              <span>Don't Have an Account? &nbsp;</span>
              <Link to='/register'>Register</Link>
            </Grid>
          </Grid>
        </Paper>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  paperStyle: {
    margin: "100px 300px",
  },
  loginForm: {
    width: "500px",
  },
  ThirdParty: {},
}));
