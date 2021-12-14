import React from 'react';

import AttractionsListView from '../views/attractionsListView';
import MapView from '../views/mapView.js';
import ResultsView from '../views/resultsView';
import SearchView from '../views/searchView';

import SitesSource from '../sitesSource';
import AttractionModel from './../js/models/AttractionModel.js';

import promiseNoData from '../promiseNoData.js';
import usePromise from '../usePromise.js';
import useModelProperty from './../useModelProperty.js';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import InformationMessage from '../elements/showMessages.js';

import 'firebase/compat/auth';
import { signout } from '../js/models/FirebaseModel';

const RADIUS = 50000;
const NUM_RESULTS = 30;

export default function AttractionsPresenter(props) {
  // constants

  const ACTIVITY_TYPES = [
    { code: 'amusements', name: 'Amusements', color: 'chips.amusements' },
    { code: 'architecture', name: 'Landmarks', color: 'chips.architecture' },
    { code: 'museums', name: 'Museums', color: 'chips.museums' },
    { code: 'theatres_and_entertainments', name: 'Entertainments', color: 'chips.entertainment' },
    { code: 'historic', name: 'Historic', color: 'chips.historic' },
    { code: 'natural,urban_environment', name: 'Nature', color: 'chips.natural' },
    { code: 'religion', name: 'Religion', color: 'chips.religion' },
    { code: 'sport', name: 'Sports', color: 'chips.sport' },
    { code: 'foods', name: 'Food & Drink', color: 'chips.food_drinks' },
    { code: 'shops', name: 'Shops', color: 'chips.shops' }
  ];

  const ALL_TYPES = ACTIVITY_TYPES.map((type) => type.code).join(',');
  console.log(ALL_TYPES);
  const DEFAULT_TYPE = { code: ALL_TYPES, name: 'All' };

  // model properties
  const trips = useModelProperty(props.model, 'trips'); // TODO remove
  const currentTrip = useModelProperty(props.model, 'tripCurrent');
  const attractions = useModelProperty(props.model, 'attractions');

  let trip = trips.find((trip) => trip.title === currentTrip);

  // variables
  const [searching, setSearching] = React.useState(false);
  const [query, setQuery] = React.useState(null);
  const [type, setType] = React.useState(ALL_TYPES);
  const [date, setDate] = React.useState(new Date());
  const [helpText, setHelpText] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [filter, setFilter] = React.useState(false);
  const [checked, setChecked] = React.useState(true);
  const [favourites, setFavourites] = React.useState(false);
  const [currentAttraction, setCurrentAttraction] = React.useState(null);

  const [promise, setPromise] = React.useState(null);
  React.useEffect(function () {
    setPromise(null);
  }, []);

  const [data, error] = usePromise(promise);

  function getCoord() {
    // TODO remove me
    return trip ? trip.coord : null;
  }

  function getDate() {
    return trip ? [trip.dateBegin, trip.dateEnd] : null;
  }

  const tripAttractions = attractions.filter((attraction) => attraction.trip === currentTrip);

  const filteredAttractions = tripAttractions.filter(
    (attraction) =>
      (type === ALL_TYPES || attraction.type.code === type) &&
      (checked || !attraction.finished) &&
      (!favourites || attraction.isFav)
  );
  // attractions list functions
  function createRows() {
    //this function formats all the rows with the information needed
    let rows = filteredAttractions
      .filter((attraction) => type === ALL_TYPES || attraction.type.code === type)
      .map((attraction) => ({
        id: attraction.key,
        isCompleted: attraction.finished,
        isFavourite: attraction.isFav,
        name: attraction.name,
        type: attraction.type,
        date: new Date(attraction.date)
      }));
    return rows;
  }

  function doLogout() {
    props.model.setUserID(null);
    signout();
  }
  // search attraction functions
  function addAttraction(site) {
    const newKey = site.xid + currentTrip;

    if (attractions.find((attr) => attr.key === newKey)) {
      console.log('attraction already exists :/');
    } else if (date < trip.dateBegin || date > trip.dateEnd) {
      console.log('invalid date');
    } else {
      let attraction = new AttractionModel({
        id: site.xid,
        name: site.name,
        date: date.getTime(),
        type:
          type === ALL_TYPES
            ? ACTIVITY_TYPES.find((activityType) =>
                site.kinds.split(',').includes(activityType.code)
              ) ||
              ACTIVITY_TYPES.find(
                (activityType) => activityType.code === 'natural,urban_environment'
              )
            : ACTIVITY_TYPES.find((activityType) => type === activityType.code),
        trip: props.model.tripCurrent
      });

      SitesSource.getDetails(site.xid)
        .then((data) => attraction.setCoord([data.point.lat, data.point.lon]))
        .then(() => props.model.addAttractionToTrip(attraction))
        .catch((err) => console.error(err));
    }

    setSearching(false);
    setCurrentAttraction(null);
  }

  function searchAttraction() {
    // TODO show an actual error

    let coord = getCoord();

    if (!query || query.length < 3) {
      setHelpText(true);
    } else
      setPromise(SitesSource.getSuggestion(query, coord[0], coord[1], RADIUS, type, NUM_RESULTS));
  }
  return (
    (trip && (
      <Box
        height="auto"
        display="flex"
        flexWrap="wrap"
        flexDirection={{ md: 'row', xs: 'column' }}
        height="100%">
        <Box flex={0.6} max-height="100%">
          {(searching && (
            <Box height="100%">
              <Box>
                <SearchView
                  user={props.model.currentUser}
                  activities={[DEFAULT_TYPE, ...ACTIVITY_TYPES]}
                  query={query}
                  type={type}
                  date={date}
                  minDate={trip.dateBegin}
                  maxDate={trip.dateEnd}
                  showHelpText={helpText}
                  onChangeQuery={(txt) => {
                    setQuery(txt);
                    txt.length > 2 && setHelpText(false);
                  }}
                  onChangeType={(type) => {
                    setType(type);
                    searchAttraction();
                  }}
                  onChangeDate={(date) => setDate(date)}
                  onSearch={searchAttraction}
                  onNotSearching={() => {
                    setSearching(false);
                    setCurrentAttraction(null);
                    setType(ALL_TYPES);
                    setDate(new Date(trip.dateBegin));
                  }}
                  useLogout={() => doLogout()}
                />
              </Box>
              <Box mt={5} mb={5} overflow="auto" sx={{ maxHeight: '50vh' }}>
                {(!promise && <InformationMessage>START TYPING!</InformationMessage>) ||
                  promiseNoData(promise, data, error) || (
                    <Box>
                      <ResultsView
                        attractions={data.features}
                        error={error}
                        onAddAttraction={(site) => addAttraction(site)}
                        onSetCurrentAttraction={(id) => setCurrentAttraction(id)}
                      />
                    </Box>
                  )}
              </Box>
            </Box>
          )) || (
            <Box height="50vh">
              <AttractionsListView
                user={props.model.currentUser}
                nameOfTrip={currentTrip}
                dateOfTrip={getDate()}
                rows={createRows()}
                numberOfAttractions={tripAttractions.length}
                type={type}
                date={date}
                minDate={trip.dateBegin}
                maxDate={trip.dateEnd}
                activities={[DEFAULT_TYPE, ...ACTIVITY_TYPES]}
                changeLiked={(key) => props.model.changeIsAttractionLiked(key)}
                changeCompleted={(key) => props.model.changeIsAttractionCompleted(key)}
                onChangeType={(type) => {
                  setType(type);
                  searchAttraction();
                }}
                onChangeDate={(date) => setDate(date)}
                onSearching={() => {
                  setSearching(true);
                  setQuery(null);
                  setType(ALL_TYPES);
                  setDate(new Date(trip.dateBegin));
                  setHelpText(false);
                  setPromise(null);
                }}
                deleteAttraction={(id) => props.model.deleteAttraction(id)}
                useLogout={() => doLogout()}
                edit={edit}
                onEditing={() => setEdit(!edit)}
                filter={filter}
                onFilter={() => setFilter(!filter)}
                checked={checked}
                showChecked={() => setChecked(!checked)}
                favourites={favourites}
                showFavourites={() => setFavourites(!favourites)}
                resetFilter={() => {
                  setChecked(true);
                  setFavourites(false);
                  setType(ALL_TYPES);
                  setFilter(false);
                }}
              />
            </Box>
          )}
        </Box>
        <Box flex={0.4} height="70vh">
          {getCoord() && (
            <MapView
              currentLocation={() => {
                const a = getCoord();
                return a;
              }} // TODO
              zoom={12}
              sites={searching ? tripAttractions : filteredAttractions}
              promise={promise}
              data={data}
              error={error}
              setPromise={setPromise}
              changeCurrAttr={(id) => props.model.setTripCurrAttr(id)}
            />
          )}
        </Box>
      </Box>
    )) || (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} mt={10}>
        <CircularProgress />
      </Box>
    )
  );
}
