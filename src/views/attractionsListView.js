import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
// import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'; //fav icon shape
// import FavoriteIcon from '@mui/icons-material/Favorite';
import { Checkbox } from '@mui/material';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

/* function returnButton(isFav) {
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
} */

export default function DataTable(props) {
  const activities = props.activities;

  const columns = [
    {
      field: 'check',
      headerName: 'Completed',
      width: 140,
      renderCell: (params) => {
        return (
          <Checkbox
            color="primary"
            index={params.row.id}
            checked={params.row.isFinished}
            onClick={() => props.changeCompleted(params.row.id)}></Checkbox>
        );
      }
    },
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
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={props.rows}
        columns={columns}
        pageSize={(props.rows && props.rows.length) || 0}
        disableColumnSelector
        hideFooter
        disableSelectionOnClick
      />
      <Fab
        color="secondary"
        aria-label="add"
        sx={{ position: 'absolute', bottom: 50, right: 50 }}
        component={Link}
        to="/search">
        {/* TODO change me */}
        <AddIcon />
      </Fab>
    </div>
  );
}
