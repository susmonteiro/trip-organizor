export default class UserModel {
  constructor(tripCurrent = null, trips = [], attrCurrent = null, attractions = []) {
    this.observers = [];
    this.setTripCurrent(tripCurrent);
    this.setTrips(trips);
    this.setAttrCurrent(attrCurrent);
    this.setAttractions(attractions);
  }

  setAttrCurrent(id) {
    this.attrCurrent = id;
    this.notifyObservers();
  }

  setAttractions(attractions) {
    this.attractions = attractions;
    this.notifyObservers();
  }

  setTripCurrent(id) {
    this.tripCurrent = id;
    this.notifyObservers();
  }

  setTrips(trips) {
    this.trips = trips;
    this.notifyObservers();
  }

  // FOR AUTH
  setUserID(id) {
    this.currentUser = id;
    this.notifyObservers();
  }

  addAttractionToTrip(attr) {
    this.attractions = [...this.attractions, attr];
    this.notifyObservers();
  }

  addTrip(tripNew) {
    if (!this.trips.find((trip) => trip.title === tripNew.title)) {
      this.trips = [...this.trips, tripNew];
      this.notifyObservers();
    }
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
          cb();
        } catch (error) {
          console.error(error);
        }
      }, 0)
    );
  }

  removeTrip(tripID) {
    if (this.trips.find((trip) => trip === tripID)) {
      this.trips = [...this.trips].filter((x) => x !== tripID);
      this.notifyObservers();
    }
  }

  // AUXILIARY TRIP FUNCTIONS
  tripTitleExists(tripTitle) {
    return this.trips.find((t) => t.title === tripTitle) ? true : tripTitle === '' ? true : false;
  }

  checkNullEmpty(tripAttr) {
    return tripAttr === '' ? true : tripAttr === null ? true : false;
  }

  tripAttrEmpty(tripAttr) {
    return tripAttr === null
      ? 'null'
      : tripAttr === '' || tripAttr.trim().length === 0
      ? 'empty'
      : false;
  }

  changeFinished(trip) {
    trip.finished = !trip.finished;
    this.notifyObservers();
  }

  changeIsAttractionCompleted(key) {
    this.attractions.map((attr) => {
      if (attr.key === key) {
        attr.finished = !attr.finished;
        this.notifyObservers();
      }
    });
  }

  changeIsAttractionLiked(key) {
    this.attractions.map((attr) => {
      if (attr.key === key) {
        attr.isFav = !attr.isFav;
        this.notifyObservers();
      }
    });
  }

  deleteAttraction(key) {
    this.attractions = [...this.attractions].filter((attr) => {
      return attr.key !== key;
    });
    this.notifyObservers();
  }
}
