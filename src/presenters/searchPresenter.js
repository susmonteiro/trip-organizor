import React from 'react';
import SearchFormView from '../views/searchView';
import ResultsView from '../views/resultsView';
import promiseNoData from '../promiseNoData.js';
import usePromise from '../usePromise.js';
import SitesSource from '../sitesSource';
import AttractionModel from './../js/models/AttractionModel.js';
import useModelProperty from './../useModelProperty.js';

// TODO change place
const ACTIVITY_TYPES = [
  ['all', 'All'],
  ['amusements', 'Amusements'],
  ['interesting_places', 'Tourist Attractions'],
  ['sport', 'Sport'],
  ['tourist_facilities', 'Tourist Facilities']
];
const DEFAULT_TYPE = ACTIVITY_TYPES[0][0];
const ALL_TYPES = 'amusements,interesting_places,sport,tourist_facilities';

export default function SearchPresenter(props) {
  const [promise, setPromise] = React.useState(null);
  const [query, setQuery] = React.useState(null);
  const [type, setType] = React.useState(DEFAULT_TYPE);
  const [date, setDate] = React.useState(new Date());
  const [helpText, setHelpText] = React.useState(false);
  const trips = useModelProperty(props.model, 'trips'); // TODO remove m
  const currentTrip = useModelProperty(props.model, 'tripCurrent');
  const attractions = useModelProperty(props.model, 'attractions');

  function getCoord() {
    // TODO remove me
    let trip = trips.find((trip) => trip.title === currentTrip);
    return trip ? trip.coord : null;
  }

  React.useEffect(function () {
    setPromise(null);
  }, []);

  const [data, error] = usePromise(promise);

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
          coord[0], // TODO use model
          coord[1],
          5000,
          type === DEFAULT_TYPE ? ALL_TYPES : type,
          50
        )
      );
  }

  return (
    <div>
      <SearchFormView
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
      />
      {promiseNoData(promise, data, error) || (
        <ResultsView
          attractions={data.features}
          error={error}
          onAddAttraction={(site) => addAttraction(site)}
        />
      )}
    </div>
  );
}
