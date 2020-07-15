import React from "react";
import { makeStyles, Button, List, ListItem } from "@material-ui/core";
import { Toolbar, AppBar, Typography } from "@material-ui/core";

import Background from "../img/background.jpg";

const useStyles = makeStyles((theme) => ({
  appBar: {
    flexGrow: 1,
    background: "primary",
  },
  sectionOfIcons: {
    marginLeft: "auto",
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  bgImage: {
    minHeight: "100vh",
    backgroundColor: "#FFFFFF",
    backgroundImage: `url(${Background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
}));

const HomepageAppBar = () => {
  const classes = useStyles();
  return (
    <AppBar className={classes.appBar} position="static">
      <Toolbar>
        <Typography variant="h5">My Mentor</Typography>

        <div className={classes.sectionOfIcons}>
          <Button
            edge="end"
            aria-label="login or sign-up"
            aria-controls="menu"
            aria-haspopup="true"
            color="inherit"
            variant="outlined"
          >
            Sign Up/Login
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default function Homepage() {
  const classes = useStyles();

  return (
    <>
      {/* <HomepageAppBar /> */}
      <div className={classes.bgImage}>
        <List>
          <ListItem>Hello</ListItem>
          <ListItem>Hi</ListItem>
        </List>
      </div>
    </>
  );
}
