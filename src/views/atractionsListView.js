import { DataGrid } from '@material-ui/data-grid';
//import { randomCreatedDate } from '@mui/x-data-grid-generator'; //for examples
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'; //fav icon shape
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from '@material-ui/core';
import React from 'react';

// TODO change place
const ActivityTypes = ['Museum', 'Restaurant', 'Sight Seen', 'Shoping'];

/* For testing

const rows = [
  { id: 1, Name: 'Gamla Stan', Type: 'Sight Seen', date: randomCreatedDate() },
  { id: 2, Name: 'Vasamuseet', Type: 'Museum', date: randomCreatedDate() }
];
*/

function returnButton(isFav) {
  if (isFav) {
    return (
      <FavoriteIcon
        className="like-grid-button"
        sx={{
          color: '#EE7D61'
        }}
      />
    );
  } else
    return (
      <FavoriteBorderRoundedIcon
        className="like-grid-button"
        sx={{
          color: '#EE7D61'
        }}
      />
    );
}

export default function DataTable(props) {
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'Name', headerName: 'Name', width: 130 },
    {
      field: 'Type',
      headerName: 'Type',
      type: 'singleSelect',
      valueOptions: ActivityTypes,
      width: 130
    },
    {
      field: 'date',
      headerName: 'Date',
      type: 'date',
      width: 160
    },
    {
      field: 'likebutton',
      headerName: 'Favourite',
      sortable: false,
      width: 130,
      renderCell: (params) => {
        return (
          <IconButton index={params.row.id} onClick={() => props.changeLiked(params.row.id)}>
            {returnButton(params.row.isFavourite)}
          </IconButton>
        );
      }
    }
  ];
  return (
    <div className="attractions-grid" style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={props.rows}
        columns={columns}
        headerAlling="center"
        pageSize={props.rows.lenght}
        disableColumnSelector
        hideFooter
        disableSelectionOnClick
        checkboxSelection
      />
    </div>
  );
}
