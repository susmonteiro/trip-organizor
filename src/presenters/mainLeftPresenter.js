import React, { useState } from 'react';
import DataTable from '../views/attractionsListView';

// TODO change place
const ACTIVITY_TYPES = ['All', 'Museum', 'Restaurant', 'Sight Seeing', 'Shoping'];

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
  /*EVERYTHING IS GREAT BELOW THIS, ALL THE LOGIC IS WORKING*/
  if (typeof props.model.trips[0] !== 'undefined') {
    console.log('I am not undefined');
    const [rows, setRows] = useState(createRows(props.model.trips[0].listAttractions()));
    React.useEffect(function () {
      function obs() {
        setRows(createRows(props.model.trips[0].listAttractions()));
      }
      props.model.addObserver(obs); // 1. subscribe
      return function () {
        props.model.removeObserver(obs);
      }; // 2.unsubscribe
    }, []);
    return (
      <DataTable
        rows={rows}
        activities={ACTIVITY_TYPES}
        changeLiked={(id) => props.model.changeIsAttractionLiked(id)} // 0 for testing but should be current tripas
        changeCompleted={(id) => props.model.changeIsAttractionCompleted(id)}
      />
    );
  } else {
    console.log(props.model);
    props.model.notifyObersvers();
    return <div> No attractions yet</div>; //TODO add something to display when we have no attractions
  }
}
