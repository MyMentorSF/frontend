import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";

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
  avatar: {
    height: 100,
    width: 100,
    marginBottom: 12,
    borderRadius: "5px 20px 5px",
    boxShadow:
      "0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)",
  },
  title: {
    marginTop: 12,
  },
  chip: {
    margin: 12,
  },
}));

function Agenda() {
  const classes = useStyles();
  return (
    <Paper className={classes.card}>
      <Typography className={classes.title} variant="h5" color="inherit">
        Agenda
      </Typography>
    </Paper>
  );
}

export default Agenda;
