//MATERIAL IMPORTS
import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
//ICONs-MATERIAL IMPORTS
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import FlightIcon from '@mui/icons-material/Flight';

/********************** */
import TripModel from '../js/models/TripModel.js';
/********************* */
export default function TripListView(props) {
  const newTrip = new TripModel(
    'Zambia',
    new Date('2020-03-21'),
    new Date('2020-03-25'),
    [null, null],
    false,
    [],
    null
  );

  let [func, setFunc] = React.useState(1);
  let [ordertitle, setOrdertitle] = React.useState(1);
  let [orderBDate, setOrderBDate] = React.useState(1);
  let [orderEDate, setOrderEDate] = React.useState(1);
  let [open, setOpen] = React.useState(false);

  function compare(a, b) {
    switch (func) {
      case 0:
        if (a.title < b.title) return -1 * ordertitle;
        else if (a.title > b.title) return 1 * ordertitle;
        else return 0;
      case 1:
        if (a.dateBegin < b.dateBegin) return -1 * orderBDate;
        else if (a.dateBegin > b.dateBegin) return 1 * orderBDate;
        else return 0;
      case 2:
        if (a.dateEnd < b.dateEnd) return -1 * orderEDate;
        else if (a.dateEnd > b.dateEnd) return 1 * orderEDate;
        else return 0;
    }
  }

  function changeArrowDisplay(order, id) {
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

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const undoAction = (
    <React.Fragment>
      <IconButton
        diabled="true"
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}>
        <AirplaneTicketIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Typography variant="h4" component="div" gutterBottom>
            MY TRIPS
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Stack spacing={2}>
            <IconButton size="large" onClick={() => console.log('User wants to see profile')}>
              <AccountCircleOutlinedIcon fontSize="inherit" />
            </IconButton>
            <Button
              id="addNewTrip"
              display="right"
              variant="contained"
              startIcon={<FlightIcon />}
              onClick={() => {
                props.addTrip(newTrip);
              }}>
              Add Trip!
            </Button>
            <br />
          </Stack>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="center">
                Trip title
                <IconButton
                  onClick={() => {
                    setOrdertitle(ordertitle * -1);
                    setFunc(0);
                  }}>
                  {changeArrowDisplay(ordertitle, 0)}
                </IconButton>
              </TableCell>
              <TableCell align="center">
                From:
                <IconButton
                  onClick={() => {
                    setOrderBDate(orderBDate * -1);
                    setFunc(1);
                  }}>
                  {changeArrowDisplay(orderBDate, 1)}
                </IconButton>
              </TableCell>
              <TableCell align="center">
                To:
                <IconButton
                  onClick={() => {
                    setOrderEDate(orderEDate * -1);
                    setFunc(2);
                  }}>
                  {changeArrowDisplay(orderEDate, 2)}
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.trips
              .filter((trip) => trip.finished === false)
              .sort(compare)
              .map((item) => (
                <TableRow key={item.title}>
                  <TableCell>
                    <IconButton
                      display="center"
                      variant="contained"
                      id={item.title}
                      onClick={() => {
                        handleClick();
                        props.removeTrip(item);
                      }}>
                      <CheckBoxOutlineBlankIcon />
                    </IconButton>
                    <Snackbar
                      open={open}
                      autoHideDuration={4000}
                      onClose={handleClose}
                      message="Woohoo! Trip completed. What´ll be your next adventure?"
                      action={undoAction}
                    />
                  </TableCell>
                  <TableCell align="center">{item.title}</TableCell>
                  <TableCell align="center">{item.dateBegin.toDateString()}</TableCell>
                  <TableCell align="center">{item.dateEnd.toDateString()}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
