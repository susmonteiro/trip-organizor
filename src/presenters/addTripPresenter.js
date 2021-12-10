import * as React from 'react';
import AddTripView from '../views/addTripView';
import TripModel from '../js/models/TripModel.js';
import SitesSource from '../sitesSource.js';
import promiseNoData from '../promiseNoData.js';
import usePromise from '../usePromise.js';
export default function AddTripPresenter(props) {
  const [date, setDate] = React.useState([null, null]);
  const [city, setCity] = React.useState(null);
  const [country, setCountry] = React.useState(null);
  const [title, setTitle] = React.useState(null);
  //const [tripList, setTripList] = React.useState(props.model.trips); //I think I can delete this
  const [validate, setValidate] = React.useState(false);

  let status = null;

  const [promise, setPromise] = React.useState(null);
  const [data, error] = usePromise(promise);

  React.useEffect(function () {
    //setTripList(props.model.trips); //I think I can delete this
    setPromise(null);
  }, []);

  if (validate) {
    const apiRes = promiseNoData(promise, data, error);
    if (typeof apiRes === 'boolean' && apiRes === false) {
      status = data.status;
    }
  }

  return (
    <AddTripView
      //Data relevant to the view
      date={date}
      city={city}
      country={country}
      status={status}
      title={title}
      //Setters of the data
      setDate={(inputDate) => setDate(inputDate)}
      setCity={(inputCity) => setCity(inputCity)}
      setCountry={(inputCountry) => setCountry(inputCountry)}
      setTitle={(inputTitle) => setTitle(inputTitle)}
      //Custom functions for validation
      checkForContent={(attr) => props.model.checkNullEmpty(attr)}
      getDestination={(code) => setPromise(SitesSource.getCoords(city, code))}
      validateClicked={(state) => setValidate(state)}
      validateTitleExist={(title) => props.model.tripTitleExists(title)}
      validateAttrEmpty={(title) => props.model.tripAttrEmpty(title)}
      //Main function to change data in the model
      addTrip={() => {
        props.model.addTrip(
          new TripModel(
            title,
            date[0].getTime(),
            date[1].getTime(),
            [data.lat, data.lon],
            false,
            [],
            false
          )
        );
      }}
    />
  );
}
