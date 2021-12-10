import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

export default function promiseNoData(promise, data, error) {
  if (!(promise || data || error)) {
    return (
      <div>
        <span></span>
      </div>
    );
  } else if (promise !== null && !data && !error) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} mt={10}>
        <CircularProgress />
      </Box>
    );
  } else if (error) {
    return (
      <Box mt={10}>
        <Typography color="error.main" align="center" fontSize={20}>
          THERE WAS AN ERROR FETCHING THE DATA
        </Typography>
        <Typography color="error.main" align="center" fontSize={15}>
          Please try again or contact the developers team
        </Typography>
      </Box>
    );
  } else {
    return false;
  }
}
