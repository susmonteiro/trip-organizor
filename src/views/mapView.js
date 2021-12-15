import '../style.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import promiseNoData from './../promiseNoData.js';
import SitesSource from '../sitesSource.js';
import { Icon } from 'leaflet';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import markers from './../markers/markers.js';

function MapView(props) {
  function createMarker(marker, fav) {
    return new Icon({
      iconUrl: markers(marker, fav),
      iconSize: [25 * 1.2, 40 * 1.2],
      iconAnchor: [(25 * 1.2) / 2, 40 * 1.2]
    });
  }

  console.log(props);
  return (
    <Box>
      <MapContainer center={props.currentLocation()} zoom={props.zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {props.sites.map((site) => (
          <Marker
            icon={
              site.isFav ? createMarker(site.type.code, true) : createMarker(site.type.code, false)
            }
            position={[site.coord[0], site.coord[1]]}
            key={site.key}
            eventHandlers={{
              click: () => {
                props.setPromise(SitesSource.getDetails(site.id));
                // props.changeCurrAttr(site.id);
              }
            }}>
            {/* TEMPORARY MARKER */}
            {props.tmpAttraction && (
              <Marker
                icon={createMarker('temporary', false)}
                position={[props.tmpAttraction.coord[0], props.tmpAttraction.coord[1]]}
                key={props.tmpAttraction.key}
                eventHandlers={{
                  click: () => {
                    props.setPromise(SitesSource.getDetails(props.tmpAttraction.id));
                  }
                }}></Marker>
            )}
            {/* {(props.openPopup === site.id && props.setPopup()) ||
              props.setPromise(SitesSource.getDetails(site.id))} */}
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
                  {props.data.preview ? (
                    <img className="popup-image" src={props.data.preview.source} />
                  ) : null}
                  <br />
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
