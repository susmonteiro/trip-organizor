import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import TripListView from '../views/tripListView';
import AddTripView from '../views/addTripView';
import TripModel from '../js/models/TripModel.js';
import SitesSource from '../js/sitesSource.js';
import promiseNoData from '../js/promiseNoData.js';
import usePromise from '../js/usePromise.js';
import Grid from '@mui/material/Grid';
import { signout } from '../js/models/FirebaseModel';
import useModelProperty from '../js/useModelProperty.js';
import AttractionModel from '../js/models/AttractionModel.js';
import CircularProgress from '@mui/material/CircularProgress';

import countries from '../js/countryList.js';

export default function TripsPresenter(props) {
  /* ===== TRIP LIST PRESENTER ===== */
  const [showDone, setShowDone] = React.useState(false);
  const [showAddTrip, setShowAddTrip] = React.useState(false);
  const [errorPopup, setErrorPopup] = React.useState('');
  const [successPopup, setSuccessPopup] = React.useState('');

  /* ===== TRIP LIST PRESENTER ===== */
  /* ===== ADD TRIP PRESENTER ===== */

  const [date, setDate] = React.useState([null, null]);
  const [city, setCity] = React.useState(null);
  const [country, setCountry] = React.useState(null);
  const [title, setTitle] = React.useState(null);
  const [completed, setCompleted] = React.useState(false);
  const [countrySel, setCountrySel] = React.useState('');

  function doLogout() {
    props.model.setUserID(null);
    signout().catch(() => setErrorPopup('There was an error when trying to logout.'));
  }

  function resetVariables() {
    setDate([null, null]);
    setCity(null);
    setCountry(null);
    setTitle(null);
  }

  function displayAddTrip(show) {
    resetVariables();
    setShowAddTrip(show);
  }

  const [promise, setPromise] = React.useState(null);
  const [data, error] = usePromise(promise);

  React.useEffect(function () {
    setPromise(null);
  }, []);

  const trips = useModelProperty(props.model, 'trips');
  const currentTripOK = useModelProperty(props.model, 'tripCurrent');
  const attractions = useModelProperty(props.model, 'attractions');

  let trip = trips.find((trip) => trip.title === currentTripOK);

  function addTrip() {
    let foundCountry = countries.find((c) => c.label === country);

    if (!foundCountry || !foundCountry.code) {
      setErrorPopup('The country is not valid');
      return;
    } else if (!city) {
      setErrorPopup('The city cannot be empty');
      return;
    }
    SitesSource.getCoords(city, foundCountry.code)
      .then((data) => {
        if (data.status === 'OK') {
          props.model.addTrip(
            new TripModel(
              title,
              country,
              data.country,
              data.name,
              date[0].getTime(),
              date[1].getTime(),
              [data.lat, data.lon],
              false,
              [],
              false
            )
          );
          setSuccessPopup('Woohoo! Your destination is valid!');
          setShowAddTrip(false);
        } else {
          setErrorPopup(data.error);
        }
      })
      .catch(() => setErrorPopup(data.error));
  }

  return (
    <Box
      height="auto"
      display="flex"
      flexWrap="wrap"
      flexDirection="row"
      height="100vh"
      width="100vw">
      <Box
        display={showAddTrip ? { md: 'block', xs: 'none' } : 'block'}
        flex={showAddTrip ? 0.6 : 1}
        ml={2}
        mr={2}
        height="100vh">
        <TripListView
          trips={trips}
          completed={completed}
          completeTrip={(trip) => {
            props.model.changeFinished(trip);
            trip.finished && setCompleted(true);
          }}
          removeTrip={(deleteTrip) => {
            props.model.removeTrip(deleteTrip);
          }}
          addTrip={(newTrip) => {
            props.model.addTrip(newTrip);
          }}
          tripChoice={(id) => {
            props.model.setTripCurrent(id);
          }}
          tripCurrent={trip}
          showDoneChange={(status) => {
            setShowDone(status);
          }}
          showDone={showDone}
          showAdd={showAddTrip}
          showAddChange={(show) => {
            displayAddTrip(show);
          }}
          timeoutSnack={() => setCompleted(false)}
          useLogout={() => doLogout()}
          validateTitleExist={(title) => props.model.tripTitleExists(title)}
          validateAttrEmpty={(title) => props.model.tripAttrEmpty(title)}
          title={title}
          setTitleNow={(inputTitle) => setTitle(inputTitle)}
          countrySel={countrySel}
          setCountrySel={(val) => setCountrySel(val)}
          duplicate={() => {
            props.model.addTrip(
              new TripModel(
                title,
                trip.country,
                trip.countryCode,
                trip.city,
                trip.dateBegin,
                trip.dateEnd,
                trip.coord,
                false
              )
            );
            attractions
              .filter((attr) => attr.trip === currentTripOK)
              .map((filtAttr) =>
                props.model.addAttractionToTrip(
                  new AttractionModel({
                    id: filtAttr.id,
                    trip: title,
                    name: filtAttr.name,
                    coord: filtAttr.coord,
                    isFav: filtAttr.isFav,
                    finished: filtAttr.finished,
                    date: filtAttr.date,
                    type: filtAttr.type,
                    key: filtAttr.key
                  })
                )
              );
          }}
          successPopup={successPopup}
          errorPopup={errorPopup}
        />
      </Box>
      <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        display={showAddTrip ? { md: 'block', xs: 'none' } : 'none'}
      />
      <Box display={showAddTrip ? 'block' : 'none'} flex={{ md: 0.4, xs: 1 }} height="100vh">
        <AddTripView
          // Data relevant to the view
          date={date}
          city={city}
          country={country}
          title={title}
          // Setters of the data
          setDateNow={(inputDate) => setDate(inputDate)}
          setCityNow={(inputCity) => setCity(inputCity)}
          setCountryNow={(inputCountry) => {
            setCountry(inputCountry);
          }}
          setTitleNow={(inputTitle) => setTitle(inputTitle)}
          // Custom functions for validation
          checkForContent={(attr) => props.model.checkNullEmpty(attr)}
          getDestination={(city, code) => setPromise(SitesSource.getCoords(city, code))}
          validateTitleExist={(title) => props.model.tripTitleExists(title)}
          validateAttrEmpty={(title) => props.model.tripAttrEmpty(title)}
          // Main function to change data in the model
          showAdd={showAddTrip}
          showAddChange={() => {
            displayAddTrip(false);
          }}
          tripChoice={(id) => {
            props.model.setTripCurrent(id);
          }}
          addTrip={() => addTrip()}
          errorMessage={errorPopup}
          resetError={() => setErrorPopup('')}
          successMessage={successPopup}
          resetMessage={() => setSuccessPopup('')}
          countrySel={countrySel}
          setCountrySel={(val) => setCountrySel(val)}
        />
      </Box>
    </Box>
  );
}
