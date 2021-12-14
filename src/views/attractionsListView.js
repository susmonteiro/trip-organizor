import * as React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import Fab from '@mui/material/Fab';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import AddIcon from '@mui/icons-material/Add';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DeleteIcon from '@mui/icons-material/Delete';

import CustomButton, { RoundButton, DisabledButton } from '../elements/customButtons.js';
import InformationMessage from '../elements/showMessages.js';
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
        return <ArrowDownwardIcon color="primary" />;
      } else {
        return <ArrowDownwardIcon color="disabled" />;
      }
    } else {
      if (id === func) {
        return <ArrowUpwardIcon color="primary" />;
      } else {
        return <ArrowUpwardIcon color="disabled" />;
      }
    }
  }

  return (
    <Box>
      <TopBar href="trips" user={props.user} useLogout={props.useLogout}>
        My Trips
      </TopBar>
      <Box mt={-4} ml={2} mr={2}>
        <Grid container pr={5} pl={5} mt={3} alignItems="flex-end">
          <Grid item xs={8}>
            <Typography color="primary" fontSize={25} fontWeight={500} textAlign="left">
              {props.nameOfTrip}
            </Typography>
            <Typography color="primary" fontSize={15} textAlign="left">
              {new Date(props.dateOfTrip[0]).toDateString()} —{' '}
              {new Date(props.dateOfTrip[1]).toDateString()}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            {(props.numberOfAttractions === 0 && (
              <DisabledButton>
                <FilterAltIcon />
              </DisabledButton>
            )) || (
              <RoundButton
                title="Filter"
                disabled={props.numberOfAttractions === 0}
                color={props.filter ? 'secondary' : 'primary'}
                onClick={() => props.onFilter()}>
                <FilterAltIcon />
              </RoundButton>
            )}
          </Grid>
          <Grid item xs={1}>
            {(props.numberOfAttractions === 0 && (
              <DisabledButton>
                <EditIcon />
              </DisabledButton>
            )) || (
              <RoundButton
                title="Edit"
                disabled={props.numberOfAttractions === 0}
                color={props.edit ? 'secondary' : 'primary'}
                onClick={() => props.onEditing()}>
                <EditIcon />
              </RoundButton>
            )}
          </Grid>
          <Grid item xs={1}>
            <RoundButton title="Add Attraction" onClick={() => props.onSearching()}>
              <AddIcon />
            </RoundButton>
          </Grid>
          <Grid item xs={1} />
          {props.filter && (
            <Grid container mt={3}>
              <Grid item xs={3}>
                <FormControl variant="standard" fullWidth color="primary">
                  <InputLabel id="select-type-input">Type</InputLabel>
                  <Select
                    id="select-type"
                    value={props.type}
                    label="Type"
                    onChange={(event) => props.onChangeType(event.target.value)}>
                    {activities.map((type) => (
                      <MenuItem key={type.code} value={type.code}>
                        {type.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={3} ml={5}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Date"
                    disabled={!props.filterDate}
                    inputFormat="dd/MM/yyyy"
                    minDate={props.minDate}
                    maxDate={props.maxDate}
                    value={props.date}
                    onChange={(value) => props.onChangeDate(value)}
                    renderInput={(params) => <TextField {...params} variant="standard" fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={1} ml={-5} />
              <Grid item xs={1}>
                <Tooltip title="Filter By Date" placement="bottom">
                  <IconButton
                    display="center"
                    variant="contained"
                    id="filter date"
                    onClick={() => {
                      props.onFilterDate();
                    }}>
                    {props.filterDate ? (
                      <LightModeIcon color="primary" />
                    ) : (
                      <LightModeOutlinedIcon />
                    )}
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item xs={1}>
                <Tooltip title="Show Completed Attractions" placement="bottom">
                  <IconButton
                    display="center"
                    variant="contained"
                    id="show checked"
                    onClick={() => {
                      props.showChecked();
                    }}>
                    {props.checked ? (
                      <CheckBoxIcon color="primary" />
                    ) : (
                      <CheckBoxOutlineBlankIcon />
                    )}
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item xs={1}>
                <Tooltip title="Show Only Favourite" placement="bottom">
                  <IconButton
                    display="center"
                    variant="contained"
                    id="show favourites"
                    onClick={() => {
                      props.showFavourites();
                    }}>
                    {props.favourites ? (
                      <FavoriteIcon color="favourite" />
                    ) : (
                      <FavoriteBorderRoundedIcon />
                    )}
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item xs={1}>
                <Tooltip title="Reset Filters" placement="bottom">
                  <IconButton
                    display="center"
                    variant="contained"
                    id="reset"
                    onClick={() => {
                      props.resetFilter();
                    }}>
                    <CloseIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item xs={1} />
            </Grid>
          )}
        </Grid>
        {props.numberOfAttractions === 0 ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <InformationMessage>
              PRESS
              <IconButton
                aria-label="add button"
                color="primary"
                onClick={() => props.onSearching()}>
                <AddIcon />
              </IconButton>
              TO ADD YOUR FIRST ATTRACTION
            </InformationMessage>
          </Box>
        ) : (
          <Box mt={1}>
            <TableContainer component={Paper} sx={{ maxHeight: '70vh' }}>
              <Table stickyHeader aria-label="simple table">
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
                    <TableCell align="center" width="15%">
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
                    <TableCell width="10%" />
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
                      <TableCell width="10%">
                        {props.edit && (
                          <IconButton
                            display="center"
                            variant="contained"
                            color="primary"
                            id={item.id}
                            onClick={() => props.deleteAttraction(item.id)}>
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Box>
    </Box>
  );
}
