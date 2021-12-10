import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function promiseNoData(promise, data, error) {
  if (!(promise || data || error)) {
    return (
      <div>
        <span></span>
      </div>
    );
  } else if (promise !== null && !data && !error) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  } else if (error) {
    return (
      <div>
        <span>{error}</span>
      </div>
    );
  } else {
    return false;
  }
}
