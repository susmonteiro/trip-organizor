import '../style.css';
import { MapContainer, TileLayer, Marker, Popup, FeatureGroup } from 'react-leaflet';
import promiseNoData from './promiseNoData.js';
import SitesSource from '../sitesSource.js';

function MapView(props) {
  console.log(props);
  return (
    <div>
      <MapContainer center={props.currentLocation} zoom={props.zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <FeatureGroup>
          {props.sites.map((site) => (
            <Marker
              position={site.attrCoord}
              key={site.attrID}
              eventHandlers={{
                click: () => {
                  props.setPromise(SitesSource.getDetails(site.attrID));
                }
              }}>
              <Popup>
                {promiseNoData(props.promise, props.data, props.error) || (
                  <div>
                    <h2>{site.attrName ? site.attrName : "This site's name is not available"}</h2>
                    <p>
                      {props.data.wikipedia_extracts
                        ? props.data.wikipedia_extracts.text
                        : "Sorry, we don't have additional information on this site."}
                    </p>
                    {props.data.preview ? (
                      <img src={props.data.preview.source} height="150px" width="150px" />
                    ) : null}
                  </div>
                )}
              </Popup>
            </Marker>
          ))}
        </FeatureGroup>
      </MapContainer>
    </div>
  );
}

export default MapView;
