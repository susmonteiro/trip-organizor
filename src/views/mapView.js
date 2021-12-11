import '../style.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import promiseNoData from './promiseNoData.js';
import SitesSource from '../sitesSource.js';
import { Icon } from 'leaflet';
import marker from '../markers/marker.svg';
import favMarker from '../markers/favMarker.svg';

import Box from '@mui/material/Box';

function MapView(props) {
  const markerIcon = new Icon({
    iconUrl: marker,
    iconSize: [25 * 1.2, 40 * 1.2],
    iconAnchor: [(25 * 1.2) / 2, 40 * 1.2]
  });

  const favMarkerIcon = new Icon({
    iconUrl: favMarker,
    iconSize: [25 * 1.2, 40 * 1.2],
    iconAnchor: [(25 * 1.2) / 2, 40 * 1.2]
  });

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
            icon={site.attrIsFav ? favMarkerIcon : markerIcon}
            position={[site.attrCoord[0], site.attrCoord[1]]}
            key={site.attrKey}
            eventHandlers={{
              click: () => {
                props.setPromise(SitesSource.getDetails(site.attrID));
                // props.changeCurrAttr(site.attrID);
              }
            }}>
            <Popup>
              {promiseNoData(props.promise, props.data, props.error) || (
                <div>
                  <h2 className="popup-title">
                    {site.attrName ? site.attrName : "This site's name is not available"}
                  </h2>
                  <p className="popup-description">
                    {props.data.wikipedia_extracts
                      ? props.data.wikipedia_extracts.text
                      : "Sorry, we don't have additional information on this site."}
                  </p>
                  {props.data.preview ? (
                    <img className="popup-image" src={props.data.preview.source} />
                  ) : null}
                </div>
              )}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
}

export default MapView;
