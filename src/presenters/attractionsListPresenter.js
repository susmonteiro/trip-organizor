import React, { useState } from 'react';
import useModelProperty from './../useModelProperty.js';
import DataTable from '../views/attractionsListView';
import Box from '@mui/material/Box';

// TODO change place
const ACTIVITY_TYPES = ['All', 'Museum', 'Restaurant', 'Sight Seeing', 'Shoping'];

function createRows(attractions, currentTrip) {
  //this function formats all the rows with the information needed
  let filteredAttractions = attractions.filter((attraction) => attraction.attrTrip === currentTrip);
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

export default function AttractionsListPresenter(props) {
  const currentTrip = useModelProperty(props.model, 'tripCurrent');
  const attractions = useModelProperty(props.model, 'attractions');

  /*TEST ATTRACTIONS*/
  return (
    <DataTable
      rows={createRows(attractions, currentTrip)}
      activities={ACTIVITY_TYPES}
      changeLiked={(id) => props.model.changeIsAttractionLiked(id)} // 0 for testing but should be current tripas
      changeCompleted={(id) => props.model.changeIsAttractionCompleted(id)}
    />
  );
}
