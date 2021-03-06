import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core";
import { Paper, Button, Typography, Box, Container } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import Chip from "@material-ui/core/Chip";
import SchoolIcon from "@material-ui/icons/School";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import WorkIcon from "@material-ui/icons/Work";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import ClassIcon from "@material-ui/icons/Class";
import BusinessIcon from "@material-ui/icons/Business";
import axios from "axios";
import { authContext } from "../App";
import { user as serverResponse } from "./stub";
import {getUserProfileData} from "./graphql/queries"
import {useLocation} from "react-router-dom"

const mainColor = "#EDEDED";
const lightBlack = "#363636";
const accentColor = "#231F38";
const accentColor2 = "#1A1A1A";
const white = "#FAFAFA";

const useStyles = makeStyles((theme) => ({
  root: {
    // background: white, // to add or not to add
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
    padding: "24px 32px 0px",
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
    padding: "0 32px",
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
  profilePic: (props) => ({
    background: `url(${props.img}) grey`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    border: `solid 4px ${white}`,
    width: 128 + 32,
    height: 128 + 32,
    borderRadius: "100%",
    position: "absolute",
    top: -64 - 16,
  }),
  chipContainer: {
    textAlign: "left",
    // border: "solid blue 1px",
    "& > *": {
      margin: "4px 2px",
    },
  },

  content: {
    padding: 8,
    marginTop: 32,
    minHeight: 200,
    flex: 8,
    "& > *": {
      padding: "16px 16px",
      margin: "0px 8px 16px",
    },
  },
  buttonGroup: { minHeight: 72 },
  review: {
    margin: "32px 8px 42px",
    "& > *": {},
  },
  reviewHeader: {
    display: "flex",
    marginBottom: 16,
  },
  reviewImage: {
    marginRight: 8,
    width: 36,
    height: 36,
    borderRadius: "100%",
    background:
      "url(https://api.adorable.io/avatars/36/abott2@adorable.png) grey",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  reviewBody: {},

  asideRight: {
    marginTop: 32,
    padding: 8,
    flex: 3,
    "& > *": {
      marginBottom: 24,
    },
  },
  status: {},
  stat: {
    display: "flex",
    flexWrap: "wrap",
    margin: "0 0 8px",
    "& > *:first-child": {
      marginRight: 4,
      // color: lightBlack,
    },
    "& > *:nth-child(2)": {
      lineHeight: 1.2,
      marginRight: 8,
    },
  },
  statusButton: {
    "& > *": {
      width: "100%",
    },
  },
}));

const queryAll = `
{
  users{
    uuid
    username
    firstName
    lastName
    interests
    description
    role
    location
    department
  }
}
`;
const query = `
  {
    users(uuid: "a2isi4gs4t5ipaa39xunbd"){
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

export default function Profile({ match }) {
  // const {
  //   activeUser: [activeUser, setActiveUser],
  // } = useContext(authContext);
  const { activeUser, setActiveUser } = useContext(authContext);

  const classes = useStyles({ img: activeUser.profileImage });
  const [user, setUser] = useState(null);
  const [userPrivate, setUserPrivate] = useState(null);
  const [userReviews, setUserReviews] = useState([]);

  useEffect(() => {
    async function getUserProfile() {
      const response = await axios({
        url: "http://localhost:4000/graphql",
        method: "POST",
        data: {
          query: query,
        },
      });
      setUser(response.data.data.users[0]);
    }
    async function getReviews() {
      const responseAll = await axios({
        url: "http://localhost:4000/graphql",
        method: "POST",
        data: {
          query: queryAll,
        },
      });
      setUserReviews([...userReviews, responseAll.data.data.users]);
      console.log("responseall:", responseAll.data.data.users);
    }
    if (
      match.params.username !== undefined &&
      activeUser.username !== match.params.username
    ) {
      // Viewing logged in user profile
      // getUserProfile();
      console.log("viewing someone elses");
      getUserProfile();
      getReviews();
    } else {
      // Viewing someone elses profile
      console.log("personal");
      setUser(activeUser);
      getReviews();
    }
  }, [activeUser, match.params.username, userReviews]);

  if (!user) return <>Loading...</>;

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div className={classes.headerLeft}></div>
        <div className={classes.editProfile}>
          {user.username === activeUser.username && (
            <Box boxShadow={3}>
              <Button
                size="small"
                variant="contained"
                color="secondary"
                startIcon={<EditIcon />}
              >
                Edit Profile
              </Button>
            </Box>
          )}
        </div>
      </div>

      <Container className={classes.body}>
        <Box className={classes.asideLeft}>
          <Box
            boxShadow={3}
            // style={{ background: `url(${activeUser.profileImage}) grey` }}
            className={classes.profilePic}
          ></Box>
          <Typography variant="h6">
            {user && user.firstName} {user && user.lastName}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            Software Developer
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {user && user.role} at {user.department}
          </Typography>

          <br />
          <Box className={classes.chipContainer}>
            {user.interests.map((interest) => (
              <Chip label={interest} size="small" disabled key={interest} />
            ))}
          </Box>
          <br />
          <Box>
            <Typography variant="body2">{user.description}</Typography>
          </Box>
          <br />
          <br />
          <br />
          <Box display="flex" justifyContent="center">
            {user.username !== activeUser.username && (
              <Button
                size="medium"
                variant="contained"
                color="primary"
                startIcon={<SupervisorAccountIcon />}
              >
                Request
              </Button>
            )}
          </Box>
        </Box>

        <Box className={classes.content}>
          {/* <Paper className={classes.buttonGroup} variant="outlined"></Paper> */}
          <Paper variant="outlined">
            <Typography variant="h5" gutterBottom>
              Reviews
            </Typography>
            {/* {userReviews && userReviews.map((rev) => <div>test</div>)}
            {userReviews &&
              userReviews.map((rvw) => (
                <Box className={classes.review} key={rvw.username}>
                  <Box
                    display="flex"
                    alignItems="flex-end"
                    className={classes.reviewHeader}
                  >
                    <Box className={classes.reviewImage}></Box>
                    <Typography variant="h6">
                      {console.log("fname", rvw)} {rvw.lastName}
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="flex-end"
                    className={classes.reviewBody}
                  >
                    <Typography variant="body2" color="textSecondary">
                      {rvw && rvw.description}
                    </Typography>
                  </Box>
                </Box>
              ))} */}

            <Box className={classes.review}>
              <Box
                display="flex"
                alignItems="flex-end"
                className={classes.reviewHeader}
              >
                <Box className={classes.reviewImage}></Box>
                <Typography variant="h6">Oswald Prosacco</Typography>
              </Box>
              <Box
                display="flex"
                alignItems="flex-end"
                className={classes.reviewBody}
              >
                <Typography variant="body2" color="textSecondary">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  ut nisi urna. Cras elementum tempus sem sed efficitur. Ut
                  venenatis dui odio, sed euismod libero mattis at. Mauris
                  dapibus dignissim odio, quis sollicitudin enim imperdiet
                  euismod.
                </Typography>
              </Box>
            </Box>
            <Box className={classes.review}>
              <Box className={classes.reviewHeader}>
                <Box className={classes.reviewImage}></Box>
                <Typography variant="h6">Dale Ortega</Typography>
              </Box>
              <Box className={classes.reviewBody}>
                <Typography variant="body2" color="textSecondary">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  ut nisi urna. Cras elementum tempus sem sed efficitur. Ut
                  venenatis dui odio, sed euismod libero mattis at. Mauris
                  dapibus dignissim odio, quis sollicitudin enim imperdiet
                  euismod.
                </Typography>
              </Box>
            </Box>
            {/* <Typography variant="body1">
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
            </Typography> */}
          </Paper>
        </Box>
        <Box className={classes.asideRight}>
          <Box className={classes.status}>
            {user && user.isMentor && (
              <Box display="flex" alignItems="center" className={classes.stat}>
                <SupervisorAccountIcon color="secondary" />
                <Typography variant="subtitle1" color="textPrimary">
                  Mentor
                </Typography>
              </Box>
            )}

            {user && user.isMentee && (
              <Box display="flex" alignItems="center" className={classes.stat}>
                <SupervisorAccountIcon color="secondary" />
                <Typography variant="subtitle1" color="textPrimary">
                  Mentee
                </Typography>
              </Box>
            )}

            <Box display="flex" alignItems="center" className={classes.stat}>
              <BusinessIcon color="secondary" />
              <Typography variant="subtitle1" color="textPrimary">
                Location
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {user.location}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" className={classes.stat}>
              <SupervisorAccountIcon color="secondary" />
              <Typography variant="subtitle1" color="textPrimary">
                Industry Experience
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {user && user.yearsOfExperience} Years
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" className={classes.stat}>
              <SchoolIcon color="secondary" />
              <Typography variant="subtitle1" color="textPrimary">
                Education
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {user.education.school}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" className={classes.stat}>
              <WorkIcon color="secondary" />
              <Typography variant="subtitle1" color="textPrimary">
                Graduated
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {new Intl.DateTimeFormat("en-US", {
                  dateStyle: "short",
                }).format(new Date(user.education.gradDate))}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" className={classes.stat}>
              <MenuBookIcon color="secondary" />
              <Typography variant="subtitle1" color="textPrimary">
                Major
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {user.education.degreeType} in {user.education.major}
              </Typography>
            </Box>
          </Box>
          <br />
          <Box className={classes.statusButton}>
            <Button variant="contained" color="secondary" disableElevation>
              Action 1
            </Button>
          </Box>
          <Box className={classes.statusButton}>
            <Button variant="outlined" color="secondary" disableElevation>
              Action 2
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
