import React, { useState } from 'react';
import useModelProperty from './../useModelProperty.js';
import DataTable from '../views/attractionsListView';
import Box from '@mui/material/Box';

// TODO change place
const ACTIVITY_TYPES = ['All', 'Museum', 'Restaurant', 'Sight Seeing', 'Shoping'];

function createRows(attractions) {
  //this function formats all the rows with the information needed
  let rows = attractions.map((attraction) => ({
    id: attraction.attrID,
    Name: attraction.attrName,
    Type: attraction.attrType,
    date: new Date(attraction.attrDate),
    isFavourite: attraction.attrIsFav,
    isFinished: attraction.attrFinished
  }));
  return rows;
}

export default function AttractionsListPresenter(props) {
  const currentTrip = useModelProperty(props.model, 'tripCurrent');
  const attractions = useModelProperty(props.model, 'attractions');

  /*TEST ATTRACTIONS*/
  return (
    <DataTable
      rows={createRows(attractions)}
      activities={ACTIVITY_TYPES}
      changeLiked={(id) => props.model.changeIsAttractionLiked(id)} 
      changeCompleted={(id) => props.model.changeIsAttractionCompleted(id)}
      deleteAttraction={(id) => props.model.deleteAttraction(id)}
    />
  );
}
