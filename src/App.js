import "fontsource-roboto";
import "./App.css";
import React, { useState, createContext } from "react";
import { makeStyles, CssBaseline } from "@material-ui/core";
import ApplicationBar from "./components/ApplicationBar";
// import authContext from "./authContext";

// Pages
import Dashboard from "./components/Dashboard";
import Homepage from "./components/Homepage";
import Profile from "./components/Profile";

import { Route, Redirect, Switch } from "react-router-dom";
import SearchPage from "./components/searchPage";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#EDEDED",
    minHeight: "100vh",
    width: "100vw",
  },
  mainDisplay: {
    margin: "0px 150px 0px 150px",
  },
}));
const currentUser = {
  uuid: "12512512",
  username: "Maryjane Dicki",
  profileImage: "https://api.adorable.io/avatars/240/abott2@adorable2.png",
};

const activeUserData = {
  profileImage: "https://api.adorable.io/avatars/240/abott2@adorable2.png",
  username: "Nicklaus.Balistreri51",
  email: "Daisy41@yahoo.com",
  firstName: "Alysa",
  lastName: "Roob",
  pronoun: "She",
  age: 20,
  yearsOfExperience: 3,
  description:
    "Optio commodi dolorem aut totam. Sit molestiae voluptatum quia aspernatur.",
  isMentor: false,
  isMentee: true,
  role: "Intern",
  department: "ET",
  location: "Bloomington",
  interests: ["Claims", "Graphql", "Data Science"],
  education: {
    school: "Yale",
    gradDate: "2020-10-26T02:49:29.739Z",
    major: "Computer Science",
    degreeType: "Masters",
  },
  uuid: "asjr8zhjwaqea7pi3138w7n",
  mentors: [
    {
      mentorUUID: "aentvjekqnoabs0v4on9z9",
      menteeUUID: "asjr8zhjwaqea7pi3138w7n",
      confirmed: true,
    },
  ],
  mentees: [],
  agenda: [
    {
      title: "voluptatibus corrupti voluptatem dolor placeat",
      summary:
        "Quo qui culpa at aspernatur qui deserunt at aperiam. Est ad eos quo quidem veritatis iure omnis.",
      location: "Atlanta",
      startDate: "2020-07-27T20:15:00.000Z",
      endDate: "2020-07-27T21:15:00.000Z",
      id: "uszjo5rd3o7vljx7c8crk",
      host: "Alexis.Frami",
      guest: "Nicklaus.Balistreri51",
      hostEmail: "Makenzie_Ryan@gmail.com",
      guestEmail: "Daisy41@yahoo.com",
      guestConfirmed: true,
    },
  ],
};

const authContext = createContext();

function App() {
  const classes = useStyles();
  const [activeUser, setActiveUser] = useState(activeUserData);

  return (
    <authContext.Provider value={{ activeUser, setActiveUser }}>
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
            <Route exact path="/profile/:username" component={Profile} />
            <Route exact path="/search" component={SearchPage} />
          </Switch>
        </div>
      </div>
    </authContext.Provider>
  );
}

export default App;
export { authContext };
