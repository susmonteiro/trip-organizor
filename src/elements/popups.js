//MATERIAL IMPORTS
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';

import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Tooltip from '@mui/material/Tooltip';

//ICONs-MATERIAL IMPORTS
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PublicIcon from '@mui/icons-material/Public';
import LogoutIcon from '@mui/icons-material/Logout';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function ErrorPopupTop(props) {
  return (
    <Snackbar
      open={props.errormsg !== ''}
      autoHideDuration={7000}
      onClose={props.onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <Alert variant="filled" severity="error" sx={{ width: '100%', height: 50 }}>
        {props.errormsg}
      </Alert>
    </Snackbar>
  );
}

export function ErrorPopupBottom(props) {
  return (
    <Snackbar
      open={props.errormsg !== ''}
      autoHideDuration={7000}
      onClose={props.onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
      <Alert variant="filled" severity="error" sx={{ width: '100%', height: 50 }}>
        {props.errormsg}
      </Alert>
    </Snackbar>
  );
}
