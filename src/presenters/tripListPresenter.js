import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import TripListView from '../views/tripListView';
import AddTripView from '../views/addTripView';
import EditTripView from '../views/editTripView';
import TripModel from '../js/models/TripModel.js';
import SitesSource from '../js/sitesSource.js';
import promiseNoData from '../js/promiseNoData.js';
import usePromise from '../js/usePromise.js';
import Grid from '@mui/material/Grid';
import { signout } from '../js/models/FirebaseModel';
import useModelProperty from './../js/useModelProperty.js';
import AttractionModel from '../js/models/AttractionModel.js';
import CircularProgress from '@mui/material/CircularProgress';

export default function TripListPresenter(props) {
  /* ===== TRIP LIST PRESENTER ===== */
  const [showDone, setShowDone] = React.useState(false);
  const [showAddTrip, setShowAddTrip] = React.useState(false);
  const [showEditTrip, setShowEditTrip] = React.useState(false);
  const [errorPopup, setErrorPopup] = React.useState('');
  const [successPopup, setSuccessPopup] = React.useState('');

  function doLogout() {
    props.model.setUserID(null);
    signout().catch(() => setErrorPopup('There was an error when trying to logout.'));
  }

  React.useEffect(function () {
    function obs() {
      setTitle(null);
      setPromise(null);
    }
    props.model.addObserver(obs);
    return function () {
      props.model.removeObserver(obs);
    };
  }, []);

  /* ===== TRIP LIST PRESENTER ===== */
  /* ===== ADD TRIP PRESENTER ===== */

  const [date, setDate] = React.useState([null, null]);
  const [city, setCity] = React.useState(null);
  const [country, setCountry] = React.useState(null);
  const [title, setTitle] = React.useState(null);
  const [validate, setValidate] = React.useState(false);
  const [completed, setCompleted] = React.useState(false);
  const [successPopup, setSuccessPopup] = React.useState('');
  const [errorPopup, setErrorPopup] = React.useState('');

  let status = null;

  const [promise, setPromise] = React.useState(null);
  const [data, error] = usePromise(promise);

  React.useEffect(function () {
    setPromise(null); // TODO check this
  }, []);

  if (validate) {
    const apiRes = promiseNoData(promise, data, error);
    if (typeof apiRes === 'boolean' && apiRes === false) {
      status = data.status;
    }
  }
  const trips = useModelProperty(props.model, 'trips');
  const currentTripOK = useModelProperty(props.model, 'tripCurrent');
  const attractions = useModelProperty(props.model, 'attractions');

  let trip = trips.find((trip) => trip.title === currentTripOK);

  function getTrip() {
    return trip ? trip : null;
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
        display={showAddTrip || showEditTrip ? { md: 'block', xs: 'none' } : 'block'}
        flex={showAddTrip || showEditTrip ? 0.6 : 1}
        ml={2}
        mr={2}
        height="100vh">
        <TripListView
          trips={trips}
          completed={completed}
          completeTrip={(trip) => {
            props.model.changeFinished(trip);
            setCompleted(true);
          }}
          removeTrip={(deleteTrip) => {
            props.model.removeTrip(deleteTrip);
            trip = setTimeout(
              trips.find((trip) => trip.title === currentTripOK),
              100
            );
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
            setShowAddTrip(show);
            status = null;
          }}
          showEdit={showEditTrip}
          showEditChange={(show) => {
            setShowEditTrip(show);
          }}
          timeoutSnack={() => setCompleted(false)}
          useLogout={() => doLogout()}
          validateTitleExist={(title) => props.model.tripTitleExists(title)}
          validateAttrEmpty={(title) => props.model.tripAttrEmpty(title)}
          title={title}
          setTitleNow={(inputTitle) => setTitle(inputTitle)}
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
        display={showAddTrip || showEditTrip ? { md: 'block', xs: 'none' } : 'none'}
      />
      <Box display={showAddTrip ? 'block' : 'none'} flex={{ md: 0.4, xs: 1 }} height="100vh">
        <AddTripView
          // Data relevant to the view
          date={date}
          city={city}
          country={country}
          status={status}
          title={title}
          // Setters of the data
          setDateNow={(inputDate) => setDate(inputDate)}
          setCityNow={(inputCity) => setCity(inputCity)}
          setCountryNow={(inputCountry) => setCountry(inputCountry)}
          setTitleNow={(inputTitle) => setTitle(inputTitle)}
          // Custom functions for validation
          checkForContent={(attr) => props.model.checkNullEmpty(attr)}
          getDestination={(city, code) => setPromise(SitesSource.getCoords(city, code))}
          validateClicked={(state) => setValidate(state)}
          validateTitleExist={(title) => props.model.tripTitleExists(title)}
          validateAttrEmpty={(title) => props.model.tripAttrEmpty(title)}
          // Main function to change data in the model
          showAdd={showAddTrip}
          showAddChange={(show) => {
            setShowAddTrip(show);
          }}
          tripChoice={(id) => {
            props.model.setTripCurrent(id);
          }}
          showEdit={showEditTrip}
          showEditChange={(show) => {
            setShowEditTrip(show);
          }}
          addTrip={() => {
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
          }}
        />
      </Box>
      <Box display={showEditTrip ? 'block' : 'none'} flex={{ md: 0.4, xs: 1 }} height="100vh">
        {getTrip() && (
          <EditTripView
            // Data relevant to the view
            trip={trip}
            showAdd={showAddTrip}
            showAddChange={(show) => {
              setShowAddTrip(show);
            }}
            showEdit={showEditTrip}
            showEditChange={(show) => {
              setShowEditTrip(show);
            }}
            removeTrip={(deleteTrip) => {
              props.model.removeTrip(deleteTrip);
              trip = setTimeout(
                trips.find((trip) => trip.title === currentTripOK),
                100
              );
            }}
          />
        )}
      </Box>
    </Box>
  );
}
