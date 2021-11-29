import DataTable from '../Views/AtractionsListView';

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
  return (
    <DataTable
      rows={createRows(props.model.listAttractions())}
      changeLiked={(id) => props.model.changeIsFav(id)}
    />
  );
}
