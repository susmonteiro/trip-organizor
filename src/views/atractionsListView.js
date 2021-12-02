import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'; //fav icon shape
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from '@material-ui/core';

function returnButton(isFav) {
  if (isFav) {
    return (
      <FavoriteIcon
        sx={{
          color: '#EE7D61'
        }}
      />
    );
  } else
    return (
      <FavoriteBorderRoundedIcon
        sx={{
          color: '#EE7D61'
        }}
      />
    );
}

export default function DataTable(props) {
  const activities = props.activities;

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'Name', headerName: 'Name', width: 130 },
    {
      field: 'Type',
      headerName: 'Type',
      type: 'singleSelect',
      valueOptions: activities,
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
      width: 130
    }
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={props.rows}
        columns={columns}
        pageSize={props.rows.length}
        disableColumnSelector
        hideFooter
        disableSelectionOnClick
        checkboxSelection
      />
    </div>
  );
}
