import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import TripListView from '../views/tripListView';
import AddTripView from '../views/tripListView';

export default function TripListPresenter(props) {
  const [tripList, setTripList] = React.useState(props.model.trips);
  const [showDone, setShowDone] = React.useState(false);
  const [showAddTrip, setShowAddTrip] = React.useState(false);

  React.useEffect(function () {
    function obs() {
      setTripList(props.model.trips);
      setShowDone(false);
      setShowAdd(false);
    }
    props.model.addObserver(obs);
    return function () {
      props.model.removeObserver(obs);
    };
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setShowAddTrip(open);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const addTripSideBar = () => (
    <React.Fragment key={'right'}>
      <Button onClick={toggleDrawer(true)}>{'bottom'}</Button>
      <SwipeableDrawer
        anchor={'right'}
        open={showAddTrip}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}>
        {list()}
      </SwipeableDrawer>
    </React.Fragment>
  );
  ///////////////////
  {
    addTripSideBar();
  }
  ///////////////////
  return (
    <div>
      <div>
        <TripListView
          trips={tripList}
          completeTrip={(trip) => {
            props.model.changeFinished(trip);
          }}
          removeTrip={(deleteTrip) => {
            props.model.removeTrip(deleteTrip);
          }}
          addTrip={(newTrip) => {
            props.model.addTrip(newTrip);
          }}
          tripChoice={(id) => {
            props.model.setTripCurrent(id);
          }}
          showDoneChange={() => {
            setShowDone(!showDone);
          }}
          showDone={showDone}
          showAddChange={(show) => setShowAdd(show)}
        />
      </div>
      <div>{addTripSideBar()}</div>
    </div>
  );
}
