import * as React from 'react';
//MATERIAL IMPORTS
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
//CUSTOM COMPONENTS
import TopBar from '../elements/topBar.js';
import { PopupBottom } from '../elements/popups.js';

export default function SearchView(props) {
  return (
    <Box>
      <TopBar onClick={() => props.onNotSearching()} user={props.user} useLogout={props.useLogout}>
        Attractions
      </TopBar>
      <Box ml={{ lg: 10, md: 5, xs: 5 }} mr={{ lg: 10, md: 5, xs: 5 }}>
        <Grid
          container
          spacing={2}
          justifyContent="space-between"
          mt={1}
          alignItems="flex-end"
          onKeyUp={(event) => event.key === 'Enter' && props.onSearch()}>
          <Grid item xs={12}>
            <TextField
              id="search-bar"
              value={props.query || ''}
              label="Search"
              variant="standard"
              fullWidth
              autoComplete="off"
              color="primary"
              error={props.showHelpText}
              helperText={props.showHelpText && 'Please type more'}
              onChange={(event) => props.onChangeQuery(event.target.value)}
            />
          </Grid>
          <Grid item lg={5} md={4} xs={5}>
            <FormControl variant="standard" fullWidth color="primary">
              <InputLabel id="select-type-input">Type</InputLabel>
              <Select
                id="select-type"
                value={props.type}
                label="Type"
                onChange={(event) => props.onChangeType(event.target.value)}>
                {props.activities.map((type) => (
                  <MenuItem key={type.code} value={type.code}>
                    {type.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={4} md={4} xs={4}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Date"
                inputFormat="dd/MM/yyyy"
                minDate={props.minDate}
                maxDate={props.maxDate}
                value={props.date}
                onChange={(value) => props.onChangeDate(value)}
                renderInput={(params) => <TextField {...params} variant="standard" fullWidth />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item lg={3} md={4} xs={3}>
            <Box textAlign="right">
              <Button
                disabled={!props.query || !props.canSearch}
                color="primary"
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={() => props.onSearch()}>
                Search
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <PopupBottom errormsg={props.errorDuplicated} onClose={props.resetError} />
    </Box>
  );
}
