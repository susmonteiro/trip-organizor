import countries from './countryList.js';

import * as React from 'react';

import LocationCityIcon from '@mui/icons-material/LocationCity';

import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

export default function AddTripView(props) {
  let [dateBeginCont, setDateBegin] = React.useState(null);
  let cityCont = '';
  let coordCont = '';
  let countryCont = '';
  let dateEndCont = '';
  let titleCont = '';

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
        onBlur={(eventTitle) => (titleCont = eventTitle.target.value)}
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
            onBlur={(eventCity) => (cityCont = eventCity.target.value)}
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
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password' // disable autocomplete and autofill
              }}
              onBlur={(eventCountry) => (countryCont = eventCountry.target.value)}
            />
          )}
        />
        <button
          onClick={() =>
            console.log('Trip ' + titleCont + ' to: ' + cityCont + ', ' + countryCont)
          }>
          Search!
        </button>
      </Stack>
      <br />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Basic example"
          inputFormat="dd/MM/yyyy"
          value={dateBeginCont}
          onChange={(newValue) => {
            setDateBegin(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </div>
  );
}
