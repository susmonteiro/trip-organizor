import * as api from './apiConfig.js';

export const SitesSource = {
  apiCall(params, setPromiseImage=null) {
    return fetch(api.BASE_URL + params, {
      method: 'GET' // HTTP method
    })
      .then((response) => response.json())
      .then((response) => {
        if (setPromiseImage){
          setPromiseImage(fetch(response.preview.source))
        }
        return response;
      })
      .catch((error) => {
        throw new Error(error);
      });
  },

  getDetails(id, setPromiseImage) {
    return SitesSource.apiCall(
      'xid/' +
        id +
        '?' +
        new URLSearchParams({
          apikey: api.API_KEY
        }),
        setPromiseImage
    );
  },

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

  getCoords(placename, code) {
    return SitesSource.apiCall(
      'geoname?' +
        new URLSearchParams({
          name: placename,
          country: code,
          apikey: api.API_KEY
        })
    );
  }
};

export default SitesSource;
