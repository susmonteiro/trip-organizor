import MapView from '../views/mapView.js';
import useModelProperty from './../useModelProperty.js';

import * as React from 'react';

export default function MapPresenter(props) {
  const trips = useModelProperty(props.model, 'trips'); // TODO remove m
  const currentTrip = useModelProperty(props.model, 'tripCurrent');
  const attractions = useModelProperty(props.model, 'attractions');

  console.log('GetCoordRes:' + props.model.attractions[0]);
  function getCoord() {
    // TODO remove me
    let trip = trips.find((trip) => trip.title === currentTrip);
    return trip ? trip.coord : null;
  }
  // State for promise rendering
  const [promise, setPromise] = React.useState(null);
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(
    function () {
      // console.log('Effect executed');
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
      // console.log(promise, data, error);
      return function () {
        cancelled = true;
      };
    },
    [promise]
  );

  // Observer for TripModel
  return (
    getCoord() && (
      <MapView
        currentLocation={() => {
          getCoord();
        }} // TODO
        zoom={12}
        sites={attractions}
        promise={promise}
        data={data}
        error={error}
        setPromise={setPromise}
        changeCurrAttr={(id) => props.model.setTripCurrAttr(id)}
      />
    )
  );
}
