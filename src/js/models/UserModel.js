export default class UserModel {
  constructor(tripCurrent = null, trips = [], attrCurrent = null, attractions = []) {
    this.observers = [];
    this.setTripCurrent(tripCurrent);
    this.setTrips(trips);
    this.setAttrCurrent(attrCurrent); //PAULO
    this.setAttractions(attractions); //PAULO
  }

  setAttrCurrent(id) {
    //PAULO
    this.attrCurrent = id;
    this.notifyObservers();
  }

  setAttractions(attractions) {
    //PAULO
    this.attractions = attractions;
    this.notifyObservers();
  }

  setTripCurrent(id) {
    this.tripCurrent = id;
    this.notifyObservers();
  }

  setTrips(trips) {
    //this.trips = [...trips];
    this.trips = trips;
    this.notifyObservers();
  }

  /**/
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
          ///missing
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

  //AUXILIARY TRIP FUNCTIONS
  tripTitleExists(tripTitle) {
    return this.trips.find((t) => t.title === tripTitle) ? true : tripTitle === '' ? true : false;
  }

  checkNullEmpty(tripAttr) {
    return tripAttr === '' ? true : tripAttr === null ? true : false;
  }
  tripAttrEmpty(tripAttr) {
    return tripAttr === '' ? 'empty' : tripAttr === null ? 'null' : false;
  }

  //BETA
  changeFinished(trip) {
    trip.finished = !trip.finished;
    this.notifyObservers();
  }
  //BETA
  //Changes if the attraction id has been completed
  // TODO ? --> I'm changing the property of the attraction here because when reading from the db, the attractions have no methods anymore
  changeIsAttractionCompleted(key) {
    this.attractions.map((attr) => {
      if (attr.attrKey === key) {
        attr.attrFinished = !attr.attrFinished;
        this.notifyObservers();
      }
    });
  }

  changeIsAttractionLiked(key) {
    this.attractions.map((attr) => {
      if (attr.attrKey === key) {
        attr.attrIsFav = !attr.attrIsFav;
        this.notifyObservers();
      }
    });
  }

  deleteAttraction(key) {
    this.attractions = [...this.attractions].filter((attr) => {
      return attr.attrKey !== key;
    });
    this.notifyObservers();
  }
}
