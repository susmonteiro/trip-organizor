import React, { useState } from 'react';
import SearchFormView from '../views/searchView';
import ResultsView from '../views/resultsView';
import promiseNoData from '../promiseNoData.js';
import usePromise from '../usePromise.js';
import SitesSource from '../sitesSource';

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
  const [attractions, setAttractions] = React.useState(null);

  function findNewAttractions() {
    console.log(type);
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

  React.useEffect(function () {
    setPromise(null);
  }, []);

  const [data, error] = usePromise(promise);

  return (
    <div>
      <SearchFormView
        activities={ACTIVITY_TYPES}
        query={query}
        type={type}
        date={date}
        onChangeQuery={(txt) => setQuery(txt)}
        onChangeType={(type) => {
          console.log(type);
          setType(type);
        }}
        onChangeDate={(date) => setDate(date)}
        onSearch={
          () => findNewAttractions()
          /* try {
            props.model.searchPlaces(query, type, date);
          } catch (e) {
            console.error(e);
          } */
        }
      />
      {promiseNoData(promise, data, error) || <ResultsView attractions={data.features} />}
    </div>
  );
}
