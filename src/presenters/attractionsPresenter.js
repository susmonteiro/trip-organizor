import React from 'react';

import AttractionsListView from '../views/attractionsListView';
import MapView from '../views/mapView.js';
import ResultsView from '../views/resultsView';
import SearchView from '../views/searchView';

import SitesSource from '../js/sitesSource';
import AttractionModel from '../js/models/AttractionModel.js';

import promiseNoData from '../js/promiseNoData.js';
import usePromise from '../js/usePromise.js';
import useModelProperty from '../js/useModelProperty.js';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import InformationMessage from '../templates/showMessages.js';

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
  const DEFAULT_TYPE = { code: ALL_TYPES, name: 'All' };

  // model properties
  const trips = useModelProperty(props.model, 'trips');
  const currentTrip = useModelProperty(props.model, 'tripCurrent');
  const attractions = useModelProperty(props.model, 'attractions');

  let trip = trips.find((trip) => trip.title === currentTrip);

  // variables
  const [searching, setSearching] = React.useState(false);
  const [query, setQuery] = React.useState(null);
  const [type, setType] = React.useState(ALL_TYPES);
  const [date, setDate] = React.useState(null);
  const [helpText, setHelpText] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [filter, setFilter] = React.useState(false);
  const [checked, setChecked] = React.useState(true);
  const [favourites, setFavourites] = React.useState(false);
  const [filterDate, setFilterDate] = React.useState(false);
  const [errorPopup, setErrorPopup] = React.useState('');
  const [successPopup, setSuccessPopup] = React.useState('');
  const [openPopup, setOpenPopup] = React.useState(null);
  const [currentAttraction, setCurrentAttraction] = React.useState(null);

  const [promiseAttr, setPromiseAttr] = React.useState(null);
  const [promiseMap, setPromiseMap] = React.useState(null);
  const [promiseImage, setPromiseImage] = React.useState(null);

  React.useEffect(function () {
    setPromiseAttr(null);
    setPromiseMap(null);
  }, []);

  const [dataAttr, errorAttr] = usePromise(promiseAttr);
  const [dataMap, errorMap] = usePromise(promiseMap);
  const [dataImage, errorImage] = usePromise(promiseImage);

  function getCoord() {
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

  function createRows() {
    // all the information needed for the attraction list
    let rows = filteredAttractions
      .filter((attraction) => type === ALL_TYPES || attraction.type.code === type)
      .filter((attraction) => !filterDate || attraction.date === date.getTime())
      .map((attraction) => ({
        id: attraction.id,
        key: attraction.key,
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
    signout().catch(() => setErrorPopup('There was an error when trying to logout.'));
  }

  function resetVariables() {
    setCurrentAttraction(null);
    setType(ALL_TYPES);
    setDate(new Date(trip.dateBegin));
    setQuery(null);
    setHelpText(false);
    setPromiseAttr(null);
    setChecked(true);
    setFavourites(false);
    setFilter(false);
    setFilterDate(false);
    setErrorPopup('');
    setOpenPopup(null);
  }

  function createTemporaryAttraction(site) {
    let attraction = new AttractionModel({
      id: site.xid,
      name: site.name,
      details: site
    });

    SitesSource.getDetails(site.xid)
      .then((data) => attraction.setCoord([data.point.lat, data.point.lon]))
      .then(() => setCurrentAttraction(attraction))
      .catch(() => setErrorPopup('There was an error. Please try again.'));
  }

  function addAttraction(site) {
    const newKey = site.xid + currentTrip;

    if (attractions.find((attr) => attr.key === newKey)) {
      setErrorPopup(site.name + ' already exists in your attractions');
      return;
    } else if (date < trip.dateBegin || date > trip.dateEnd) {
      setErrorPopup('Please choose a date inside the duration of the trip');
      return;
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
        .catch(() => setErrorPopup('There was an error. Please try again.'));

      setSearching(false);
      resetVariables();
      setSuccessPopup(site.name + ' added to your attractions');
    }
  }

  function canSearch(text) {
    return (
      text &&
      text.length >= 3 &&
      text
        .split('')
        .find((letter) => (letter >= 'a' && letter <= 'z') || (letter >= 'A' && letter <= 'Z'))
    );
  }

  function searchAttraction() {
    let coord = getCoord();

    if (!query || !canSearch(query)) {
      setHelpText(true);
    } else
      setPromiseAttr(
        SitesSource.getSuggestion(query, coord[0], coord[1], RADIUS, type, NUM_RESULTS)
      );
  }
  return (
    (trip && (
      <Box
        height="auto"
        display="flex"
        flexWrap="wrap"
        flexDirection="row"
        height="100%"
        width={{ md: '100vw', xs: '200vw' }}>
        <Box flex={{ md: 0.6, xs: 0.5 }} max-height="100%">
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
                    resetVariables();
                  }}
                  useLogout={() => doLogout()}
                  errorDuplicated={errorPopup}
                  resetError={() => setErrorPopup('')}
                  canSearch={canSearch(query)}
                />
              </Box>
              <Box mt={5} mb={5} overflow="auto" sx={{ maxHeight: '50vh' }}>
                {(!promiseAttr && <InformationMessage>START TYPING!</InformationMessage>) ||
                  promiseNoData(promiseAttr, dataAttr, errorAttr) || (
                    <Box>
                      <ResultsView
                        attractions={dataAttr.features}
                        error={errorAttr}
                        onAddAttraction={(site) => addAttraction(site)}
                        onSetCurrentAttraction={(site) => createTemporaryAttraction(site)}
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
                  resetVariables();
                }}
                deleteAttraction={(id) => props.model.deleteAttraction(id)}
                useLogout={() => doLogout()}
                edit={edit}
                onEditing={() => setEdit(!edit)}
                filter={filter}
                onFilter={() => setFilter(!filter)}
                filterDate={filterDate}
                onFilterDate={() => {
                  !date && setDate(new Date(trip.dateBegin));
                  setFilterDate(!filterDate);
                }}
                checked={checked}
                showChecked={() => setChecked(!checked)}
                favourites={favourites}
                showFavourites={() => setFavourites(!favourites)}
                resetFilter={() => {
                  resetVariables();
                }}
                openPopup={(id) => {
                  setOpenPopup(id);
                }}
                successPopup={successPopup}
                resetError={() => setSuccessPopup('')}
              />
            </Box>
          )}
        </Box>
        <Box flex={{ md: 0.4, xs: 0.5 }} height="70vh">
          {getCoord() && (
            <MapView
              currentLocation={getCoord}
              zoom={12}
              sites={searching ? tripAttractions : filteredAttractions}
              promise={promiseMap}
              data={dataMap}
              error={errorMap}
              setPromise={setPromiseMap}
              promiseImage={promiseImage}
              dataImage={dataImage}
              errorImage={errorImage}
              setPromiseImage={setPromiseImage}
              changeCurrAttr={(id) => props.model.setTripCurrAttr(id)}
              openPopup={openPopup}
              resetPopup={() => setOpenPopup(null)}
              tmpAttraction={currentAttraction}
              addAttraction={() => addAttraction(currentAttraction.details)}
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
