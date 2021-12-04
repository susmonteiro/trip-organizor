import * as React from 'react';
import TripListView from '../views/tripListView';

export default function TripListPresenter(props) {
  const [tripList, setTripList] = React.useState(props.model.trips);

  React.useEffect(function () {
    function obs() {
      setTripList(props.model.trips);
    }
    props.model.addObserver(obs);
    return function () {
      props.model.removeObserver(obs);
    };
  }, []);
  return (
    <TripListView
      trips={tripList}
      removeTrip={(deleteTrip) => {
        props.model.removeTrip(deleteTrip);
      }}
      addTrip={(newTrip) => {
        props.model.addTrip(newTrip);
      }}
      tripChoice={(id) => {
        props.model.setTripCurrent(id);
        console.log(id + ' is the current trip');
      }}
    />
  );
}
