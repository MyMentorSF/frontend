import React, { useState, useEffect } from "react"
import { Paper, makeStyles, TextField, Chip, Typography, Card, CardActionArea, CardContent, CardMedia, GridList, GridListTile, CardActions, Button } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import CircularProgress from "@material-ui/core/CircularProgress";
import { user } from "./stub"
import { NavLink } from "react-router-dom";
import { getAllUserData } from "./graphql/queries"


const useStyles = makeStyles((theme) => ({
  searchBar: {
    marginTop: "1.5em",
    marginBottom: "3em",
    padding: "3em",
    position: "relative",
  },
  titleTop: {
    marginBottom: "0.7em"
  },
  titleMid: {
    marginTop: "1em",
    marginBottom: "3em"
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
  recommend: {
    padding: "3em",

  }
}))

export default function SearchBar({ props }) {
  const classes = useStyles()

  const [open, setOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState()
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true
    if (!loading) {
      return undefined
    }
    (async () => {
      const response = await getAllUserData()
      const filteredData = response?.users?.filter((person) => person.isMentor === true)

      if (active) {
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
    
  const handleOnChange = (event, value) => {
    if (value) setSelectedMentor(value)
    else setSelectedMentor("")
    console.log(value, event)
  }

  var style = {
    float: "left",
    width: "100%",
    paddingRight: "0.3em"
  }

  return (
    <>
      <Paper elevation={3} className={classes.searchBar}>
        <Typography variant="h2" className={classes.titleTop}>Search Mentor</Typography>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Autocomplete
            id="searchMentorForm"
            autoHighlight
            value={selectedMentor ?? ""}
            open={open}
            options={options.map((option) => `${option.firstName} ${option.lastName}`)}
            loading={loading}
            onChange={(event, value) => handleOnChange(event, value)}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            noOptionsText={"Enter for options"}
            // getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
            style={{ fontSize: 15, ...style }}
            renderInput={(params) => (
              <>
                <TextField
                  fullWidth
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
          {(selectedMentor) ?
            <NavLink to={`/profile/${selectedMentor.username}`} className={classes.navItem}>
              <Button
                variant="outlined"
                color="primary"
              >
                View Profile
              </Button>
            </NavLink>
            : null}
        </div>
        <br />
        <Typography variant="caption" component="p">Start typing an interest</Typography>
      </Paper>

      <Paper elevation={3} className={classes.recommend}>
        <div className={classes.titleMid}>
          <Typography variant="h4">Mentor Recommendations</Typography>
          <Typography variant="body1">Based on your profile</Typography>
        </div>
        <GridList cols={3} spacing={30}>
          {options.map((mentor, index) => {
            if (index < 6) {
              return (
                <GridListTile key={index} style={{
                  height: "100%",
                  width: "30%"
                }}>
                  <Card>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        component="img"
                        image={`https://api.adorable.io/avatars/285/${mentor.username}.png`}
                        // image={"https://source.unsplash.com/random"}
                        title={`${mentor.firstName} ${mentor.lastName}`}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {`${mentor.firstName} ${mentor.lastName}`}
                        </Typography>
                        <Typography variant="overline">{`${mentor.role}`}</Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {`${mentor.description}`}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <NavLink className={classes.navItem} to={`/profile/${mentor.username}`}>
                        <Button
                          size="small"
                          color="primary"
                          variant="outlined"
                        >View Profile</Button>
                      </NavLink>
                    </CardActions>
                  </Card>
                </GridListTile>
              )
            }
            return null
          })}      
        </GridList>
      </Paper>
    </>    
  )
}