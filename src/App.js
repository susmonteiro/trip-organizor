import MapView from './Views/MapView.js';
function App(props) {
  //console.log(props)
  return <MapView currentLocation={props.model.coord}
                  zoom={12}
                  sites={props.model.attractions}/>;
}

export default App;
