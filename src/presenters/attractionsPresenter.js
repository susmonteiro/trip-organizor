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
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import InformationMessage from '../elements/showMessages.js';

import 'firebase/compat/auth';
import { signout } from '../js/models/FirebaseModel'

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

  // variables
  const [searching, setSearching] = React.useState(false);
  const [query, setQuery] = React.useState(null);
  const [type, setType] = React.useState(ALL_TYPES);
  const [date, setDate] = React.useState(new Date());
  const [helpText, setHelpText] = React.useState(false);
  const [currentAttraction, setCurrentAttraction] = React.useState(null);

  const [promise, setPromise] = React.useState(null);
  React.useEffect(function () {
    setPromise(null);
  }, []);

  const [data, error] = usePromise(promise);

  // model properties
  const trips = useModelProperty(props.model, 'trips'); // TODO remove
  const currentTrip = useModelProperty(props.model, 'tripCurrent');
  const attractions = useModelProperty(props.model, 'attractions');

  function getCoord() {
    // TODO remove me
    let trip = trips.find((trip) => trip.title === currentTrip);
    return trip ? trip.coord : null;
  }

  const tripAttractions = attractions.filter((attraction) => attraction.trip === currentTrip);
  // attractions list functions
  function createRows(attractions, currentTrip) {
    //this function formats all the rows with the information needed

    let rows = tripAttractions.map((attraction) => ({
      id: attraction.key,
      Name: attraction.name,
      Type: attraction.type,
      date: new Date(attraction.date),
      isFavourite: attraction.isFav,
      isFinished: attraction.finished
    }));
    return rows;
  }

  function doLogout(){
    props.model.setUserID(null)
    signout()
  }
  // search attraction functions
  function addAttraction(site) {
    const newKey = site.xid + currentTrip;

    if (attractions.find((attr) => attr.key === newKey)) {
      console.log('attraction already exists :/');
    } else {
      let attraction = new AttractionModel({
        id: site.xid,
        name: site.name,
        date: date.getTime(),
        type: ACTIVITY_TYPES.find((type) => site.kinds.split(',').includes(type.code)),
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
      setPromise(
        SitesSource.getSuggestion(
          query,
          coord[0],
          coord[1],
          5000, // TODO define constants
          type,
          30
        )
      );
  }
  /*TEST ATTRACTIONS*/
  return (
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
              rows={createRows(attractions, currentTrip)}
              activities={ACTIVITY_TYPES.map((type) => type.name)}
              changeLiked={(key) => props.model.changeIsAttractionLiked(key)}
              changeCompleted={(key) => props.model.changeIsAttractionCompleted(key)}
              onSearching={() => {
                setSearching(true);
                setQuery(null);
                setType(ALL_TYPES);
                setDate(new Date());
                setHelpText(false);
                setPromise(null);
              }}
              deleteAttraction={(id) => props.model.deleteAttraction(id)}
              useLogout={() => doLogout()}
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
            sites={tripAttractions}
            promise={promise}
            data={data}
            error={error}
            setPromise={setPromise}
            changeCurrAttr={(id) => props.model.setTripCurrAttr(id)}
          />
        )}
      </Box>
    </Box>
  );
}
