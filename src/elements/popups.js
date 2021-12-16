// MATERIAL IMPORTS
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

export function PopupTop(props) {
  return (
    <Snackbar
      open={props.message !== ''}
      autoHideDuration={7000}
      onClose={props.onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <Alert variant="filled" severity={props.type} sx={{ width: '100%', height: 50 }}>
        {props.message}
      </Alert>
    </Snackbar>
  );
}

export function PopupBottom(props) {
  return (
    <Snackbar
      open={props.message !== ''}
      autoHideDuration={7000}
      onClose={props.onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
      <Alert variant="filled" severity={props.type} sx={{ width: '100%', height: 50 }}>
        {props.message}
      </Alert>
    </Snackbar>
  );
}
