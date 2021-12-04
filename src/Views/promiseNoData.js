function promiseNoData(promise, data, error) {
  const val = promise ? (
    !data && !error ? (
      <img src="http://www.csc.kth.se/~cristi/loading.gif" />
    ) : data ? (
      false
    ) : (
      <span>{error}</span>
    )
  ) : (
    <span>no data</span>
  );
  console.log(val, promise, data, error);
  return val;
}

export default promiseNoData;
