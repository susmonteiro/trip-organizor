import React, { useState } from 'react';
import SearchFormView from '../views/searchView';
import ResultsView from '../views/resultsView';
import promiseNoData from '../promiseNoData.js';
import usePromise from '../usePromise.js';
import SitesSource from '../sitesSource';
import AttractionModel from './../js/models/AttractionModel.js';

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

  React.useEffect(function () {
    setPromise(null);
  }, []);

  const [data, error] = usePromise(promise);

  function addAttraction(site) {
    // TODO check if attraction already in the trip
    // TODO add coordinates
    console.log(site.point);
    let attraction = new AttractionModel({
      attrID: site.xid,
      attrName: site.name,
      attrDate: date,
      attrType: site.kinds
    });
    props.model.addAttraction(attraction);
    console.log(props.model.listAttractions());
    // TODO navigation
  }

  function searchAttraction() {
    // TODO show an actual error and don't allow search to be done
    if (!query || query.length < 3) console.error('Please type more');
    else
      setPromise(
        SitesSource.getSuggestion(
          query,
          59.334591, // TODO use model
          18.06324,
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
        onChangeQuery={(txt) => setQuery(txt)}
        onChangeType={(type) => {
          setType(type);
          searchAttraction();
        }}
        onChangeDate={(date) => setDate(date)}
        onSearch={searchAttraction}
        onGoBack={() => console.log('GO BACK!')} // TODO navigation
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
