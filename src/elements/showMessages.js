//MATERIAL IMPORTS
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function InformationMessage(props) {
  return (
    <Box mt={10}>
      <Typography color="primary.faded" align="center" fontSize={20} {...props}></Typography>
    </Box>
  );
}

export function ErrorMessageTitle(props) {
  return <Typography color="error.main" align="center" fontSize={20} {...props}></Typography>;
}

export function ErrorMessageInformation(props) {
  return <Typography color="error.main" align="center" fontSize={15} {...props}></Typography>;
}
