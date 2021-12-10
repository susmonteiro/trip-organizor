import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { makeStyles } from '@material-ui/core';
import './style.css';

//import MapPresenter from './presenters/mapPresenter';
import { Route, Routes } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import HomePresenter from './presenters/homePresenter.js';
import AttractionsPresenter from './presenters/attractionsPresenter';
import TripListPresenter from './presenters/tripListPresenter';
import AddTripPresenter from './presenters/addTripPresenter';

import Stack from '@mui/material/Stack';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3B6064',
      faded: '#566C6E'
    },
    secondary: {
      main: '#CFB9AC',
      darker: '#a59287'
    },
    icons: {
      favourite: '#EE7D61'
    }
  }
});

/* const useStyles = makeStyles((theme) => {
  return {
    // TODO add general styling
  };
}); */

function App(props) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stack spacing={2}>
        <Routes>
          <Route path="/" element={<HomePresenter model={props.model} />} />
          <Route path="/trips" element={<TripListPresenter model={props.model} />} />
          <Route path="/newTrip" element={<AddTripPresenter model={props.model} />} />
          <Route path="/attractions" element={<AttractionsPresenter model={props.model} />} />
        </Routes>
      </Stack>
    </ThemeProvider>
  );
}

export default App;
