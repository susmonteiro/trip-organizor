import React, { useState } from 'react';
import SearchFormView from '../views/searchView';
import ResultsView from '../views/resultsView';
import promiseNoData from '../promiseNoData.js';
import usePromise from '../usePromise.js';
import SitesSource from '../sitesSource';

// TODO change place
const ACTIVITY_TYPES = ['All', 'Museum', 'Restaurant', 'Sight Seeing', 'Shoping'];

export default function SearchPresenter(props) {
  const [promise, setPromise] = React.useState(null);
  const [query, setQuery] = React.useState(null);
  const [type, setType] = React.useState(ACTIVITY_TYPES[0]);
  const [date, setDate] = React.useState(new Date());

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
        onChangeType={(type) => setType(type)}
        onChangeDate={(date) => setDate(date)}
        onSearch={() => {
          setPromise(SitesSource.getSuggestion(query, 59.334591, 18.06324, 5000, ''));
          /* try {
            props.model.searchPlaces(query, type, date);
          } catch (e) {
            console.error(e);
          } */
        }}
      />
      {promiseNoData(promise, data, error) || <ResultsView attractions={data.features} />}
    </div>
  );
}
