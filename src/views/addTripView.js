import countries from '../js/countryList.js';

import * as React from 'react';

import LocationCityIcon from '@mui/icons-material/LocationCity';

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
import CustomButton, { CloseButton } from '../templates/buttons.js';

import CloseIcon from '@mui/icons-material/Close';

function getWeeksAfter(date, amount) {
  return date ? addWeeks(date, amount) : undefined;
}

export default function AddTripView(props) {
  return (
    <Box textAlign="center">
      <Box mt={3} mr={3} textAlign="right">
        <CloseButton
          onClick={() => {
            props.showAddChange();
          }}
        />
      </Box>
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
                    props.validateAttrEmpty(props.title) === 'empty'
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
              onBlur={(eventTitle) => {
                props.setTitleNow(eventTitle.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              id="country-select"
              fullWidth
              options={countries}
              autoHighlight
              getOptionLabel={(option) => option.label}
              renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { pr: 2, flexShrink: 0 } }} {...props}>
                  <img
                    loading="lazy"
                    width="20"
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
                  error={props.validateTitleExist(props.country)}
                  helperText={
                    props.validateAttrEmpty(props.country) === 'empty'
                      ? 'Hold your horses! We need a country!'
                      : ''
                  }
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password' // disable autocomplete and autofill
                  }}
                  onSelect={(eventCountry) => {
                    props.setCountryNow(eventCountry.target.value);
                    if (!props.checkForContent(props.city)) {
                      /* props.validateClicked(true);
                      props.getDestination(
                        eventCity.target.value,
                        countries.find((country) => country.label === props.country).code
                      ); */
                    }
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="cityInput"
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
              onBlur={(eventCity) => {
                props.setCityNow(eventCity.target.value);
                props.validateClicked(true);
                props.getDestination(
                  eventCity.target.value,
                  countries.find((country) => country.label === props.country).code
                );
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
              }}>
              Cancel
            </CustomButton>
          </Grid>
          <Grid item xs={6} textAlign="center">
            <CustomButton
              disabled={
                props.validateTitleExist(props.title) ||
                props.status !== 'OK' ||
                props.checkForContent(props.date[0]) ||
                props.checkForContent(props.date[1])
              }
              onClick={() => {
                props.addTrip();
                props.showAddChange();
              }}>
              Create
            </CustomButton>
          </Grid>
        </Grid>
      </Box>
      {props.status === 'OK' && (
        <PopupBottom
          type={'success'}
          message={'Woohoo! Your destination is valid!'}
          onClose={props.timeoutSnack}
        />
      )}
      {props.status === 'NOT_FOUND' && (
        <PopupBottom
          type={'error'}
          message={"Sorry, your destination doesn't exist"}
          onClose={props.timeoutSnack}
        />
      )}
    </Box>
  );
}
