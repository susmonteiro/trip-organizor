export default function promiseNoData(promise, data, error) {
  if (!(promise || data || error)) {
    return (
      <div>
        <span></span>
      </div>
    );
  } else if (promise !== null && !data && !error) {
    return (
      <div>
        {/* TODO change me */}
        <img src="https://www.csc.kth.se/~cristi/loading.gif"></img>
      </div>
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
