// MATERIAL IMPORTS
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// ICONs-MATERIAL IMPORTS
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import FlightIcon from '@mui/icons-material/Flight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// CUSTOM COMPONENTS
import CustomButton, { BasicSpeedDial } from '../elements/customButtons.js';
import { PopupBottom } from '../elements/popups.js';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TripListView(props) {
  // FUTURE TRIPS
  let [func, setFunc] = React.useState(1);
  let [ordertitle, setOrdertitle] = React.useState(1);
  let [orderBDate, setOrderBDate] = React.useState(1);
  let [orderEDate, setOrderEDate] = React.useState(1);
  let [openAction, setOpenAction] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openDuplicate, setOpenDuplicate] = React.useState(false);

  // PAST TRIPS
  let [funcDone, setFuncDone] = React.useState(1);
  let [ordertitleDone, setOrdertitleDone] = React.useState(1);
  let [orderBDateDone, setOrderBDateDone] = React.useState(1);
  let [orderEDateDone, setOrderEDateDone] = React.useState(1);

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

  function compareDone(a, b) {
    switch (funcDone) {
      case 0:
        if (a.title < b.title) return -1 * ordertitleDone;
        else if (a.title > b.title) return 1 * ordertitleDone;
        else return 0;
      case 1:
        if (a.dateBegin < b.dateBegin) return -1 * orderBDateDone;
        else if (a.dateBegin > b.dateBegin) return 1 * orderBDateDone;
        else return 0;
      case 2:
        if (a.dateEnd < b.dateEnd) return -1 * orderEDateDone;
        else if (a.dateEnd > b.dateEnd) return 1 * orderEDateDone;
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

  const handleClickOpen = (id) => {
    if (id === 'Delete') setOpenDelete(true);
    else if (id === 'Duplicate') setOpenDuplicate(true);
    else if (id === 'Edit') {
      if (props.showEdit === false) {
        props.showEditChange(!props.showEdit);
      }
      setOpenAction(false);
    } else if (id === 'Action') setOpenAction(true);
  };

  const handleClose = (id) => {
    if (id === 'Delete') {
      if (props.showEdit) {
        props.showEditChange(!props.showEdit);
      }
      setOpenDelete(false);
    } else if (id === 'Duplicate') setOpenDuplicate(false);
    else if (id === 'Edit') props.showEditChange(!props.showEdit);
    else if (id === 'Action') setOpenAction(false);
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
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Box mt={7} ml={3}>
            <Typography variant="h4" component="div" gutterBottom>
              My trips
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box mb={3} mr={2}>
            <Stack spacing={2}>
              <BasicSpeedDial useLogout={props.useLogout} user={props.user} />
              <CustomButton
                id="addNewTrip"
                display="right"
                variant="contained"
                onClick={() => {
                  props.showAddChange(!props.showAdd);
                  if (props.showEdit) props.showEditChange(!props.showEdit);
                }}
                startIcon={<FlightIcon />}>
                Add Trip!
              </CustomButton>
            </Stack>
          </Box>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell wdith="3%" />
              <TableCell width="3%"></TableCell>
              <TableCell align="center">
                Trip title
                <IconButton
                  onClick={() => {
                    setOrdertitle(ordertitle * -1);
                    setFunc(0);
                  }}>
                  {changeArrowDisplay(ordertitle, 0, func)}
                </IconButton>
              </TableCell>
              <TableCell align="center">
                From:
                <IconButton
                  onClick={() => {
                    setOrderBDate(orderBDate * -1);
                    setFunc(1);
                  }}>
                  {changeArrowDisplay(orderBDate, 1, func)}
                </IconButton>
              </TableCell>
              <TableCell align="center">
                To:
                <IconButton
                  onClick={() => {
                    setOrderEDate(orderEDate * -1);
                    setFunc(2);
                  }}>
                  {changeArrowDisplay(orderEDate, 2, func)}
                </IconButton>
              </TableCell>
              <TableCell align="center"># of Attractions</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {props.trips
              .filter((trip) => trip.finished === false)
              .sort(compare)
              .map((item) => (
                <TableRow hover key={item.title}>
                  <TableCell align="right">
                    <IconButton
                      display="center"
                      variant="contained"
                      id={item.title}
                      onClick={() => {
                        props.completeTrip(item);
                      }}>
                      <CheckBoxOutlineBlankIcon />
                    </IconButton>
                    {props.completed && (
                      <PopupBottom
                        type={'info'}
                        message={'Woohoo! Trip completed. What´ll be your next adventure?'}
                        onClose={props.timeoutSnack}
                      />
                    )}
                  </TableCell>
                  <TableCell align="left">
                    <img
                      loading="lazy"
                      width="20"
                      src={`https://flagcdn.com/w20/${item.countryCode.toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/w40/${item.countryCode.toLowerCase()}.png 2x`}
                      alt=""
                    />
                  </TableCell>
                  <TableCell
                    align="left"
                    onClick={() => {
                      props.tripChoice(item.title);
                      handleClickOpen('Action');
                    }}>
                    {item.title}
                  </TableCell>
                  <Dialog
                    open={openAction}
                    onClose={() => handleClose('Action')}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{'What do you want to do?'}</DialogTitle>
                    <DialogContent>
                      <Box width={300}>
                        <List>
                          {[
                            { action: 'Edit', icon: <EditIcon /> },
                            { action: 'Duplicate', icon: <ContentCopyIcon /> },
                            { action: 'Delete', icon: <DeleteIcon /> }
                          ].map((item) => (
                            <ListItem disablePadding key={item.action}>
                              <ListItemButton
                                onClick={() => {
                                  handleClickOpen(item.action);
                                }}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.action} />
                              </ListItemButton>
                            </ListItem>
                          ))}
                          <Dialog
                            open={openDelete}
                            onClose={() => handleClose('Delete')}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description">
                            <DialogTitle id="alert-dialog-title">
                              {'WAIT!! Delete this trip?'}
                            </DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description">
                                Are you 100% sure that you want to delete this trip and all the
                                memories contained within it? This action cannot be reversed!
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button
                                onClick={() => {
                                  handleClose('Delete');
                                  handleClose('Action');
                                }}>
                                No
                              </Button>
                              <Button
                                onClick={() => {
                                  handleClose('Delete');
                                  handleClose('Action');
                                  props.removeTrip(props.tripCurrent);
                                }}
                                autoFocus>
                                Yes
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </List>
                      </Box>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={() => {
                          handleClose('Action');
                        }}>
                        Cancel
                      </Button>
                    </DialogActions>
                  </Dialog>
                  <Dialog
                    open={openDuplicate}
                    id="Duplicate"
                    onClose={() => handleClose('Duplicate')}>
                    <DialogTitle>Trip Duplication</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        You´re about to duplicate a trip, please assign a new name to it
                      </DialogContentText>
                      <TextField
                        autoFocus
                        fullWidth
                        id="Tripname"
                        margin="dense"
                        inputProps={{
                          maxLength: 50
                        }}
                        error={
                          props.title === ''
                            ? false
                            : props.validateTitleExist(props.title) ||
                              props.validateAttrEmpty(props.title)
                        }
                        label="New Trip Name"
                        variant="standard"
                        helperText={
                          props.validateAttrEmpty(props.title) == 'empty'
                            ? 'Where are you going?! Your trip needs a name!'
                            : props.validateTitleExist(props.title)
                            ? 'Oops! Trip name already exists'
                            : ''
                        }
                        onBlur={(eventTitle) => {
                          props.setTitleNow(eventTitle.target.value);
                        }}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button
                        id="Duplicate"
                        onClick={() => {
                          handleClose('Duplicate');
                          handleClose('Action');
                        }}>
                        Cancel
                      </Button>
                      <Button
                        id="Duplicate"
                        disabled={
                          props.validateTitleExist(props.title) ||
                          props.validateAttrEmpty(props.title) == 'empty'
                        }
                        onClick={(event) => {
                          handleClose('Duplicate');
                          handleClose('Action');
                          props.duplicate();
                        }}>
                        Yes, duplicate!
                      </Button>
                    </DialogActions>
                  </Dialog>
                  <TableCell align="center" onClick={() => props.tripChoice(item.title)}>
                    {new Date(item.dateBegin).toDateString()}
                  </TableCell>
                  <TableCell align="center" onClick={() => props.tripChoice(item.title)}>
                    {new Date(item.dateEnd).toDateString()}
                  </TableCell>
                  <TableCell align="center">1</TableCell>
                  <TableCell>
                    <CustomButton href="/attractions" onClick={() => props.tripChoice(item.title)}>
                      Go
                    </CustomButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* HERE BEGINS THE SHOW COMPLETED TRIPS SECTION */}
      <Button
        id="ShowCompleted"
        display="right"
        onClick={() => props.showDoneChange(!props.showDone)}
        endIcon={props.showDone ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}>
        Show Completed
      </Button>
      {props.showDone === false ? (
        <Box></Box>
      ) : (
        <Box>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell wdith="3%" />
                  <TableCell width="3%"></TableCell>
                  <TableCell align="center">
                    Trip title
                    <IconButton
                      onClick={() => {
                        setOrdertitle(ordertitle * -1);
                        setFunc(0);
                      }}>
                      {changeArrowDisplay(ordertitle, 0, func)}
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    From:
                    <IconButton
                      onClick={() => {
                        setOrderBDate(orderBDate * -1);
                        setFunc(1);
                      }}>
                      {changeArrowDisplay(orderBDate, 1, func)}
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    To:
                    <IconButton
                      onClick={() => {
                        setOrderEDate(orderEDate * -1);
                        setFunc(2);
                      }}>
                      {changeArrowDisplay(orderEDate, 2, func)}
                    </IconButton>
                  </TableCell>
                  <TableCell align="center"># of Attractions</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {props.trips
                  .filter((trip) => trip.finished === true)
                  .sort(compareDone)
                  .map((item) => (
                    <TableRow hover key={item.title}>
                      <TableCell>
                        <IconButton
                          display="center"
                          variant="contained"
                          id={item.title}
                          onClick={() => {
                            props.completeTrip(item);
                          }}>
                          <CheckBoxIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell align="left">
                        <img
                          loading="lazy"
                          width="20"
                          src={`https://flagcdn.com/w20/${item.countryCode.toLowerCase()}.png`}
                          srcSet={`https://flagcdn.com/w40/${item.countryCode.toLowerCase()}.png 2x`}
                          alt=""
                        />
                      </TableCell>
                      <TableCell
                        align="left"
                        onClick={() => {
                          props.tripChoice(item.title);
                          props.showEditChange(!props.showEdit);
                          if (props.showAdd) props.showAddChange(!props.showAdd);
                        }}>
                        {item.title}
                      </TableCell>
                      <TableCell align="center">
                        {new Date(item.dateBegin).toDateString()}
                      </TableCell>
                      <TableCell align="center">{new Date(item.dateEnd).toDateString()}</TableCell>
                      <TableCell align="center">1</TableCell>
                      <TableCell>
                        <Button variant="contained" onClick={() => props.removeTrip(item)}>
                          <DeleteOutlineIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
}
