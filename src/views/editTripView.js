import countries from './countryList.js';

import * as React from 'react';

import LocationCityIcon from '@mui/icons-material/LocationCity';

import addWeeks from 'date-fns/addWeeks';

import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DatePicker from '@mui/lab/DatePicker';
import DateRangePicker from '@mui/lab/DateRangePicker';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
//CUSTOM COMPONENTS
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditTripView(props) {
  const [value, setValue] = React.useState([null, null]);

  return (
    <div>
      <br />
      <Button
        id="CloseEditView"
        display="right"
        onClick={() => {
          props.showEditChange(!props.showEdit);
        }}
        startIcon={<CloseIcon />}></Button>
      <Typography variant="h4" component="div" gutterBottom>
        TRIP INFO
      </Typography>
      <br />
      <TextField disabled fullWidth label="Name of the trip:" value={props.trip.title} />
      <br />
      <br />
      <TextField disabled label="City:" value={props.trip.city} />
      <br />
      <br />
      <TextField disabled label="Country:" value={props.trip.country}></TextField>
      <br />
      <br />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateRangePicker
          readOnly
          startText={new Date(props.trip.dateBegin).toDateString()}
          endText={new Date(props.trip.dateEnd).toDateString()}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
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
      <Button
        variant="contained"
        onClick={() => props.editInfo('THIS IS A NEW TITLE FOR THIS TRIP')}>
        Save
      </Button>
    </div>
  );
}
