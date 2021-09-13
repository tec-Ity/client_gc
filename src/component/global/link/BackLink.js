import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as BackArrow } from "../../icon/chevron-left.svg";
import { Link } from "react-router-dom";
import clsx from "clsx";
const useStyle = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "250px",
    height: "15px",
    textDecoration: "none",
    fontSize: "12px",
    color: "#1d1d38",
    "&:visited": {
      color: "#1d1d38",
    },
  },
});
export default function BackLink(props) {
  const { label, link, style } = props;
  const classes = useStyle();
  return (
    <Link to={link} className={clsx(classes.root, style)}>
      <BackArrow />
      <span>{label}</span>
    </Link>
  );
}
