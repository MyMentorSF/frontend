import "fontsource-roboto";
import "./App.css";
import React from "react";
import { makeStyles, CssBaseline } from "@material-ui/core";
import ApplicationBar from "./components/ApplicationBar";

// Pages
import Dashboard from "./components/Dashboard";
import Homepage from "./components/Homepage";
import Profile from "./components/Profile";

import { Route, Redirect, Switch } from "react-router-dom";
import SearchPage from "./components/searchPage";

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
      <ApplicationBar />
      <CssBaseline />
      <div className={classes.mainDisplay}>
        <Switch>
          <Route exact path="/" component={Homepage}>
            {/* TODO AppBar different for logged in and homepage */}
            <Redirect to="/homepage" />
          </Route>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/profile/" component={Profile} />
          <Route exact path="/profile/:uuid" component={Profile} />
          <Route exact path="/search" component={SearchPage} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
