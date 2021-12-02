import * as React from 'react';
import AddTripView from '../views/addTripView';
import TripModel from '../js/models/TripModel.js';
import SitesSource from '../sitesSource.js';

export default function AddTripPresenter(props) {
  const [tripList, setTripList] = React.useState(props.model.trips);
  const [validate, setValidate] = React.useState(false);
  const [date, setDate] = React.useState([null, null]);
  const [city, setCity] = React.useState(null);
  const [country, setCountry] = React.useState(null);
  const [title, setTitle] = React.useState(null);

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
    <AddTripView
      trips={tripList}
      date={date}
      city={city}
      country={country}
      title={title}
      validateButton={validate}
      setDate={(inputDate) => setDate(inputDate)}
      setCity={(inputCity) => setCity(inputCity)}
      setCountry={(inputCountry) => setCountry(inputCountry)}
      setTitle={(inputTitle) => setTitle(inputTitle)}
      validateClicked={(state) => setValidate(state)}
      checkForContent={(attr) => props.model.checkNullEmpty(attr)}
      validateTitleExist={(title) => props.model.tripTitleExists(title)}
      validateAttrEmpty={(title) => props.model.tripAttrEmpty(title)}
      validateDestination={() => console.log(SitesSource.getCoords(city))}
      addTrip={() => {
        props.model.addTrip(new TripModel(title, date[0], date[1], [null, null], false, [], null));
      }}
    />
  );
}
