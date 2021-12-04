import MapView from '../Views/MapView.js';
import * as React from 'react';

export default function MapPresenter(props) {
  const [promise, setPromise] = React.useState(null);
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  React.useEffect(
    function () {
      console.log('Effect executed');
      setData(null);
      setError(null);
      let cancelled = false;
      if (promise) {
        promise
          .then(function (dt) {
            if (!cancelled) setData(dt);
          })
          .catch(function (er) {
            if (!cancelled) setError(er);
          });
      }
      console.log(promise, data, error);
      return function () {
        cancelled = true;
      };
    },
    [promise]
  );

  return (
    <MapView
      currentLocation={props.model.coord}
      zoom={12}
      sites={props.model.attractions}
      promise={promise}
      data={data}
      error={error}
      setPromise={setPromise}
    />
  );
}
