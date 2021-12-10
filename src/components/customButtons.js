//MATERIAL IMPORTS
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

//ICONs-MATERIAL IMPORTS
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
    <Button size="large" color="secondary" startIcon={<ArrowBackIosNewIcon />} {...props}></Button>
  );
}

export function AccountButton(props) {
  return (
    <Box textAlign="right" mr={2}>
      <IconButton color="secondary" variant="contained" size="large" href="/" {...props}>
        <AccountCircleIcon fontSize="inherit" />
      </IconButton>
    </Box>
  );
}
