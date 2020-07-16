import React, { useContext, useState } from "react";
import { makeStyles, List, ListItem, ListItemAvatar, ListItemText, Popover } from "@material-ui/core";
import {
  Toolbar,
  IconButton,
  AppBar,
  Typography,
  ButtonBase,
  Avatar,
} from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import { authContext } from "../App";
import logo from "./imgs/profile_pic.jpg";

// Icons
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SearchIcon from "@material-ui/icons/Search";
import Calendar from "@material-ui/icons/DateRange";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBar: {
    flexGrow: 1,
    zIndex: 100,
    backgroundColor: "#32a8a6",
  },
  title: {
    fontFamily: "Roboto",
    fontSize: "1rem",
    fontWeight: 400,
  },
  sectionOfIcons: {
    marginLeft: "auto",
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  avatar: {
    margin: theme.spacing(1),
    height: "42px",
    width: "42px",
    borderRadius: "4px",
  },
  navItem: {
    color: "inherit",
    textDecoration: "none",
  },
}));

function ApplicationBar() {
  const { activeUser, setActiveUser } = useContext(authContext);
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState()

  const classes = useStyles();

  const handleNotifClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  return (
    <AppBar className={classes.appBar} position="static">
      <Toolbar color="inherit">
        <NavLink to="/dashboard" className={classes.navItem}>
          <ButtonBase focusRipple color="inherit">
            <img
              className={classes.avatar}
              src={activeUser.profileImage}
              alt="Logo"
            />
            <Typography className={classes.title}>MY MENTOR</Typography>
          </ButtonBase>
        </NavLink>
        <div className={classes.sectionOfIcons}>
          <IconButton aria-label="show new messages" color="inherit">
            <Badge badgeContent={0} color="secondary">
              {/*Replace badgeContent with notificaton counters*/}
              <MailIcon />
            </Badge>
          </IconButton>
          <IconButton aria-label="show new notifications" color="inherit" onClick={handleNotifClick}>
            <Badge badgeContent={5} color="primary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Popover
            id="notifications"
            open={open}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            {}
          </Popover>
            

          <NavLink to="/search" className={classes.navItem}>
            <IconButton aria-label="search mentors" color="inherit">
              <SearchIcon />
            </IconButton>
          </NavLink>
          <NavLink to="/dashboard" className={classes.navItem}>
            <IconButton aria-label="check events" color="inherit">
              <Calendar />
            </IconButton>
          </NavLink>
          <NavLink to="/profile/" className={classes.navItem}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls="menu"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </NavLink>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default ApplicationBar;
