import '../style.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import promiseNoData from './../js/promiseNoData.js';
import SitesSource from '../js/sitesSource.js';
import { Icon } from 'leaflet';
import CustomButton, { FixedWidthButton } from '../templates/buttons.js';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import AddLocationIcon from '@mui/icons-material/AddLocation';

import markers from '../js/markers.js';

function MapView(props) {
  function createMarker(marker, fav, siteID, currID) {
    return new Icon({
      iconUrl: markers(marker, fav),
      iconSize: siteID === currID ? [25 * 1.5, 40 * 1.5] : [25 * 1.2, 40 * 1.2],
      iconAnchor: siteID === currID ? [(25 * 1.5) / 2, 40 * 1.5] : [(25 * 1.2) / 2, 40 * 1.2]
    });
  }

  const sites = props.tmpAttraction ? [...props.sites, props.tmpAttraction] : props.sites;

  return (
    <Box>
      <MapContainer center={props.currentLocation()} zoom={props.zoom}>
        <TileLayer
          url="https://api.mapbox.com/styles/v1/susmonteiro/ckx98fvsx8rnl15p5l2lgz75d/tiles/512/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic3VzbW9udGVpcm8iLCJhIjoiY2t4OTV5cXFiMDFxYjJ1cDB4OWMyaWgwbSJ9.8Tf383EhwE7rMByDJ1wFcA"
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        />
        {sites.map((site) => (
          <Marker
            icon={
              site.type
                ? site.isFav
                  ? createMarker(site.type.code, true, site.id, props.openPopup)
                  : createMarker(site.type.code, false, site.id, props.openPopup)
                : createMarker('temporary', false)
            }
            position={[site.coord[0], site.coord[1]]}
            key={site.key}
            eventHandlers={{
              click: () => {
                props.setPromise(SitesSource.getDetails(site.id, props.setPromiseImage));
                props.resetPopup();
              }
            }}>
            <Popup>
              {promiseNoData(props.promise, props.data, props.error, null, false) || (
                <Box>
                  <Typography color="primary" fontSize={18} fontWeight={500}>
                    {site.name ? site.name : "This site's name is not available"}
                  </Typography>
                  <Typography fontSize={14}>
                    {props.data && props.data.wikipedia_extracts
                      ? props.data.wikipedia_extracts.text
                      : "Sorry, we don't have information on this site."}
                  </Typography>
                  {props.data &&
                    (promiseNoData(props.promiseImage, props.dataImage, props.errorImage, true) || (
                      <img className="popup-image" src={props.data.preview.source} />
                    ))}
                  <br />
                  {!site.type && (
                    <Box textAlign="center">
                      <CustomButton
                        startIcon={<AddLocationIcon />}
                        onClick={() => props.addAttraction()}
                        size="large"
                        variant="text">
                        Add Me
                      </CustomButton>
                      <br />
                    </Box>
                  )}
                </Box>
              )}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
}

export default MapView;
