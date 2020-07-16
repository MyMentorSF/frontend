import React, { useState, useEffect } from "react"
import { Paper, makeStyles, fade, TextField, Chip, Typography, Card, CardActionArea, CardContent, CardMedia, GridList, GridListTile, CardActions, Button } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import CircularProgress from "@material-ui/core/CircularProgress";
import { user } from "./stub"

const url = "https://randomapi.com/api/9d3e9cbd9a2aa361c180f5d83b7218d8"

const useStyles = makeStyles((theme) => ({
  searchBar: {
    padding: "3em",
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.35),
    },
  },
  titleTop: {
    marginBottom: "0.7em"
  },
  titleMid: {
    marginTop: "1em"
  },
  cardRoot: {
    minWidth: 275,
  },
  grid: {
    marginBottom: "0.2em",
  }
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
      const response = await fetch(url)
      const data = await response.json()

      if (active) {
        console.log(data?.results[0])
        setOptions(data?.results[0].privateProfile?.mentees ?? "")
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
          open={open}
          options={options}
          loading={loading}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          noOptionsText={"Enter for options"}
          getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
          style={{ fontSize: 15 }}
          renderInput={(params) => (
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
          )}
        />
      </Paper>

      <div>
        <Typography className={classes.titleMid}>Recommended</Typography>
        <Typography variant="body2">Based on your profile</Typography>
        <GridList cols={3}>
          {user.results[0].privateProfile.mentees.map((mentee, index) => (
            <GridListTile key={index} className={classes.grid}>
              <Card className={classes.cardRoot}>
                <CardActionArea>
                  <CardMedia
                    image={`https://api.adorable.io/avatars/285/${mentee.username}.png`}
                    title={`${mentee.firstName} ${mentee.lastName}`}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {`${mentee.firstName} ${mentee.lastName}`}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {`${mentee.description}`}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">View Profile</Button>
                </CardActions>
              </Card>
            </GridListTile>
          ))}      
        </GridList>
      </div>
    </>    
  )
}