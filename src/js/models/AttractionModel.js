export default class AttractionModel {
  constructor({
    id = null,
    trip = null,
    name = null,
    coord = [13, 13],
    isFav = false,
    finished = false,
    date = null,
    type = null,
    details = null
  }) {
    this.setID(id);
    this.setTrip(trip);
    this.setKey(id, trip);
    this.setName(name);
    this.setCoord(coord);
    this.setIsFav(isFav);
    this.setFinished(finished);
    this.setDate(date);
    this.setType(type);
    this.setDetails(details);
  }

  setID(id) {
    this.id = id;
  }

  setTrip(trip) {
    this.trip = trip;
  }

  setKey(id, trip) {
    this.key = id + trip;
  }

  setName(name) {
    this.name = name;
  }

  setCoord(coord) {
    this.coord = [...coord];
  }

  setIsFav(isFav) {
    this.isFav = isFav;
  }

  setFinished(finished) {
    this.finished = finished;
  }

  setDate(date) {
    this.date = date;
  }

  setType(type) {
    this.type = type;
  }

  setDetails(details) {
    this.details = details;
  }
}
