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
  // const [tripList, setTripList] = React.useState(props.model.trips);

  function doLogout() {
    props.model.setUserID(null);
    signout().catch(() => setErrorPopup('There was an error when trying to logout.'));
  }

  React.useEffect(function () {
    function obs() {
      setTitle(null);
      // setTripList(props.model.trips);
      setPromise(null);
    }
    props.model.addObserver(obs);
    return function () {
      props.model.removeObserver(obs);
    };
  }, []);

  /* ===== TRIP LIST PRESENTER ===== */
  /* ===== EDIT TRIP PRESENTER ===== */
  const trips = useModelProperty(props.model, 'trips');
  const currentTripOK = useModelProperty(props.model, 'tripCurrent');
  const attractions = useModelProperty(props.model, 'attractions');

  let trip = trips.find((trip) => trip.title === currentTripOK);

  function getTrip() {
    return trip ? trip : null;
  }
  /* ===== EDIT TRIP PRESENTER ===== */
  /* ===== ADD TRIP PRESENTER ===== */

  const [date, setDate] = React.useState([null, null]);
  const [city, setCity] = React.useState(null);
  const [country, setCountry] = React.useState(null);
  const [title, setTitle] = React.useState(null);
  const [validate, setValidate] = React.useState(false);
  const [completed, setCompleted] = React.useState(false);
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

  /* ===== ADD TRIP PRESENTER ===== */
  return getTrip() === null ? (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} mt={10}>
      <CircularProgress />
    </Box>
  ) : (
    <Box
      height="auto"
      display="flex"
      flexWrap="wrap"
      flexDirection="row"
      height="100%"
      width={{ md: '100vw', xs: '100vw' }}>
      <Grid container spacing={1}>
        <Grid
          item
          md={showAddTrip || showEditTrip ? 7 : 12}
          xs={showAddTrip || showEditTrip ? 3 : 12}>
          <Box
            width={{
              md: showAddTrip || showEditTrip ? '60vw' : '100vw',
              xs: showAddTrip || showEditTrip ? '0vw' : '100vw'
            }}>
            <TripListView
              trips={trips}
              completed={completed}
              completeTrip={(trip) => {
                props.model.changeFinished(trip);
                setCompleted(true);
              }}
              removeTrip={(deleteTrip) => {
                props.model.removeTrip(deleteTrip);
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
            />
          </Box>
        </Grid>
        <Grid item xs={0.5} height="100vh" display={showAddTrip || showEditTrip ? 'block' : 'none'}>
          <Divider orientation="vertical" />
        </Grid>

        <Grid item xs={4} display={showAddTrip ? 'block' : 'none'}>
          <Box ml={5} mr={1}>
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
        </Grid>
        <Grid item xs={4} display={showEditTrip ? 'block' : 'none'}>
          <Box ml={5} mr={1}>
            {getTrip() && (
              <EditTripView
                // Data relevant to the view
                trip={trip}
                showEdit={showEditTrip}
                showEditChange={(show) => {
                  setShowEditTrip(show);
                }}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
