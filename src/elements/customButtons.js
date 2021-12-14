//MATERIAL IMPORTS
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

//ICONs-MATERIAL IMPORTS
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PublicIcon from '@mui/icons-material/Public';
import LogoutIcon from '@mui/icons-material/Logout';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function CustomButton(props) {
  return (
    <Button
      size="large"
      variant="contained"
      color="primary"
      {...props}
      style={{ border: 0, borderRadius: 28, color: 'white', width: 100 }}></Button>
  );
}

export function BackButton(props) {
  return (
    <Button
      size="large"
      sx={{ color: 'primary.faded' }}
      startIcon={<ArrowBackIosNewIcon />}
      {...props}></Button>
  );
}

export function AccountButton(props) {
  return (
    <Box textAlign="right" mr={2}>
      <IconButton
        sx={{ color: 'primary.faded' }}
        variant="contained"
        size="large"
        href="/"
        {...props}>
        <AccountCircleIcon fontSize="inherit" />
      </IconButton>
    </Box>
  );
}

export function RoundButton(props) {
  return <IconButton color="primary" aria-label="icon button" {...props}></IconButton>;
  //return <Fab color="secondary" dark="true" aria-label="add" {...props}></Fab>; TODO
}

export function BasicSpeedDial(props) {
  const goTrips = () => {
    window.location.href = '/trips';
  };

  const doLogout = () => {
    props.useLogout();
  };

  const actions = [
    { icon: <PublicIcon />, name: 'My Trips', event: goTrips },
    { icon: <LogoutIcon />, name: 'Logout', event: doLogout }
  ];

  return (
    <Box sx={{ height: 100, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', top: 16, right: 16 }}
        direction="left"
        icon={<MoreHorizIcon />}>
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.event}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
