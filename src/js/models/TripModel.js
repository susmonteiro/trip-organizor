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

  changeIsFav(id) {
    let index = this.attractions
      .map(function (x) {
        return x.attrID;
      })
      .indexOf(id); //Not always the id is going to be the possition of the element in the array, so we use indexOf
    let attraction = this.attractions[index];
    attraction.setIsFav(!attraction.getIsFav());
  }

  changeIsFinish(id) {
    let index = this.attractions
      .map(function (x) {
        return x.attrID;
      })
      .indexOf(id);
    let attraction = this.attractions[index];
    attraction.setFinished(!attraction.getFinished());
  }

  listAttractions() {
    return [...this.attractions];
  }
}
