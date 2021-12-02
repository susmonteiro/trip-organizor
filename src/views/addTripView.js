import countries from './countryList.js';

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
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

function getWeeksAfter(date, amount) {
  return date ? addWeeks(date, amount) : undefined;
}

export default function AddTripView(props) {
  return (
    <div>
      <br />
      <Typography variant="h4" component="div" gutterBottom>
        WHAT´S YOUR NEXT DESTINATION?
      </Typography>
      <br />
      <TextField
        id="titleInput"
        fullWidth
        label="What will be the name of your trip?"
        variant="standard"
        error={props.validateTitleExist(props.title)}
        helperText={
          props.validateAttrEmpty(props.title) == 'empty'
            ? 'Where are you going?! Your trip needs a name!'
            : props.validateTitleExist(props.title)
            ? 'Oops! Trip name already exists'
            : ''
        }
        onBlur={(eventTitle) => {
          props.setTitle(eventTitle.target.value);
        }}
      />
      <br />
      <br />
      <Stack direction="row" spacing={2}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <LocationCityIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField
            id="cityInput"
            label="City"
            variant="standard"
            error={props.checkForContent(props.city)}
            helperText={
              props.validateAttrEmpty(props.city) == 'empty' ? 'Psst! Put a city here!' : ''
            }
            onBlur={(eventCity) => props.setCity(eventCity.target.value)}
          />
        </Box>

        <Autocomplete
          id="country-select"
          sx={{ width: 300 }}
          options={countries}
          autoHighlight
          getOptionLabel={(option) => option.label}
          renderOption={(props, option) => (
            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
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
                props.validateAttrEmpty(props.country) == 'empty'
                  ? 'Hold your horses! We need a country!'
                  : ''
              }
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password' // disable autocomplete and autofill
              }}
              onBlur={(eventCountry) => props.setCountry(eventCountry.target.value)}
            />
          )}
        />
        <Button
          variant="contained"
          disabled={props.checkForContent(props.city) || props.checkForContent(props.country)}
          onClick={() => {
            props.validateDestination();
            props.validateClicked(true);
          }}>
          Validate Destination!
        </Button>
      </Stack>
      <br />
      <Typography variant="h4" component="div" gutterBottom>
        {!props.validateButton
          ? ''
          : props.validateDestination() === 'NOT_FOUND'
          ? 'Check your geography dude'
          : 'Great! Destination confirmed'}
      </Typography>
      <br />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateRangePicker
          disablePast
          value={props.date}
          inputFormat="dd/MM/yyyy"
          maxDate={getWeeksAfter(props.date[0], 4)}
          onChange={(newValue) => {
            props.setDate(newValue);
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
      <br />
      <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={() => console.log('User wants to go back!')}>
          Cancel
        </Button>
        <Button
          variant="contained"
          disabled={
            props.validateTitleExist(props.title) ||
            //props.validateDestination() === undefined ||
            props.checkForContent(props.date[0]) ||
            props.checkForContent(props.date[1])
          }
          onClick={() => props.addTrip()}>
          Let´s travel now!
        </Button>
      </Stack>
    </div>
  );
}
