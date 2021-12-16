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
  function createMarker(marker, fav) {
    return new Icon({
      iconUrl: markers(marker, fav),
      iconSize: [25 * 1.2, 40 * 1.2],
      iconAnchor: [(25 * 1.2) / 2, 40 * 1.2]
    });
  }

  const sites = props.tmpAttraction ? [...props.sites, props.tmpAttraction] : props.sites;

  return (
    <Box>
      <MapContainer center={props.currentLocation()} zoom={props.zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {sites.map((site) => (
          <Marker
            icon={
              site.type
                ? site.isFav
                  ? createMarker(site.type.code, true)
                  : createMarker(site.type.code, false)
                : createMarker('temporary', false)
            }
            position={[site.coord[0], site.coord[1]]}
            key={site.key}
            eventHandlers={{
              click: () => {
                props.setPromise(SitesSource.getDetails(site.id, props.setPromiseImage));
              }
            }}>
            <Popup>
              {promiseNoData(props.promise, props.data, props.error) || (
                <Box>
                  <Typography color="primary" fontSize={18} fontWeight={500}>
                    {site.name ? site.name : "This site's name is not available"}
                  </Typography>
                  <Typography fontSize={14}>
                    {props.data.wikipedia_extracts
                      ? props.data.wikipedia_extracts.text
                      : "Sorry, we don't have information on this site."}
                  </Typography>
                  {promiseNoData(props.promiseImage, props.dataImage, props.errorImage, true) || (
                     <img className="popup-image" src={props.data.preview.source} />
                   )}
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
