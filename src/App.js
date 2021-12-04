import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { makeStyles } from '@material-ui/core';
import './style.css';
import TripListPresenter from './presenters/tripListPresenter';
import AddTripPresenter from './presenters/addTripPresenter';

//import SearchPresenter from './presenters/searchPresenter';
//import MapPresenter from './presenters/mapPresenter';

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
      <div>
        <AddTripPresenter model={props.model} />
        <TripListPresenter model={props.model} />
      </div>
    </ThemeProvider>
  );
}

export default App;
