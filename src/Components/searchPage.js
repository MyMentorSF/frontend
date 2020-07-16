import React, { useState, useEffect } from "react"
import { Paper, makeStyles, TextField, Chip, Typography, Card, CardActionArea, CardContent, CardMedia, GridList, GridListTile, CardActions, Button } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import CircularProgress from "@material-ui/core/CircularProgress";
import { user } from "./stub"
import { NavLink } from "react-router-dom";

import dataArray from "../frontend.json"

const useStyles = makeStyles((theme) => ({
  searchBar: {
    padding: "3em",
    position: "relative",
  },
  titleTop: {
    marginBottom: "0.7em"
  },
  titleMid: {
    marginTop: "1em",
    marginBottom: "1.5em"
  },
  media: {
    // paddingTop: "56.25%",
    maxHeight: "285px"
  },
  grid: {
    marginTop: "20em"
  },
  navItem: {
    color: "inherit",
    textDecoration: "none",
  },
}))

export default function SearchBar({ props }) {
  const classes = useStyles()

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true
    if (!loading) {
      return undefined
    }
    (async () => {
      // const response = await fetch(url)
      // const data = await response.json()
      const data = dataArray
      const filteredData = data.filter((person) => person.isMentor === true)

      if (active) {
        console.log(data)
        setOptions(filteredData ?? "")
      }
    })();

    return () => {
      active = false;
    }
  }, [loading])

  useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])
    
  return (
    <>
      <Paper elevation={3} className={classes.searchBar}>
        <Typography variant="h2" className={classes.titleTop}>Search Mentor</Typography>

        <Autocomplete
          id="searchMentor"
          autoHighlight
          open={open}
          options={options}
          loading={loading}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          noOptionsText={"Enter for options"}
          getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
          style={{ fontSize: 15 }}
          renderInput={(params) => (
            <>
              
              <TextField
                {...params}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </>),
                  style: {
                    fontSize: 30
                  }
                }}
              />
              
            </>
          )}
        />
      </Paper>

      <Paper elevation={3} >
        <div className={classes.titleMid}>
          <Typography gutterBottom variant="h4">Recommended</Typography>
          <Typography variant="body2">Based on your profile</Typography>
        </div>
        <GridList cols={3} spacing={30}>
          {user.results[0].privateProfile.mentees.map((mentee, index) => (
            <GridListTile key={index} style={{
              height: "100%",
              width: "30%"
            }}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    component="img"
                    image={`https://api.adorable.io/avatars/285/${mentee.username}.png`}
                    // image={"https://source.unsplash.com/random"}
                    title={`${mentee.firstName} ${mentee.lastName}`}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {`${mentee.firstName} ${mentee.lastName}`}
                    </Typography>
                    <Typography variant="overline">{`${mentee.role}`}</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {`${mentee.description}`}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <NavLink className={classes.navItem} to={`/profile/${mentee.username}`}>
                    <Button
                      size="small"
                      color="primary"
                    >View Profile</Button>
                  </NavLink>
                </CardActions>
              </Card>
            </GridListTile>
          ))}      
        </GridList>
      </Paper>
    </>    
  )
}