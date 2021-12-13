import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'; //fav icon shape
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Checkbox } from '@mui/material';

import { AccountButton, BackButton, AddButton } from '../elements/customButtons.js';
import TopBar from '../elements/topBar.js';

export default function AttractionsListView(props) {
  const activities = props.activities;

  let [func, setFunc] = React.useState(0);
  let [orderName, setOrderName] = React.useState(1);
  let [orderType, setOrderType] = React.useState(1);
  let [orderDate, setOrderDate] = React.useState(1);

  function compare(a, b) {
    switch (func) {
      case 0:
        if (a.name < b.name) return -1 * orderName;
        else if (a.name > b.name) return 1 * orderName;
        else return 0;
      case 1:
        if (a.type.name < b.type.name) return -1 * orderType;
        else if (a.type.name > b.type.name) return 1 * orderType;
        else return 0;
      case 2:
        if (a.date < b.date) return -1 * orderDate;
        else if (a.date > b.date) return 1 * orderDate;
        else return 0;
    }
  }

  function changeArrowDisplay(order, id, func) {
    if (order === 1) {
      if (id === func) {
        return <ArrowDownwardIcon color="secondary" />;
      } else {
        return <ArrowDownwardIcon color="disabled" />;
      }
    } else {
      if (id === func) {
        return <ArrowUpwardIcon color="secondary" />;
      } else {
        return <ArrowUpwardIcon color="disabled" />;
      }
    }
  }

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
            checked={params.row.isCompleted}
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
        return params.row.Type.name;
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
      <TopBar href="trips" user={props.user} useLogout={props.useLogout}>
        My Trips
      </TopBar>
      <Box mt={2} ml={2} mr={2}>
        <Typography color="primary" fontSize={23} fontWeight={500} textAlign="left">
          {props.nameOfTrip}
        </Typography>
        <Box mt={2}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell width="15%" />
                  <TableCell align="center" width="40%">
                    Attraction Name
                    <IconButton
                      onClick={() => {
                        setOrderName(orderName * -1);
                        setFunc(0);
                      }}>
                      {changeArrowDisplay(orderName, 0, func)}
                    </IconButton>
                  </TableCell>
                  <TableCell align="center" width="20%">
                    Type
                    <IconButton
                      onClick={() => {
                        setOrderType(orderType * -1);
                        setFunc(1);
                      }}>
                      {changeArrowDisplay(orderType, 1, func)}
                    </IconButton>
                  </TableCell>
                  <TableCell align="center" width="20%">
                    Date
                    <IconButton
                      onClick={() => {
                        setOrderDate(orderDate * -1);
                        setFunc(2);
                      }}>
                      {changeArrowDisplay(orderDate, 2, func)}
                    </IconButton>
                  </TableCell>
                  <TableCell width="5%" />
                </TableRow>
              </TableHead>
              <TableBody>
                {props.rows.sort(compare).map((item) => (
                  <TableRow hover key={item.id}>
                    <TableCell>
                      <IconButton
                        display="center"
                        variant="contained"
                        id={item.id}
                        onClick={() => {
                          props.changeCompleted(item.id);
                        }}>
                        {item.isCompleted ? (
                          <CheckBoxIcon color="primary" />
                        ) : (
                          <CheckBoxOutlineBlankIcon />
                        )}
                      </IconButton>
                      <IconButton
                        display="center"
                        variant="contained"
                        id={item.id}
                        onClick={() => {
                          props.changeLiked(item.id);
                        }}>
                        {item.isFavourite ? (
                          <FavoriteIcon color="favourite" />
                        ) : (
                          <FavoriteBorderRoundedIcon />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell align="left">{item.name}</TableCell>
                    <TableCell align="center">
                      <Chip
                        label={item.type.name}
                        sx={{ bgcolor: item.type.color, color: 'white' }}
                      />
                    </TableCell>
                    <TableCell align="center">{new Date(item.date).toDateString()}</TableCell>
                    <TableCell width="5%">
                      <IconButton
                        display="center"
                        variant="contained"
                        disabled
                        color="primary"
                        id={item.id}
                        onClick={() => props.deleteAttraction(params.row.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <AddButton onClick={() => props.onSearching()} />
        </Box>
      </Box>
    </Box>
  );
}
