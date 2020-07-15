import React, { useState, useEffect } from "react"
import { Paper, makeStyles, fade, TextField, Chip } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import SearchIcon from "@material-ui/icons/Search";
import CircularProgress from "@material-ui/core/CircularProgress";

const url = "https://randomapi.com/api/9d3e9cbd9a2aa361c180f5d83b7218d8"

const useStyles = makeStyles((theme) => ({
  searchBar: {
    marginTop: "4em",
    padding: "2em",
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.35),
    },
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
        <div>
          <SearchIcon />
        </div>
        <Autocomplete
          id="searchMentor"
          open={open}
          options={options}
          loading={loading}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          noOptionsText={"Enter a name for options"}
          getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search for Mentor"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>)
              }}
            />
          )}
        />
      </Paper>
    </>    
  )
}