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

const useStyle = makeStyles((theme) => ({
  root: {
    // border: "1px solid",
    fontSize: "14px",
    maxWidth: "240px",
    fontFamily: "Montserrat",
    color: "#1d1d38",
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
}));

export default function ShopSideBarUI(props) {
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

  const childrenList = useCallback(
    //return a list of second categs
    (categID) => {
      if (children && categID === children.far) {
        if (children.list.length > 0) {
          return (
            <List component='div' 
            key='childrenList'
            disablePadding>
              {children.list.map((children) => {
                return (
                  <ListItem
                    button
                    // className={classes.subItemStyle}
                    classes={{ root: classes.subItemStyle }}
                    selected={selSecondCateg === children._id}
                    key={children._id}
                    onClick={(e) => {
                      e.preventDefault();
                      selSecondCateg !== children._id &&
                        sendSecondCategData(children._id, children.code);
                    }}>
                    {children.code}
                  </ListItem>
                );
              })}
            </List>
          );
        } else {
          return (
            <ul>
              <li>暂无子分类</li>
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
        return (
          <>
            <ListItem
              classes={{ root: classes.liStyle }}
              button
              selected={selFirstCateg === categ._id}
              key={categ._id}
              id={categ._id + "categBar"}
              onClick={() => {
                selFirstCateg !== categ._id
                  ? sendFirstCategData(categ._id, categ.code)
                  : goBackFunc();
              }}>
              {categ.code}
            </ListItem>
            <Collapse
              in={categ._id === children?.far}
              key='childrenCollapse'
              timeout='auto'
              unmountOnExit>
              {childrenList(categ._id)}
            </Collapse>
          </>
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
    <Container className={classes.root} disableGutters>
      <div>&nbsp;</div>
      <CustomHr position={classes.customHr} />
      <List component='div' disablePadding>
        <ListItem
          button
          key='discountButton'
          classes={{ root: classes.liStyle }}
          selected={isDiscount}
          onClick={handleDiscount}>
          <span>Scontati</span>
        </ListItem>
      </List>
      <CustomHr position={classes.customHr} />
      <Grid container className={classes.nationStyle}>
        <Grid item xs={3}>
          <Button onClick={handleNation("CN")}>中</Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={handleNation("IT")}>意</Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={handleNation("JP")}>日</Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={handleNation("KR")}>韩</Button>
        </Grid>
      </Grid>
      <CustomHr position={classes.customHr} />
      <List component='nav' disablePadding>
        {categList}
      </List>
    </Container>
  );
}
