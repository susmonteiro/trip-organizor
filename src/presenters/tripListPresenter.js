import * as React from 'react';
import TripListView from '../views/tripListView';

export default function TripListPresenter(props) {
  const [tripList, setTripList] = React.useState(props.model.trips);
  const [showDone, setShowDone] = React.useState(false);

  React.useEffect(function () {
    function obs() {
      setTripList(props.model.trips);
      setShowDone(false);
    }
    props.model.addObserver(obs);
    return function () {
      props.model.removeObserver(obs);
    };
  }, []);
  return (
    <TripListView
      trips={tripList}
      completeTrip={(trip) => {
        trip.finished = !trip.finished;
      }}
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
      showDoneChange={() => {
        setShowDone(!showDone);
      }}
      showDone={showDone}
    />
  );
}
