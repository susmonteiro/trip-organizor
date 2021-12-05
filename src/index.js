import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './style.css';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import App from './App';

import TripModel from './js/models/TripModel.js';
import AttractionModel from './js/models/AttractionModel.js';
import UserModel from './js/models/UserModel.js';
import persistModel from './js/models/FirebaseModel';

import SitesSource from './sitesSource.js';

const trip = new TripModel();
const user = new UserModel(false, [trip]);

SitesSource.getCoords('Stockholm', 'SE').then((coords) => {
  user.setTripCoord([coords.lat, coords.lon]);
  SitesSource.getSites(50, coords.lat, coords.lon)
    .then((sites) => {
      sites.features.map((site) => {
        console.log(site)
        const attr = new AttractionModel({
          attrID: site.properties.xid,
          attrName: site.properties.name,
          attrCoord: site.geometry.coordinates
        });
        console.log(attr)
        user.addAttractionToTrip(attr);
        console.log(user)
      });
      //MyModel.setTitle("Stockholm")
    })
    .then(() => {
      console.log(user)

      //persistModel(user);
      ReactDOM.render(
        <StyledEngineProvider injectFirst>
          <React.StrictMode>
            <BrowserRouter>
              <App model={user} />
            </BrowserRouter>
          </React.StrictMode>
        </StyledEngineProvider>,
        document.getElementById('root')
      );
    });
});
