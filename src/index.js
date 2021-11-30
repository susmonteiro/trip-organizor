import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import App from './App';

import TripModel from './js/models/TripModel.js';
// import AttractionModel from './js/models/AttractionModel.js';
import UserModel from './js/models/UserModel.js';

// import SitesSource from './sitesSource.js';

const myTripModel = new TripModel(
  'Stockholm',
  new Date('2021-03-21'),
  new Date('2021-03-25'),
  [null, null],
  false,
  [],
  null
);

let myUserModel = new UserModel(false, [myTripModel]);

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <React.StrictMode>
      <App model={myUserModel} />
    </React.StrictMode>
  </StyledEngineProvider>,
  document.getElementById('root')
);
