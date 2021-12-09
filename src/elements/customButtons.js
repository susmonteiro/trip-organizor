//MATERIAL IMPORTS
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';

//ICONs-MATERIAL IMPORTS
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

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

export function AccountButton() {
  return (
    <Box textAlign="right" mr={2}>
      <IconButton sx={{ color: 'primary.faded' }} variant="contained" size="large" href="/">
        <AccountCircleIcon fontSize="inherit" />
      </IconButton>
    </Box>
  );
}

export function AddButton(props) {
  return (
    <Fab
      color="secondary"
      dark="true"
      aria-label="add"
      sx={{ position: 'absolute', bottom: 50, left: 50 }}
      {...props}>
      {/* TODO change me */}
      <AddIcon />
    </Fab>
  );
}
