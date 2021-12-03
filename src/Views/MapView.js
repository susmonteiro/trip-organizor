import "../style.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import promiseNoData from './promiseNoData.js';
import SitesSource from '../sitesSource.js'
//import SiteDetailsView from './SiteDetailsView.js';

function MapView(props) {
  console.log(props);
  return (
    <MapContainer center={props.currentLocation} zoom={props.zoom}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {props.sites.map((site) => (
        <Marker position={site.attrCoord}
                key={site.attrID}
                eventHandlers={{
                  click: () => {
                    props.setPromise(SitesSource.getDetails(site.attrID))
                  },
                }}>
          <Popup>
            {promiseNoData(props.promise, props.data, props.error) || <div>
              <h2>{site.attrName}</h2>
              <p>{props.data.wikipedia_extracts? props.data.wikipedia_extracts.text : "Sorry we don't have additional information on this site."}</p>
              <img
                src={props.data.preview.source}
                height="150px"
                width="150px"
              />
            </div>}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapView;
