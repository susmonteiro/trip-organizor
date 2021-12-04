import MapPresenter from './presenters/mapPresenter.js';
import * as React from 'react';

function App(props) {
  console.log(props);
  return <MapPresenter model={props.model} />;
}

export default App;
