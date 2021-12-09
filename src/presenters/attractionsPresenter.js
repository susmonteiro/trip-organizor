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

export default function AttractionsPresenter(props) {
  // constants
  const ACTIVITY_TYPES = [
    ['all', 'All'],
    ['amusements', 'Amusements'],
    ['architecture', 'Landmarks'],
    ['museums', 'Museums'],
    ['theatres_and_entertainments', 'Entertainment'],
    ['historic', 'Historical'],
    ['natural,urban_environment', 'Nature'],
    ['religion', 'Religion'],
    ['sport', 'Sport'],
    ['foods', 'Food & Drinks'],
    ['shops', 'Shops']
  ];

  const DEFAULT_TYPE = ACTIVITY_TYPES[0][0];
  const ALL_TYPES = ACTIVITY_TYPES.filter((_, idx) => idx !== 0)
    .map(([type, _]) => type)
    .join(',');

  // variables
  const [searching, setSearching] = React.useState(false);
  const [query, setQuery] = React.useState(null);
  const [type, setType] = React.useState(DEFAULT_TYPE);
  const [date, setDate] = React.useState(new Date());
  const [helpText, setHelpText] = React.useState(false);

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

  // attractions list functions
  function createRows(attractions, currentTrip) {
    //this function formats all the rows with the information needed
    let filteredAttractions = attractions.filter(
      (attraction) => attraction.attrTrip === currentTrip
    );
    let rows = filteredAttractions.map((attraction) => ({
      id: attraction.attrID,
      Name: attraction.attrName,
      Type: attraction.attrType,
      date: new Date(attraction.attrDate),
      isFavourite: attraction.attrIsFav,
      isFinished: attraction.attrFinished
    }));
    return rows;
  }

  // search attraction functions
  function addAttraction(site) {
    let attraction = new AttractionModel({
      attrID: site.xid,
      attrName: site.name,
      attrDate: date.getTime(),
      attrType: site.kinds,
      attrTrip: props.model.tripCurrent
    });

    SitesSource.getDetails(site.xid)
      .then((data) => attraction.setCoord([data.point.lat, data.point.lon]))
      .then(() => props.model.addAttractionToTrip(attraction))
      .catch((err) => console.error(err));

    setSearching(false);
  }

  function searchAttraction() {
    // TODO show an actual error

    let coord = getCoord();

    if (!query || query.length < 3) {
      setHelpText(true);
      console.error('Please type more');
    } else
      setPromise(
        SitesSource.getSuggestion(
          query,
          coord[0],
          coord[1],
          5000, // TODO define constants
          type === DEFAULT_TYPE ? ALL_TYPES : type,
          50
        )
      );
  }
  /*TEST ATTRACTIONS*/
  return (
    <Box sx={{ height: '100vh' }}>
      <Grid
        container
        spacing={0}
        justifyContent="space-between"
        sx={{ height: '100vh' }}
        direction={{ md: 'row', xs: 'column' }}>
        <Grid item md={7} xs={6}>
          <Box sx={{ height: '100%' }}>
            {(searching && (
              <Stack>
                <SearchView
                  activities={ACTIVITY_TYPES}
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
                  onNotSearching={() => setSearching(false)}
                />
                {promiseNoData(promise, data, error) || (
                  <ResultsView
                    attractions={data.features}
                    error={error}
                    onAddAttraction={(site) => addAttraction(site)}
                  />
                )}
              </Stack>
            )) || (
              <AttractionsListView
                nameOfTrip={currentTrip}
                rows={createRows(attractions, currentTrip)}
                activities={ACTIVITY_TYPES.map(([, name]) => name)}
                changeLiked={(id) => props.model.changeIsAttractionLiked(id)} // 0 for testing but should be current tripas
                changeCompleted={(id) => props.model.changeIsAttractionCompleted(id)}
                onSearching={() => setSearching(true)}
              />
            )}
          </Box>
        </Grid>
        <Grid item md={5} xs={6}>
          {getCoord() && (
            <MapView
              currentLocation={() => {
                const a = getCoord();
                return a;
              }} // TODO
              zoom={12}
              sites={attractions}
              promise={promise}
              data={data}
              error={error}
              setPromise={setPromise}
              changeCurrAttr={(id) => props.model.setTripCurrAttr(id)}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
