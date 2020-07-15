import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { Paper, Button, Typography, Box, Container } from "@material-ui/core";
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
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "1280px",
  },
  header: {
    background: `url(https://source.unsplash.com/random) ${accentColor}`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "200px",
    padding: "24px 64px 0px",
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
      // outline: "dotted 1px #f50057",
    },
  },
  asideLeft: {
    paddingTop: 64 + 45,
    minHeight: 200,
    flex: 3,
    position: "relative",
  },
  profilePic: {
    background:
      "url(https://api.adorable.io/avatars/285/abott@adorable.png) grey",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    border: `solid 4px ${white}`,
    width: 128 + 32,
    height: 128 + 32,
    borderRadius: "100%",
    position: "absolute",
    top: -64 - 16,

    // left: "calc(128px / 2)",
  },
  chipContainer: {
    textAlign: "left",
    // border: "solid blue 1px",
    "& > *": {
      margin: "4px 4px",
    },
  },

  content: {
    padding: 8,
    minHeight: 200,
    flex: 8,
    "& > *": {
      padding: "16px 16px",
      margin: "16px 8px",
    },
  },

  buttonGroup: { minHeight: 200 },

  asideRight: { flex: 3 },
}));

export default function Profile() {
  const classes = useStyles();
  // const [headerImage, setHeaderImage] = useState(accentColor);

  // useEffect(() => {
  //   fetch("https://source.unsplash.com/random")
  // }, []);

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
          <Box display="flex" justifyContent="center">
            <Button
              size="medium"
              variant="contained"
              color="primary"
              startIcon={<SupervisedUserCircleIcon />}
            >
              Request
            </Button>
          </Box>
        </Box>

        <Box className={classes.content}>
          <Paper className={classes.buttonGroup}></Paper>
          <Paper>
            <Typography variant="subtitle2" gutterBottom>
              Interests
            </Typography>

            <Typography variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              convallis pulvinar felis, id ultrices lorem dignissim vitae. Cras
              sit amet sapien purus. Sed auctor consequat dui, suscipit blandit
              libero convallis rutrum. Curabitur vel lorem eros. Suspendisse ut
              felis odio. Integer imperdiet tincidunt libero sit amet ultricies.
              Proin dignissim, mi at pellentesque imperdiet, augue risus
              facilisis purus, bibendum feugiat dolor orci a massa. Sed aliquet,
              nibh nec venenatis molestie, lacus urna rutrum arcu, eget
              facilisis diam ligula molestie nisl. Nullam cursus ac augue ac
              ornare.
            </Typography>
            <br />
            <Typography variant="body1">
              Praesent a velit in quam dictum elementum. Nam viverra urna non
              urna bibendum, vitae molestie ex molestie. Pellentesque tempor
              sodales orci vel pretium. Integer sit amet interdum velit.
              Praesent bibendum dolor id sapien tristique, vitae finibus orci
              vestibulum. Suspendisse mattis eu est eget congue. Maecenas
              pulvinar sit amet sem sed convallis. Vestibulum scelerisque id mi
              at pellentesque.
            </Typography>
          </Paper>
        </Box>
        <Box className={classes.asideRight}></Box>
      </Container>
    </div>
  );
}
