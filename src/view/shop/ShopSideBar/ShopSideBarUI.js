import React, { useCallback, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Collapse,
  Container,
  Grid,
  List,
  ListItem,
} from "@material-ui/core";
import CustomHr from "../../../component/global/modal/component/CustomHr";
import china from "../../../component/icon/china.svg";
import { ReactComponent as Italy } from "../../../component/icon/italy.svg";
import { ReactComponent as Japan } from "../../../component/icon/japan.svg";
import { ReactComponent as Korea } from "../../../component/icon/south korea.svg";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// import { setScrollNav } from "../../../redux/filter/filterSlice";
const useStyle = makeStyles((theme) => ({
  root: {
    // border: "1px solid",
    fontSize: "14px",
    maxWidth: "200px",
    fontFamily: "Montserrat",
    color: "#1d1d38",
    position: "sticky",
    top: "100px",
  },
  customHr: {
    width: "90%",
    marginTop: "5px",
    marginBottom: "5px",
  },
  nationStyle: {},
  subItemStyle: {
    paddingLeft: theme.spacing(4),
    fontSize: "12px",
    "&:hover": {
      color: "#C0E57B",
      background: "transparent",
    },
    "&.Mui-selected": {
      //   borderRadius: "500px 500px 500px 0",
      //   background:
      //     " linear-gradient(270deg, #91E8B3 0%, #C0E57B 100%, #C0E57B 100%)",
      fontWeight: "600",
      background: "transparent",
      color: "#C0E57B",
      "&:hover": {
        color: "#C0E57B",
        background: "transparent",
      },
    },
  },
  liStyle: {
    "&:hover": {
      borderRadius: "500px 500px 500px 0",
      background:
        "linear-gradient(270deg, rgba(145, 232, 179, 0.3) 0%, rgba(192, 229, 123, 0.3) 100%, rgba(192, 229, 123, 0.3) 100%)",
    },
    "&.Mui-selected": {
      fontWeight: "600",
      borderRadius: "500px 500px 500px 0",
      background:
        " linear-gradient(270deg, #91E8B3 0%, #C0E57B 100%, #C0E57B 100%)",
    },
  },
  selCategStyle: {},
  nationBtn: {
    // border: "1px solid",
    padding: "0",
    borderRadius: "100%",
    // maxWidth: "48px",
    width: "64px",
    height: "64px",
    "&:hover": {
      background: "transparent",
    },
    // background: "green",

    "& .MuiButton-label": {
      borderRadius: "100%",

      width: "48px",
      height: "48px",
      "&:hover": {
        backgroundImage:
          "linear-gradient(270deg, rgba(145, 232, 179, 0.3) 0%, rgba(192, 229, 123, 0.3) 100%, rgba(192, 229, 123, 0.3) 100%)",
        "& svg": {
          borderRadius: "100%",
        },
      },
    },
  },
  nationBtnSelected: {
    padding: "0",
    borderRadius: "100%",
    width: "64px",
    height: "64px",
    "&:hover": {
      background: "transparent",
    },
    "& .MuiButton-label": {
      borderRadius: "100%",
      width: "48px",
      height: "48px",
      background: "#c0e57b",
      "& svg": {
        borderRadius: "100%",
      },
    },
  },
  scrollNavStyle: {
    height: "100%",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  staticNavStyle: {
    overflowY: "hidden",
  },
}));

export default function ShopSideBarUI(props) {
  const { t } = useTranslation();
  const {
    isDiscount,
    handleDiscount,
    handleNation,
    categs,
    children,
    selFirstCateg,
    selSecondCateg,
    goBackFunc,
    sendFirstCategData,
    sendSecondCategData,
  } = props;
  const classes = useStyle();
  const [categList, setCategList] = useState();
  const [scrollNav, setScrollNav] = useState(false);
  const nations = useSelector((state) => state.filter.query.nations);
  // const dispatch = useDispatch()
  const scrollList = React.useRef(null);
  const sideBar = React.useRef(null);
  React.useEffect(() => {
    const handleScroll = () => {
      // //console.log("top", scrollList.current.getBoundingClientRect().top);
      // //console.log(
      //   "height",
      //   window.innerHeight - scrollList.current.getBoundingClientRect().top
      // );

      //   //console.log("inner", window.innerHeight);
      //   //console.log("top", scrollList.current.getBoundingClientRect().top);

      scrollList.current &&
        scrollList.current.getBoundingClientRect().top > 0 &&
        (scrollList.current.style.height =
          window.innerHeight -
          scrollList.current.getBoundingClientRect().top +
          "px");

      // //console.log(window.pageYOffset);
      // //console.log(sideBar.current.getBoundingClientRect().top);
      // //console.log(
      //   "top",
      //   window.pageYOffset - sideBar.current.getBoundingClientRect().top
      // );
      // //console.log("offset", window.pageYOffset);
      // //console.log("top", sideBar.current?.getBoundingClientRect().top);
      // //console.log(
      //   window.pageYOffset - sideBar.current?.getBoundingClientRect().top
      // );
      if (
        window.pageYOffset - sideBar.current?.getBoundingClientRect().top >
        240
      ) {
        // sideBar.current.style.position = "sticky";
        // sideBar.current.style.top = "100px";
        setScrollNav(true);
      } else {
        if (sideBar.current && sideBar.current.style.position === "fixed") {
          //   //console.log("-----------------");
          //   sideBar.current.style.position = "static";
          setScrollNav(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [categList]);

  const childrenList = useCallback(
    //return a list of second categs
    (categID) => {
      if (children && categID === children.far) {
        if (children.list.length > 0) {
          return (
            <List component="div" key="childrenList" disablePadding>
              {children.list.map((child) => {
                return (
                  <ListItem
                    button
                    // className={classes.subItemStyle}
                    classes={{ root: classes.subItemStyle }}
                    selected={selSecondCateg === child._id}
                    key={child._id}
                    onClick={(e) => {
                      e.preventDefault();
                      selSecondCateg !== child._id &&
                        sendSecondCategData(
                          child._id,
                          child.code,
                          children.farImg,
                          children.farCode
                        );
                    }}
                  >
                    {child.code}
                  </ListItem>
                );
              })}
            </List>
          );
        } else {
          return (
            <ul>
              <li key="noChild">暂无子分类</li>
            </ul>
          );
        }
      } else return null;
    },
    [children, classes.subItemStyle, selSecondCateg, sendSecondCategData]
  );

  useEffect(() => {
    const categList =
      categs &&
      categs?.map((categ) => {
        console.log(categ);

        return (
          <React.Fragment key={categ._id}>
            <ListItem
              classes={{ root: classes.liStyle }}
              button
              selected={selFirstCateg === categ._id}
              id={categ._id + "categBar"}
              onClick={() => {
                sendFirstCategData(categ._id, categ.code, categ.img_url);
                // selFirstCateg !== categ._id
                //   ? sendFirstCategData(categ._id, categ.code, categ.img_url)
                //   : goBackFunc();
              }}
            >
              {categ.code}
            </ListItem>
            <Collapse
              in={categ._id === children?.far}
              key="childrenCollapse"
              timeout="auto"
              unmountOnExit
            >
              {childrenList(categ._id)}
            </Collapse>
          </React.Fragment>
        );
      });
    setCategList(categList);
  }, [
    categs,
    children,
    childrenList,
    classes.liStyle,
    goBackFunc,
    selFirstCateg,
    selSecondCateg,
    sendFirstCategData,
  ]);

  return (
    <Container
      className={classes.root}
      maxWidth="xs"
      disableGutters
      ref={sideBar}
    >
      {/* <div>&nbsp;</div> */}
      <CustomHr position={classes.customHr} />
      <List component="div" disablePadding>
        <ListItem
          button
          key="discountButton"
          classes={{ root: classes.liStyle }}
          selected={isDiscount}
          onClick={handleDiscount}
        >
          <span>{t("shop.sidebar.discounted")}</span>
        </ListItem>
      </List>
      <CustomHr position={classes.customHr} />
      <Grid container className={classes.nationStyle}>
        <Grid item xs={3}>
          <Button
            className={
              nations.find((n) => n === "CN")
                ? classes.nationBtnSelected
                : classes.nationBtn
            }
            onClick={handleNation("CN")}
          >
            {/* <China /> */}
            <img src={china} alt="china" />
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            className={
              nations.find((n) => n === "IT")
                ? classes.nationBtnSelected
                : classes.nationBtn
            }
            onClick={handleNation("IT")}
          >
            <Italy />
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            className={
              nations.find((n) => n === "JP")
                ? classes.nationBtnSelected
                : classes.nationBtn
            }
            onClick={handleNation("JP")}
          >
            <Japan />
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            className={
              nations.find((n) => n === "KR")
                ? classes.nationBtnSelected
                : classes.nationBtn
            }
            onClick={handleNation("KR")}
          >
            <Korea />
          </Button>
        </Grid>
      </Grid>
      <CustomHr position={classes.customHr} />
      <div
        ref={scrollList}
        className={
          scrollNav === true ? classes.scrollNavStyle : classes.staticNavStyle
        }
      >
        <List component="nav" disablePadding>
          {categList}
        </List>
      </div>
    </Container>
  );
}
