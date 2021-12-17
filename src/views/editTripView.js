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
    <Box textAlign="center">
      <Box mt={3} mr={3} textAlign="right">
        <CloseButton
          onClick={() => {
            props.showAddChange(!props.showAdd);
          }}
        />
      </Box>
      <Box ml={{ lg: 7, md: 1, xs: 10 }} mr={{ lg: 7, md: 1, xs: 10 }}>
        <Grid
          container
          spacing={5}
          justifyContent="space-between"
          mt={1}
          alignItems="flex-end"
          onKeyUp={(event) => event.key === 'Enter' && props.onSearch()}>
          <Grid item xs={12}>
            <Typography color="primary" fontSize={32} fontWeight={500} textAlign="center">
              Trip Information
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField disabled fullWidth label="Name of the trip:" value={props.trip.title} />
          </Grid>
          <Grid item xs={6}>
            <TextField disabled fullWidth label="Country:" value={props.trip.country}></TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField disabled fullWidth label="City:" value={props.trip.city} />
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
