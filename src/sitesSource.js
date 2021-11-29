import * as api from "./js/apiConfig.js";

export const SitesSource = {
  // JS object creation literal
  apiCall(params) {
    console.log(api.BASE_URL + params);
    return (
      fetch(api.BASE_URL + params, {
        method: "GET", // HTTP method
      })
        // from HTTP response headers to HTTP response data
        .then((response) => response.json())
      //.then((responseJSON) => console.log(responseJSON))
    );
  },

  getDetails(id) {
    return SitesSource.apiCall(
      "xid/" +
        id +
        "?" +
        new URLSearchParams({
          apikey: api.API_KEY,
        })
    );
  },

  getSites(radius, lat, lon) {
    return SitesSource.apiCall(
      "radius?" +
        new URLSearchParams({
          lon:lon,
          lat:lat,
          radius:radius,
          apikey: api.API_KEY,
        })
    );
  },

  getCoords(placename){
    return SitesSource.apiCall(
      "geoname?" +
        new URLSearchParams({
          name: placename,
          apikey: api.API_KEY,
        })
    );
  }
};

export default SitesSource;
