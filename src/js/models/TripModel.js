export default class TripModel {
  constructor(
    title = null,
    dateBegin = null,
    dateEnd = null,
    coord = [null, null],
    finished = false,
    attractions = [],
    attrCurrent = null
  ) {
    this.observers = [];
    this.setTitle(title);
    this.setDateBegin(dateBegin);
    this.setDateEnd(dateEnd);
    this.setCoord(coord);
    this.setFinished(finished);
    this.setAttractions(attractions);
    this.setAttrCurrent(attrCurrent);
  }

  setTitle(title) {
    this.title = title;
    this.notifyObservers();
  }
  setDateBegin(dateBegin) {
    this.dateBegin = dateBegin;
    this.notifyObservers();
  }
  setDateEnd(dateEnd) {
    this.dateEnd = dateEnd;
    this.notifyObservers();
  }
  setCoord(coord) {
    this.coord = coord;
    this.notifyObservers();
  }
  setFinished(finished) {
    this.finished = finished;
    this.notifyObservers();
  }
  setAttractions(attractions) {
    this.attractions = [...attractions];
    this.notifyObservers();
  }
  setAttrCurrent(attrCurrent) {
    this.attrCurrent = attrCurrent;
    this.notifyObservers();
  }

  addAttraction(attraction) {
    this.attractions = [...this.attractions, attraction];
    this.notifyObservers();
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

  changeIsFav(id) {
    let index = this.attractions
      .map(function (x) {
        return x.attrID;
      })
      .indexOf(id); //Not always the id is going to be the possition of the element in the array, so we use indexOf
    let attraction = this.attractions[index];
    attraction.setIsFav(!attraction.getIsFav());
    this.notifyObservers();
  }

  changeIsFinish(id) {
    let index = this.attractions
      .map(function (x) {
        return x.attrID;
      })
      .indexOf(id);
    let attraction = this.attractions[index];
    attraction.setFinished(!attraction.getFinished());
    this.notifyObservers();
  }
  listAttractions() {
    return this.attractions;
  }
}
