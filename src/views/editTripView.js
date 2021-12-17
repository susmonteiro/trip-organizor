import * as React from 'react';

import Box from '@mui/material/Box';
import DateRangePicker from '@mui/lab/DateRangePicker';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Grid from '@mui/material/Grid';
import CustomButton, { CloseButton } from '../templates/buttons.js';

export default function EditTripView(props) {
  const [value, setValue] = React.useState([null, null]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container mt={2} spacing={2}>
        <Grid align="right" item xs={12}>
          <CloseButton
            onClick={() => {
              props.showEditChange(!props.showEdit);
            }}
          />
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <Typography color="primary" fontSize={32} fontWeight={500} textAlign="center">
              Trip Information
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container ml={0.3} mt={4} spacing={2}>
        <TextField disabled fullWidth label="Name of the trip:" value={props.trip.title} />
      </Grid>
      <Grid container ml={0.3} mt={2} spacing={2}>
        <TextField disabled label="City:" value={props.trip.city} />
      </Grid>
      <Grid container ml={0.3} mt={2} spacing={2}>
        <TextField disabled label="Country:" value={props.trip.country}></TextField>
      </Grid>
      <Grid container mt={2} spasing={2}>
        <LocalizationProvider align="left" dateAdapter={AdapterDateFns}>
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
      </Grid>
      {/* <CustomButton
        variant="contained"
        onClick={() => props.editInfo('THIS IS A NEW TITLE FOR THIS TRIP')}>
        Save
      </CustomButton> */}
    </Box>
  );
}
