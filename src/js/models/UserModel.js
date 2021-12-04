export default class UserModel {
  constructor(tripCurrent = null, trips = []) {
    this.observers = [];
    this.setTripCurrent(tripCurrent);
    this.setTrips(trips);
  }

  addObserver(name) {
    this.observers = [...this.observers, name];
  }

  removeObserver(name) {
    this.observers = this.observers.filter((a) => a !== name);
  }

  notifyObservers() {
    this.observers.forEach((cb) =>
      setTimeout(() => {
        try {
          cb(); //we call all the functions that the observers want to execut whenever there is a change in the data
        } catch (e) {
          console.error(e);
        }
      }, 0)
    );
  }

  setTripCurrent(id) {
    this.tripCurrent = id;
    this.notifyObservers();
  }

  setTrips(trips) {
    this.trips = [...trips];
    this.notifyObservers();
  }

  addTrip(tripNew) {
    if (!this.trips.find((trip) => trip.title === tripNew.title)) {
      this.trips = [...this.trips, tripNew];
      this.notifyObservers();
    }
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
}
