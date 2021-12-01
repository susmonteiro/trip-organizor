import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { makeStyles } from '@material-ui/core';
import './style.css';

import SearchPresenter from './presenters/mainLeftPresenter';

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SearchPresenter />
    </ThemeProvider>
  );
}

export default App;
