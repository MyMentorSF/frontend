import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
  ListItemAvatar,
  Chip,
  Divider,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
    color: "white",
    width: "50em",
    maxWidth: "50em",
    maxHeight: "25em",
    height: "25em",
    background: "linear-gradient(180deg, #231F38 23%, #FAFAFA 23%)",
  },
  list: {
    width: "100%",
    color: "black",
    height: "80%",
    marginTop: 20,
    overflowY: "scroll",
  },
  listItem: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  title: {
    marginTop: 12,
  },
  chip: {
    margin: 2,
    color: "black",
    backgroundColor: "#E6E6FA",
  },
  chipContainer: {
    width: "100%",
    margin: 12,
  },
}));

const interests = [
  "React.js",
  "Machine Learning",
  "Telematics",
  "GraphQL",
  "InfoSec",
  "Angular",
  "Prometheus",
  "Grafana",
];

function MentorsDB() {
  const classes = useStyles();
  return (
    <Paper className={classes.card}>
      <Typography className={classes.title} variant="h5" color="inherit">
        Mentors:
      </Typography>
      <List className={classes.list}>
        {[0, 1, 2, 3, 4, 5, 6].map((value) => {
          return (
            <React.Fragment>
              <ListItem className={classes.listItem} key={value}>
                <ListItemAvatar>
                  <Avatar
                    alt={`Avatar ${value}`}
                    src={`https://api.adorable.io/avatars/285/${value}`}
                  />
                </ListItemAvatar>
                <ListItemText
                  id="switch-list-label-bluetooth"
                  primary="Colin Rosendahl"
                />
                <div className={classes.chipContainer}>
                  {interests.map((interest) => {
                    return (
                      <Chip
                        clickable
                        className={classes.chip}
                        label={interest}
                        variant="outlined"
                      />
                    );
                  })}
                </div>
              </ListItem>
              <Divider />
            </React.Fragment>
          );
        })}
      </List>
    </Paper>
  );
}

export default MentorsDB;
