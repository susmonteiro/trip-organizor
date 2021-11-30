import TripListPresenter from './presenters/tripListPresenter';

function App(props) {
  return (
    <div>
      <TripListPresenter model={props.model} />
    </div>
  );
}

export default App;
