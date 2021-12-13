import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'; //fav icon shape
// import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'; //fav icon shape
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Checkbox } from '@mui/material';

import { AccountButton, BackButton, AddButton } from '../elements/customButtons.js';
import TopBar from '../elements/topBar.js';

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

export default function AttractionsListView(props) {
  const activities = props.activities;
  const columns = [
    {
      field: 'check',
      headerName: 'Completed',
      width: 120,
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
      width: 130,
      valueGetter: (params) => {
        return params.row.Type.name
      },
      renderCell: (params) => {
        return <Chip label={params.row.Type.name} sx={{ bgcolor: params.row.Type.color }} />;
      }
    },
    {
      field: 'date',
      headerName: 'Date',
      type: 'date',
      width: 130
    },
    {
      field: 'likebutton',
      headerName: 'Favourite',
      sortable: false,
      width: 130,
      renderCell: (params) => {
        if (params.row.isFavourite) {
          return (
            <IconButton aria-label="like" onClick={() => props.changeLiked(params.row.id)}>
              <FavoriteIcon />
            </IconButton>
          );
        } else {
          return (
            <IconButton aria-label="like" onClick={() => props.changeLiked(params.row.id)}>
              <FavoriteBorderRoundedIcon />
            </IconButton>
          );
        }
      }
    },
    {
      field: 'deletebutton',
      headerName: '',
      sortable: false,
      width: 120,
      renderCell: (params) => {
        return (
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={() => props.deleteAttraction(params.row.id)}>
            Delete
          </Button>
        );
      }
    }
  ];


  return (
    <Box>
      <TopBar href="trips" user={props.user} useLogout={props.useLogout}>My Trips</TopBar>
      <Box mt={2} ml={2} mr={2}>
        <Typography color="primary" fontSize={23} fontWeight={500} textAlign="left">
          {props.nameOfTrip}
        </Typography>
        <Box mt={2}>
          <DataGrid
            ////////////// TODO
            id={Math.random()}
            ////////////// TODO
            rows={props.rows}
            columns={columns}
            pageSize={(props.rows && props.rows.length) || 0}
            disableColumnSelector
            hideFooter
            disableSelectionOnClick
          />
          <AddButton onClick={() => props.onSearching()} />
        </Box>
      </Box>
    </Box>
  );
}
