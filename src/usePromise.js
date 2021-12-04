import React, { useState } from 'react';

export default function usePromise(promise) {
  // custom hook
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  React.useEffect(
    function () {
      setData(null);
      setError(null);
      let cancelled = false;
      if (promise)
        promise
          .then((dt) => {
            if (!cancelled) setData(dt);
          })
          .catch((er) => {
            if (!cancelled) setError(er);
          });
      return function () {
        cancelled = true;
      };
    },
    [promise]
  );
  return [data, error];
}
