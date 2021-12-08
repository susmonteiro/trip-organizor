import * as React from 'react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

export default function SearchView(props) {
  return (
    <Box ml={2} mr={2}>
      <Button
        // TODO buttons move when error in text field is shown
        variant="contained"
        onClick={() => props.onNotSearching()}
        startIcon={<ArrowBackIosNewIcon />}>
        Back
      </Button>
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        mt={1}
        alignItems="flex-end"
        onKeyUp={(event) => event.key === 'Enter' && props.onSearch()}>
        <Grid item lg="12" md="12" xs="12">
          <TextField
            id="search-bar"
            value={props.query || ''}
            label="Search"
            variant="standard"
            fullWidth
            error={props.showHelpText}
            helperText={props.showHelpText && 'Name cannot be empty'}
            onChange={(event) => props.onChangeQuery(event.target.value)}
            sx={{ minWidth: 200 }}
          />
        </Grid>
        <Grid item lg="5" md="4" xs="5">
          <FormControl variant="standard" fullWidth>
            <InputLabel id="select-type-input">Type</InputLabel>
            <Select
              id="select-type"
              value={props.type}
              label="Type"
              onChange={(event) => props.onChangeType(event.target.value)}>
              {props.activities.map(([key, value]) => (
                <MenuItem key={key} value={key}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item lg="4" md="4" xs="4">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Date"
              inputFormat="dd/MM/yyyy"
              value={props.date}
              onChange={(value) => props.onChangeDate(value)}
              renderInput={(params) => <TextField {...params} variant="standard" fullWidth />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item lg="3" md="4" xs="3">
          <Box textAlign="right">
            <Button
              disabled={!props.query || props.query.length < 3}
              variant="contained"
              startIcon={<SearchIcon />}
              onClick={() => props.onSearch()}>
              Search
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
