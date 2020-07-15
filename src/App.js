import "fontsource-roboto";
import "./App.css";
import React from "react";
import { makeStyles, CssBaseline } from "@material-ui/core";

import ApplicationBar from "./Components/ApplicationBar";
import Dashboard from "./Components/Dashboard";
import Profile from "./Components/Profile";
// Pages

const loggedIn = false;

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#EDEDED",
    height: "100vh",
    width: "100vw",
  },
  mainDisplay: {
    margin: "0px 150px 0px 150px",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* <ApplicationBar /> */}
      <div className={classes.mainDisplay}>
        <Profile />
        {/* <Dashboard /> */}
      </div>
    </div>
  );
}

export default App;
