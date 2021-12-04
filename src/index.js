import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import App from './App';

import TripModel from './js/models/TripModel.js';
import AttractionModel from './js/models/AttractionModel.js';
import UserModel from './js/models/UserModel.js';
import persistModel from './js/models/FirebaseModel';

import SitesSource from './sitesSource.js';

const MyModel = new TripModel();

SitesSource.getCoords('Stockholm', 'SE').then((coords) =>
  SitesSource.getSites(50, coords.lat, coords.lon)
    .then((sites) => {
      sites.features.map((site) => {
        const attr = new AttractionModel({
          attrID: site.properties.xid,
          attrName: site.properties.name,
          attrCoord: site.geometry.coordinates
        });
        MyModel.addAttraction(attr);
      });
    })
    .then(() => {
      const user = new UserModel(null, [MyModel]);
      persistModel(user);
      ReactDOM.render(
        <StyledEngineProvider injectFirst>
          <React.StrictMode>
            <App model={user} />
          </React.StrictMode>
        </StyledEngineProvider>,
        document.getElementById('root')
      );
    })
);
