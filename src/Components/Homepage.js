import React from "react";
import { Typography, makeStyles, Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBar: {
    flexGrow: 1,
    background: "primary",
  },
  navItem: {
    color: "inherit",
    textDecoration: "none",
  },
  bgImage: {
  },
  root: {
    zIndex: 100,
    backgroundColor: `${radial-gradient(#1a786a, 2de3c8)}`,
    height: "100vh"

  }
}));


export default function Homepage () {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Typography variant="h1">MyMentor</Typography>
        <NavLink to="/dashboard" className={classes.navItem}>
          <Button variant="outlined">Sign Up/Login</Button>
        </NavLink>
      </div>
    </>
  );
}
