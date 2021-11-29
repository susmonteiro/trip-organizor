import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from './App';
import TripModel from './js/models/TripModel.js';
import AttractionModel from './js/models/AttractionModel.js';
import UserModel from './js/models/UserModel.js';

import SitesSource from './sitesSource.js';

const trip = new TripModel();

SitesSource.getCoords('Stockholm').then((coords) =>
  SitesSource.getSites(50, coords.lat, coords.lon).then((sites) =>
    sites.features.map((site) => {
      const attr = new AttractionModel({
        attrID: site.properties.xid,
        attrName: site.properties.name,
        attrCoord: site.geometry.coordinates
      });
      trip.addAttraction(attr);
    })
  )
);

const user = new UserModel(null, [trip]);

console.log(user);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
