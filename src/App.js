import TripListPresenter from './presenters/tripListPresenter';
import AddTripPresenter from './presenters/addTripPresenter';

function App(props) {
  return (
    <div>
      <AddTripPresenter model={props.model} />
      <TripListPresenter model={props.model} />
    </div>
  );
}

export default App;
