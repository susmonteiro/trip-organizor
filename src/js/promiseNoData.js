import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import { ErrorMessageTitle, ErrorMessageInformation } from '../templates/showMessages.js';

export default function promiseNoData(promise, data, error, image = null, showError = true) {
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
    if (image) {
      return <span></span>;
    } else if (showError) {
      return (
        <Box mt={10}>
          <ErrorMessageTitle>THERE WAS AN ERROR FETCHING THE DATA</ErrorMessageTitle>
          <ErrorMessageInformation>
            Please try again or contact the developers team
          </ErrorMessageInformation>
        </Box>
      );
    }
  } else {
    return false;
  }
}
