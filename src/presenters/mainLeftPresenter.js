import React, { useState } from 'react';
import DataTable from '../views/atractionsListView';

// TODO change place
const ACTIVITY_TYPES = ['All', 'Museum', 'Restaurant', 'Sight Seeing', 'Shoping'];

function createRows(attractions) {
  //this function formats all the rows with the information needed
  let rows = attractions.map((attraction) => ({
    id: attraction.attrID,
    Name: attraction.attrName,
    Type: attraction.attrType,
    date: attraction.attrDate,
    isFavourite: attraction.attrIsFav
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
  console.log(rows);
  return (
    <DataTable
      activities={ACTIVITY_TYPES}
      rows={rows}
      changeLiked={(id) => props.model.changeIsFav(id)}
    />
  );
}
