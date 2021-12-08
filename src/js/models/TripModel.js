export default class TripModel {
  constructor(
    title = '',
    dateBegin = new Date(),
    dateEnd = new Date(),
    coord = [null, null],
    finished = false
  ) {
    this.setTitle(title);
    this.setDateBegin(dateBegin);
    this.setDateEnd(dateEnd);
    this.setCoord(coord);
    this.setFinished(finished);
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
}
