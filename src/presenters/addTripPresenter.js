import * as React from 'react';
import AddTripView from '../views/addTripView';
import TripModel from '../js/models/TripModel.js';
import SitesSource from '../sitesSource.js';
import promiseNoData from '../promiseNoData.js';
import usePromise from '../usePromise.js';

export default function AddTripPresenter(props) {
  const [tripList, setTripList] = React.useState(props.model.trips);
  const [validate, setValidate] = React.useState(false);
  const [date, setDate] = React.useState([null, null]);
  const [city, setCity] = React.useState(null);
  const [country, setCountry] = React.useState(null);
  const [title, setTitle] = React.useState(null);
  const [validationMsg, setValidationMsg] = React.useState(null);
  let x;
  let i = 0;

  //PROMISE SECTION
  const [promise, setPromise] = React.useState(null);

  React.useEffect(function () {
    setTripList(props.model.trips);
    setPromise(null);
  }, []);

  const [data, error] = usePromise(promise);

  return (
    <div>
      <AddTripView
        data={data}
        trips={tripList}
        date={date}
        city={city}
        country={country}
        title={title}
        validationMsg={validationMsg}
        validateButton={validate}
        setMsg={() => setValidationMsg(x)}
        setDate={(inputDate) => setDate(inputDate)}
        setCity={(inputCity) => setCity(inputCity)}
        setCountry={(inputCountry) => setCountry(inputCountry)}
        setTitle={(inputTitle) => setTitle(inputTitle)}
        validateClicked={(state) => setValidate(state)}
        checkForContent={(attr) => props.model.checkNullEmpty(attr)}
        validateTitleExist={(title) => props.model.tripTitleExists(title)}
        validateAttrEmpty={(title) => props.model.tripAttrEmpty(title)}
        getDestination={() => setPromise(SitesSource.getCoords(city))}
        addTrip={() => {
          props.model.addTrip(
            new TripModel(title, date[0], date[1], [null, null], false, [], null)
          );
        }}
      />
      {(x = promiseNoData(promise, data, error).toString() + i)}
    </div>
  );
}
