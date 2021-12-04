import { CircularProgress } from '@mui/material';

function promiseNoData(promise, data, error) {
  const val = promise ? (
    !data && !error ? (
      <CircularProgress />
    ) : data ? (
      false
    ) : (
      <span>{error}</span>
    )
  ) : (
    <span>no data</span>
  );
  return val;
}

export default promiseNoData;
