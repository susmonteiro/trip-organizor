export default class UserModel {
  constructor(tripCurrent = null, trips = []) {
    this.observers = [];
    this.setTripCurrent(tripCurrent);
    this.setTrips(trips);
  }

  setTripCurrAttr(id) {
    console.log(id);
    this.trips[0].setAttrCurrent(id);
    this.notifyObservers();
  }

  setTripCurrent(id) {
    this.tripCurrent = id;
    this.notifyObservers();
  }

  setTripCurrentFromDB(id) {
    this.tripCurrent = id;
  }

  setTrips(trips) {
    //this.trips = [...trips];
    this.trips = trips;
    this.notifyObservers();
  }

  deleteAllTrips() {
    this.trips = [];
  }

  addTrip(tripNew) {
    if (!this.trips.find((trip) => trip.title === tripNew.title)) {
      this.trips = [...this.trips, tripNew];
      this.notifyObservers();
    }
    this.notifyObservers();
  }

  addTripFromDB(trip) {
    if (!this.trips.includes(trip)) {
      this.trips = [...this.trips, trip];
    }
  }

  changeIsAttractionCompleted(id) {
    this.trips[0].changeIsFinish(id); // TODO 0 is for testing, should be current trip
    this.notifyObservers();
  }

  changeIsAttractionLiked(id) {
    this.trips[0].changeIsFav(id); // TODO 0 is for testing, should be current trip
    this.notifyObservers();
  }

  addAttractionToTrip(attraction) {
    this.trips[0].addAttraction(attraction); // TODO 0 is for testing, should be current trip
    this.notifyObservers();
  }

  listTripAttractions() {
    return this.trips[0].listAttractions(); // TODO 0 is for testing, should be current trip
  }

  addObserver(name) {
    this.observers = [...this.observers, name];
  }

  removeObserver(name) {
    this.observers = this.observers.filter((a) => a !== name);
  }
  removeTrip(tripID) {
    if (this.trips.find((trip) => trip === tripID)) {
      this.trips = [...this.trips].filter((x) => x !== tripID);
      this.notifyObservers();
    }
  }

  tripTitleExists(tripTitle) {
    return this.trips.find((t) => t.title === tripTitle) ? true : tripTitle === '' ? true : false;
  }

  checkNullEmpty(tripAttr) {
    return tripAttr === '' ? true : tripAttr === null ? true : false;
  }
  tripAttrEmpty(tripAttr) {
    return tripAttr === '' ? 'empty' : tripAttr === null ? 'null' : false;
  }

  notifyObservers() {
    this.observers.forEach(
      (
        cb // TODO adding a timeout made reading from firebase an endless loop
      ) =>
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
