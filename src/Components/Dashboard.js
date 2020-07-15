import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

import ProfileCard from "./dashboardComponents/ProfileCard";
import Calendar from "./dashboardComponents/Calendar";
import Agenda from "./dashboardComponents/Agenda";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "20px",
  },
}));

function Dashboard() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container direction="row" spacing={3}>
        <Grid item>
          <Grid container direction="column" spacing={7}>
            <Grid item>
              <ProfileCard />
            </Grid>
            <Grid item>
              <Agenda />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Calendar />
        </Grid>
        {/* Insert list of mentors here into another Grid item */}
      </Grid>
    </div>
  );
}

export default Dashboard;
