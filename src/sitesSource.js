import * as api from './apiConfig.js';

export const SitesSource = {
  apiCall(params) {
    console.log(api.BASE_URL + params);
    return fetch(api.BASE_URL + params, {
      method: 'GET' // HTTP method
    }).then((response) => response.json());
  },

  getDetails(id) {
    return SitesSource.apiCall(
      'xid/' +
        id +
        '?' +
        new URLSearchParams({
          apikey: api.API_KEY
        })
    );
  },
  /* Usage example for getSuggestion
  SitesSource.getCoords('Stockholm').then((coords) =>{
    SitesSource.getSuggestion("ABBA", coords.lat, coords.lon, 5000, "museums")
    .then((res) => {console.log(res)})
  })
  */
  getSuggestion(name, lat, lon, radius, kinds = '', maxNumberResults = 10) {
    let searchParams = {
      lon: lon,
      lat: lat,
      name: name,
      radius: radius,
      apikey: api.API_KEY,
      kinds: kinds,
      limit: maxNumberResults
    };

    if (kinds) {
      searchParams = { ...searchParams, kinds: kinds };
    }

    return SitesSource.apiCall('autosuggest?' + new URLSearchParams(searchParams));
  },

  getSites(radius, lat, lon) {
    const searchParams = {
      lon: lon,
      lat: lat,
      radius: radius,
      apikey: api.API_KEY
    };

    return SitesSource.apiCall('radius?' + new URLSearchParams(searchParams));
  },

  getCoords(placename) {
    return SitesSource.apiCall(
      'geoname?' +
        new URLSearchParams({
          name: placename,
          apikey: api.API_KEY
        })
    );
  }
};

export default SitesSource;
