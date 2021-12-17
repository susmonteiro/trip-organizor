import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './style.css';

import { Route, Routes } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import HomePresenter from './presenters/homePresenter.js';
import AttractionsPresenter from './presenters/attractionsPresenter';
import tripsPresenter from './presenters/tripsPresenter';

import Stack from '@mui/material/Stack';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3B6064',
      faded: '#566C6E'
    },
    secondary: {
      main: '#CFB9AC',
      dark: '#a59287'
    },
    favourite: {
      main: '#DD4747'
    },
    error: {
      main: '#b84b3b'
    },
    success: {
      main: '#3B6064'
    },
    info: {
      main: '#3B6064'
    },
    background: {
      main: '#FFFFFF'
    },
    chips: {
      amusements: '#FFA90A',
      architecture: '#E37463',
      museums: '#1F8484',
      entertainment: '#A677A6',
      historic: '#841C26',
      natural: '#9EA550',
      religion: '#AE6147',
      sport: '#5C7457',
      food_drinks: '#FF781F',
      shops: '#385580'
    }
  }
});

function App(props) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stack spacing={2}>
        <Routes>
          <Route path="/" element={<HomePresenter model={props.model} />} />
          <Route path="/trips" element={<TripsPresenter model={props.model} />} />
          <Route path="/attractions" element={<AttractionsPresenter model={props.model} />} />
        </Routes>
      </Stack>
    </ThemeProvider>
  );
}

export default App;
