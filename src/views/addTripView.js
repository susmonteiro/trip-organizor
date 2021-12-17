import countries from '../js/countryList.js';

import * as React from 'react';

import addWeeks from 'date-fns/addWeeks';

import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DateRangePicker from '@mui/lab/DateRangePicker';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { PopupBottom } from '../templates/popups.js';
import CustomButton from '../templates/buttons.js';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function getWeeksAfter(date, amount) {
  return date ? addWeeks(date, amount) : undefined;
}

export default function AddTripView(props) {
  const handleChange = (event) => {
    props.setCountrySel(event.target.value);
  };

  return (
    <Box textAlign="center" mt={7}>
      <Box ml={{ lg: 7, md: 1, xs: 10 }} mr={{ lg: 7, md: 1, xs: 10 }}>
        <Grid container spacing={5} justifyContent="space-between" mt={1} alignItems="flex-end">
          <Grid item xs={12}>
            <Typography color="primary" fontSize={32} fontWeight={500} textAlign="center">
              What's your next destination?
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="titleInput"
              value={props.title || ''}
              autoComplete="off"
              fullWidth
              inputProps={{
                maxLength: 50
              }}
              label="What will be the name of your trip?"
              variant="outlined"
              error={
                props.title === null
                  ? false
                  : /^\s*$/.test(props.title) || props.title === ''
                  ? true
                  : props.validateTitleExist(props.title) ||
                    props.validateAttrEmpty(props.title) === ('empty' || 'null')
              }
              helperText={
                props.validateAttrEmpty(props.title) == 'empty' ||
                /^\s*$/.test(props.title) ||
                props.title === ''
                  ? 'Where are you going?! Your trip needs a name!'
                  : props.validateTitleExist(props.title)
                  ? 'Oops! Trip name already exists'
                  : ''
              }
              onChange={(event) => props.setTitleNow(event.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            {/* <Autocomplete
              id="country-select"
              fullWidth              
              options={countries}
              autoHighlight
              getOptionLabel={(option) => option.label}
              renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { pr: 2, flexShrink: 0 } }} {...props}>
                  <img
                    loading="lazy"
                    width="30"
                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                    alt=""
                  />
                  {option.label} ({option.code})
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Country"
                  value={props.country || ''}
                  autoComplete="off"
                  error={props.validateTitleExist(props.country)}
                  helperText=
                  onSelect={(eventCountry) => {
                    props.setCountryNow(eventCountry.target.value);
                  }}
                />
              )}
            /> */}
            <Box sx={{ minWidth: 150 }}>
              <FormControl fullWidth>
                <InputLabel id="country">Country</InputLabel>
                <Select
                  labelId="countrySell"
                  id="country"
                  value={props.countrySel || ''}
                  label="Country"
                  onChange={(event) => {
                    handleChange(event);
                    props.setCountryNow(event.target.value);
                  }}>
                  {countries.map((land) => (
                    <MenuItem key={land.code} value={land.label}>
                      <Box>
                        <img
                          loading="lazy"
                          width="20"
                          src={`https://flagcdn.com/w20/${land.code.toLowerCase()}.png`}
                          srcSet={`https://flagcdn.com/w40/${land.code.toLowerCase()}.png 2x`}
                          alt=""
                        />
                        {' ' + land.label + ' (' + land.code + ')'}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="cityInput"
              value={props.city || ''}
              label="City"
              fullWidth
              variant="outlined"
              autoComplete="off"
              disabled={props.checkForContent(props.country)}
              error={props.checkForContent(props.city !== null ? props.city : 'not empty')}
              inputProps={{ maxLength: 20 }}
              helperText={
                props.validateAttrEmpty(props.city) == 'empty' ? 'Psst! Put a city here!' : ''
              }
              onChange={(eventCity) => {
                props.setCityNow(eventCity.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateRangePicker
                value={props.date}
                inputFormat="dd/MM/yyyy"
                maxDate={getWeeksAfter(props.date[0], 4)}
                onChange={(newValue) => {
                  props.setDateNow(newValue);
                }}
                renderInput={(startProps, endProps) => (
                  <React.Fragment>
                    <TextField {...startProps} />
                    <Box sx={{ mx: 2 }}> to </Box>
                    <TextField {...endProps} />
                  </React.Fragment>
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6} textAlign="center">
            <CustomButton
              variant="outlined"
              onClick={() => {
                props.showAddChange();
                props.setCountrySel('');
              }}>
              Cancel
            </CustomButton>
          </Grid>
          <Grid item xs={6} textAlign="center">
            <CustomButton
              disabled={
                props.validateTitleExist(props.title) ||
                props.checkForContent(props.date[0]) ||
                props.checkForContent(props.date[1]) ||
                props.validateAttrEmpty(props.city) !== false ||
                /^\s*$/.test(props.title) ||
                props.validateAttrEmpty(props.title) === ('empty' || 'null')
              }
              onClick={() => {
                props.addTrip();
                props.setCountrySel('');
              }}>
              Create
            </CustomButton>
          </Grid>
        </Grid>
      </Box>
      <PopupBottom type={'success'} message={props.successMessage} onClose={props.resetMessage} />
      <PopupBottom type={'error'} message={props.errorMessage} onClose={props.resetError} />
    </Box>
  );
}
