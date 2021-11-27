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
  }
  setDateBegin(dateBegin) {
    this.dateBegin = dateBegin;
  }
  setDateEnd(dateEnd) {
    this.dateEnd = dateEnd;
  }
  setCoord(coord) {
    this.coord = coord;
  }
  setFinished(finished) {
    this.finished = finished;
  }
  setAttractions(attractions) {
    this.attractions = [...attractions];
  }
  setAttrCurrent(attrCurrent) {
    this.attrCurrent = attrCurrent;
  }

  addAttraction(attraction) {
    this.attractions = [...this.attractions, attraction];
  }

  listAttractions() {
    return this.attractions;
  }
}
