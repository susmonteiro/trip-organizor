import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './style.css';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import App from './App';

import UserModel from './js/models/UserModel.js';
import persistModel from './js/models/FirebaseModel';

const user = new UserModel(false, []);
persistModel(user);
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
