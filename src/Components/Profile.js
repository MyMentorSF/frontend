import React from "react";
import { makeStyles } from "@material-ui/core";
import {
  Toolbar,
  IconButton,
  AppBar,
  Button,
  Typography,
  Box,
  Container,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import Chip from "@material-ui/core/Chip";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";

const mainColor = "#EDEDED";
const accentColor = "#231F38";
const accentColor2 = "#1A1A1A";
const white = "#FAFAFA";

const useStyles = makeStyles((theme) => ({
  root: {
    background: white,
    minHeight: "100vh",
  },
  header: {
    background: accentColor,
    // width: "100vw",
    height: "200px",
    padding: "16px 64px 0px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerLeft: {
    // border: "solid red 1px",
    height: "100%",
  },
  editProfile: {},

  body: {
    padding: "0 64px",
    borderRadius: 2,
    display: "flex",
    justifyContent: "space-between",
    "& > *": {
      // border: `solid 1px #f50057`,
      outline: "dotted 1px #f50057",
    },
  },
  asideLeft: {
    paddingTop: 64 + 24,
    minHeight: 200,
    flex: 3,
    position: "relative",
  },
  profilePic: {
    background: "grey",
    border: `solid 4px ${white}`,
    width: 128,
    height: 128,
    borderRadius: "100%",
    position: "absolute",
    top: -64,
    left: "calc(100% / 2)",
  },
  chipContainer: {
    textAlign: "left",
    border: "solid blue 1px",
    "& > *": {
      margin: "4px 4px",
    },
  },

  content: { minHeight: 200, flex: 8 },

  buttonGroup: { minHeight: 200 },

  asideRight: { flex: 3 },
}));

export default function Profile() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div className={classes.headerLeft}></div>
        <div className={classes.editProfile}>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            startIcon={<EditIcon />}
          >
            Edit Profile
          </Button>
        </div>
      </div>

      <Container className={classes.body}>
        <Box className={classes.asideLeft}>
          <Box boxShadow={3} className={classes.profilePic}></Box>
          <Typography variant="h6">Stephen Munoz</Typography>
          <Typography variant="subtitle2" color="textSecondary">
            Software Developer
          </Typography>
          <br />
          <Box className={classes.chipContainer}>
            <Chip label="Jr. Developer" size="small" disabled></Chip>
            <Chip label="Software Developer I" size="small" disabled></Chip>
            <Chip label="SD II" size="small" disabled></Chip>
            <Chip label="SD III" size="small" disabled></Chip>
          </Box>
          <br />
          <Box>
            <Typography variant="body2">
              Hi, my name is Stephen Munoz. I am a software developer.
            </Typography>
          </Box>
          <br />
          <br />
          <br />
          <Box display="flex" justifyContent="center">
            <Button
              size="small"
              variant="contained"
              color="primary"
              startIcon={<SupervisedUserCircleIcon />}
            >
              Request for Mentorship
            </Button>
          </Box>
        </Box>

        <Box className={classes.content}>
          <Box className={classes.buttonGroup}>Button Row</Box>
        </Box>
        <Box className={classes.asideRight}></Box>
      </Container>
    </div>
  );
}
