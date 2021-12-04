export default class UserModel {
  constructor(tripCurrent = null, trips = []) {
    this.observers = [];
    this.setTripCurrent(tripCurrent);
    this.setTrips(trips);
  }

  setTripCurrent(id) {
    this.tripCurrent = id;
    this.notifyObservers();
  }
  setTripCurrentFromDB(id) {
    this.tripCurrent = id;
  }

  setTrips(trips) {
    this.trips = [...trips];
    this.notifyObservers();
  }

  deleteAllTrips() {
    this.trips = [];
  }

  addTrip(trip) {
    if (!this.trips.includes(trip)) {
      this.trips = [...this.trips, trip];
    }
    this.notifyObservers();
  }

  addTripFromDB(trip) {
    if (!this.trips.includes(trip)) {
      this.trips = [...this.trips, trip];
    }
  }

  changeIsAttractionCompleted(id){
    this.trips[0].changeIsFinish(id); // TODO 0 is for testing, should be current trip
    this.notifyObservers();
  }

  changeIsAttractionLiked(id){
    this.trips[0].changeIsFav(id); // TODO 0 is for testing, should be current trip
    this.notifyObservers();
  }

  addObserver(name) {
    this.observers = [...this.observers, name];
  }

  removeObserver(name) {
    this.observers = this.observers.filter((a) => a !== name);
  }

  notifyObservers() {
    this.observers.forEach((cb) => // TODO adding a timeout made reading from firebase an endless loop
     /* setTimeout(() => {
        try {
          cb(); //we call all the functions that the observers want to execut whenever there is a change in the data
        } catch (e) {
          console.error(e);
        }
      }, 0)*/ cb()
    );
  }

  /* removeFromTrip(tripID) {
    TODO
  } */
}
