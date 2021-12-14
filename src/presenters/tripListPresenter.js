import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import TripListView from '../views/tripListView';
import AddTripView from '../views/addTripView';
import TripModel from '../js/models/TripModel.js';
import SitesSource from '../sitesSource.js';
import promiseNoData from '../promiseNoData.js';
import usePromise from '../usePromise.js';
import Grid from '@mui/material/Grid';
import { signout } from '../js/models/FirebaseModel';

export default function TripListPresenter(props) {
  //////////////////////////////TRIP LIST PRESENTER//////////////////////////////
  const [tripList, setTripList] = React.useState(props.model.trips);
  const [showDone, setShowDone] = React.useState(false);
  const [showAddTrip, setShowAddTrip] = React.useState(false);

  function doLogout() {
    props.model.setUserID(null);
    signout();
  }

  React.useEffect(function () {
    function obs() {
      setTripList(props.model.trips);
    }
    props.model.addObserver(obs);
    return function () {
      props.model.removeObserver(obs);
    };
  }, []);

  //////////////////////////////TRIP LIST PRESENTER//////////////////////////////
  //////////////////////////////ADD TRIP PRESENTER//////////////////////////////

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
  //////////////////////////////ADD TRIP PRESENTER//////////////////////////////
  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={showAddTrip ? 7 : 12}>
          <Box>
            <TripListView
              trips={tripList}
              completeTrip={(trip) => {
                props.model.changeFinished(trip);
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
              showDoneChange={(status) => {
                setShowDone(status);
              }}
              showDone={showDone}
              showAdd={showAddTrip}
              showAddChange={(show) => {
                setShowAddTrip(show);
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={0.5} height="100vh" display={!showAddTrip ? 'none' : 'block'}>
          <Divider orientation="vertical" />
        </Grid>
        <Grid item xs={4} display={!showAddTrip ? 'none' : 'block'}>
          <Box ml={5} mr={1}>
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
              showAdd={showAddTrip}
              showAddChange={(show) => {
                setShowAddTrip(show);
              }}
              clean={() => {
                console.log('I´m cleaning');
                setDate([null, null]);
                setCity('AAAAAAAAAAAAAAAAAAAAAAAAAA');
                setCountry(null);
                setTitle(null);
                setValidate(false);
              }}
              addTrip={() => {
                props.model.addTrip(
                  new TripModel(
                    title,
                    'country',
                    'countrycode',
                    'city',
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
        </Grid>
      </Grid>
    </Box>
  );
}
