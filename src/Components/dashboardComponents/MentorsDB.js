import React, { useContext, useEffect, useState } from "react";
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
import { authContext } from "../../App";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
    color: "white",
    width: "50em",
    maxWidth: "50em",
    maxHeight: "25em",
    height: "25em",
    background: "linear-gradient(180deg, #42331D 23%, #FAFAFA 23%)",
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
    color: "#42331D",
    backgroundColor: "#fafafa",
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

const query = `
  query{
    connections{
      mentorUUID
      menteeUUID
      confirmed
    }
  }
`;
const queryUsers = (uuid) => `
{
  users(uuid: "${uuid}"){
    uuid
    username
    interests
    email
    firstName
    lastName
    pronoun
    yearsOfExperience
    description
    role
    location
    department
    education{
      school
      gradDate
      degreeType
      major
    }
  }
}
`;

function MentorsDB() {
  const classes = useStyles();
  const { activeUser } = useContext(authContext);
  const [mentors, setMentors] = useState([]);
  useEffect(() => {
    async function getUserProfile(uuid) {
      const response = await axios({
        url: "http://localhost:4000/graphql",
        method: "POST",
        data: {
          query: queryUsers(uuid),
        },
      });
      console.log("RESS", response.data.data.users[0]);
      setMentors([...mentors, response.data.data.users[0]]);
    }
    (async () => {
      const response = await axios({
        url: "http://localhost:4000/graphql",
        method: "POST",
        data: {
          query: query,
        },
      });
      console.log("response", response.data.data.connections);
      // filter for where activeUser is a mentee
      const filteredResponse = response?.data?.data?.connections?.filter(
        (resp) => resp.menteeUUID === "a2isi4gs4t5ipaa39xunbd"
      );
      console.log("filted", filteredResponse);
      // setMentors(filteredResponse);
      if (filteredResponse) {
        filteredResponse.map((resp) => {
          getUserProfile(resp.mentorUUID);
        });
      }
    })();
  }, [mentors]);

  return (
    <Paper className={classes.card} elevation={4}>
      <Typography className={classes.title} variant="h5" color="inherit">
        Mentors
      </Typography>

      <List className={classes.list}>
        {mentors &&
          mentors.map((value) => {
            return (
              <React.Fragment key={value}>
                <ListItem className={classes.listItem} key={value}>
                  <ListItemAvatar>
                    <Avatar
                      alt={`Avatar ${value}`}
                      src={`https://api.adorable.io/avatars/285/${value}`}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    id="switch-list-label-bluetooth"
                    primary={`${value.firstName} ${value.lastName}`}
                    secondary={`Experience: ${value.yearsOfExperience}`}
                  />

                  <div className={classes.chipContainer}>
                    {value.interests &&
                      value.interests.map((interest) => {
                        return (
                          <Chip
                            key={interests}
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
