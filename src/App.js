import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { makeStyles } from '@material-ui/core';
import './style.css';
import { Route, Routes } from 'react-router-dom';
import HomePresenter from './presenters/homePresenter.js';

import SearchPresenter from './presenters/searchPresenter';
import MainLeftPresenter from './presenters/mainLeftPresenter';

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
      <Routes>
        <Route path="/home" element={<HomePresenter />} />
        <Route path="/search" element={<SearchPresenter model={props.model} />} />
        <Route path="/attractions" element={<MainLeftPresenter model={props.model} />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
