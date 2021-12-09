//MATERIAL IMPORTS
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

//ICONs-MATERIAL IMPORTS
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
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

export function AccountButton() {
  return (
    <Box textAlign="right" mr={2}>
      <IconButton color="secondary" size="large" href="/">
        <AccountCircleOutlinedIcon fontSize="inherit" />
      </IconButton>
    </Box>
  );
}
