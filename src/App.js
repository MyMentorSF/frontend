import "fontsource-roboto";
import "./App.css";
import React from "react";
import { makeStyles, CssBaseline } from "@material-ui/core";
import ApplicationBar from "./components/ApplicationBar";

// Pages
import Dashboard from "./components/Dashboard";
import Homepage from "./Components/Homepage";

import { Route, Redirect, Switch } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#EDEDED",
    height: "100vh",
    width: "100vw",
  },
  mainDisplay: {
    display: "flex",
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
            <Redirect to="/homepage" />
          </Route>
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
