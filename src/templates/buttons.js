// MATERIAL IMPORTS
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Tooltip from '@mui/material/Tooltip';

// ICONs-MATERIAL IMPORTS
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PublicIcon from '@mui/icons-material/Public';
import LogoutIcon from '@mui/icons-material/Logout';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CloseIcon from '@mui/icons-material/Close';

export default function CustomButton(props) {
  return (
    <Button
      size="large"
      variant="contained"
      color="primary"
      {...props}
      style={{
        borderRadius: 28,
        color: props.variant === 'text' || props.variant === 'outlined' ? 'primary.main' : 'white'
      }}></Button>
  );
}

export function FixedWidthButton(props) {
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
  return (
    <Tooltip title={props.title} placement="top">
      <IconButton
        color={props.color || 'primary'}
        aria-label="icon button"
        disabled={props.disabled}
        onClick={() => props.onClick()}>
        {props.children}
      </IconButton>
    </Tooltip>
  );
}

export function DisabledButton(props) {
  return (
    <IconButton aria-label="icon button" disabled>
      {props.children}
    </IconButton>
  );
}

export function CloseButton(props) {
  return (
    <Tooltip title="close" placement="bottom">
      <IconButton color={props.color || 'primary'} aria-label="close button" {...props}>
        <CloseIcon />
      </IconButton>
    </Tooltip>
  );
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
