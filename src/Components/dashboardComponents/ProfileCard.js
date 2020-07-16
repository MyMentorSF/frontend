import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Avatar, Typography, Chip, Divider } from "@material-ui/core";

import profilePic from "../imgs/profile_pic.jpg";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    width: "50em",
    maxWidth: "50em",
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
  interestBox: {
    color: "#1A1A1A",
    marginTop: 20,
    height: "100%",
  },
  chip: {
    margin: 2,
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
  "Angular",
  "Prometheus",
  "Grafana",
  "Angular",
  "Prometheus",
];

function ProfileCard() {
  const classes = useStyles();
  return (
    <div>
      <Card className={classes.card} elevation={4}>
        <Avatar
          src={profilePic}
          className={classes.avatar}
          alt="profile picture"
        />
        <Typography variant="h6" style={{ color: "#1A1A1A" }}>
          Jezreel Aquitania
        </Typography>
        <Typography variant="subtitle1" style={{ color: "#1A1A1A" }}>
          Software Developer at Labs-PCAS Team Usual Suspects
        </Typography>

        <div style={{ marginTop: 20 }}>
          <Typography variant="overline">Interests:</Typography>
        </div>

        <Divider variation="inset" />
        <div className={classes.interestBox}>
          {interests.map((interest) => {
            return (
              <Chip
                clickable
                className={classes.chip}
                label={interest}
                color="primary"
              />
            );
          })}
        </div>
      </Card>
    </div>
  );
}

export default ProfileCard;
