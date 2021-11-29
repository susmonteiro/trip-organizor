import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import App from './App';
import TripModel from './js/models/TripModel';
import AttractionModel from './js/models/AttractionModel';

//For testing:

const attraction1 = new AttractionModel(
  1,
  'Gamla Stan',
  [],
  true,
  false,
  false,
  Date(),
  null,
  'Sight Seen'
);
const attraction2 = new AttractionModel(
  2,
  'Vasamuseet',
  [],
  false,
  false,
  false,
  Date(),
  null,
  'Museum'
);

const attraction3 = new AttractionModel(
  3,
  'Max',
  [],
  true,
  false,
  false,
  Date(),
  null,
  'Restaurant'
);

const MyModel = new TripModel();

MyModel.addAttraction(attraction1);
MyModel.addAttraction(attraction2);
MyModel.addAttraction(attraction3);

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <React.StrictMode>
      <App model={MyModel} />
    </React.StrictMode>
  </StyledEngineProvider>,
  document.getElementById('root')
);
