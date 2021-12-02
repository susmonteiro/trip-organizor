import React, { useState } from 'react';
import DataTable from '../views/atractionsListView';
import SearchFormView from '../views/searchView';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

// TODO change place
const ACTIVITY_TYPES = ['Museum', 'Restaurant', 'Sight Seeing', 'Shoping'];

function createRows(attractions) {
  //this function formats all the rows with the information needed
  let rows = attractions.map((attraction) => ({
    id: attraction.attrID,
    Name: attraction.attrName,
    Type: attraction.attrType,
    date: attraction.attrDate,
    isFavourite: attraction.attrIsFav,
    isFinished: attraction.attrFinished
  }));
  return rows;
}

export default function MainLeftPresenter(props) {
  const [rows, setRows] = useState(createRows(props.model.listAttractions()));
  React.useEffect(function () {
    function obs() {
      setRows(createRows(props.model.listAttractions()));
    }
    props.model.addObserver(obs); // 1. subscribe
    return function () {
      props.model.removeObserver(obs);
    }; // 2.unsubscribe
  }, []);
  return (
    <Box>
      <SearchFormView activities={ACTIVITY_TYPES} />
      <br />
      <DataTable
        rows={rows}
        changeLiked={(id) => props.model.changeIsFav(id)}
        changeCompleted={(id) => props.model.changeIsFinish(id)}
      />
    </Box>
  );
}
