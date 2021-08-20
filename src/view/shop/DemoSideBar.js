import React, { useState } from "react";
import CustomHr from "../../component/global/modal/component/CustomHr";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import Radio from "@material-ui/core/Radio";
import ListItemText from "@material-ui/core/ListItemText";

const useStyle = makeStyles((theme) => ({
  root: {
    // border: "1px solid",
    maxWidth: "240px",
    fontFamily: "Montserrat",
  },
  customHr: {
    width: "90%",
    marginTop: "5px",
    marginBottom: "5px",
  },
  subItem: {
    paddingLeft: theme.spacing(5),
  },
  flexStyle: {
    padding: "0",
    width: "100%",
    display: "felx",
    justifyContent: "space-around",
  },
  discountRadio: {
    color: "#1d1d38",
    "& .Mui-checked": {
      color: "#1d1d38",
    },
  },
  categStyle: {
    // background: "green",

    "&.Mui-selected": {
      background: "green",
    },
  },
//   selCategStyle: {
//     background: "green",
//   },
}));

const StyledListItem = withStyles({
  root: {
    backgroundColor: "blue",
    "&.Mui-selected": {
      backgroundColor: "green",
    },
  },
})(ListItem);

export default function DemoSideBar() {
  const classes = useStyle();
  const [isDiscount, setIsDiscount] = useState(false);
  return (
    <Container className={classes.root}>
      <div>&nbsp;</div>
      <CustomHr position={classes.customHr} />
      <List component='div' disablePadding>
        <ListItem className={classes.flexStyle}>
          <div>Scontati</div>
          <Radio
            classes={{ root: classes.discountRadio }}
            checked={isDiscount}
            color='default'
            onClick={() => setIsDiscount((prev) => !prev)}
          />
        </ListItem>
      </List>
      <CustomHr position={classes.customHr} />
      <Grid container>
        <Grid item xs={3}>
          <Button>中</Button>
        </Grid>
        <Grid item xs={3}>
          <Button>意</Button>
        </Grid>
        <Grid item xs={3}>
          <Button>日</Button>
        </Grid>
        <Grid item xs={3}>
          <Button>韩</Button>
        </Grid>
      </Grid>
      <CustomHr position={classes.customHr} />
      <Container>
        <List component='nav'>
          <StyledListItem selected>with styled list item</StyledListItem>
          <ListItem
            button
            selected
            classes={{
              root: classes.categStyle,
              selected: classes.selCategStyle,
            }}>
            <ListItemText primary='List Item' />
          </ListItem>
          <ListItem button className={classes.categStyle}>
            <div>categ1</div>
          </ListItem>
          <List component='div' disablePadding>
            <ListItem button className={classes.subItem}>
              categ1.1
            </ListItem>
            <ListItem button className={classes.subItem}>
              categ1.1
            </ListItem>
            <ListItem button className={classes.subItem}>
              categ1.1
            </ListItem>
            <ListItem button className={classes.subItem}>
              categ1.1
            </ListItem>
            <ListItem button className={classes.subItem}>
              categ1.1
            </ListItem>
          </List>
          <ListItem button>categ1</ListItem>
          <ListItem button>categ1</ListItem>
          <ListItem button>categ1</ListItem>
          <ListItem button>categ1</ListItem>
          <ListItem button>categ1</ListItem>
          <ListItem button>categ1</ListItem>
          <ListItem button>categ1</ListItem>
          <ListItem button>categ1</ListItem>
          <ListItem button>categ1</ListItem>
          <ListItem button>categ1</ListItem>
          <ListItem button>categ1</ListItem>
          <ListItem button>categ1</ListItem>
          <ListItem button>categ1</ListItem>
          <ListItem button>categ1</ListItem>
          <ListItem button>categ1</ListItem>
        </List>
      </Container>
    </Container>
  );
}
