export default class AttractionModel {
  constructor({
    id = null,
    trip = null,
    name = null,
    coord = [13, 13],
    isFav = false,
    finished = false,
    onMap = false,
    date = null,
    type = null
  }) {
    this.setID(id);
    this.setTrip(trip);
    this.setKey(id, trip);
    this.setName(name);
    this.setCoord(coord);
    this.setIsFav(isFav);
    this.setFinished(finished);
    this.setOnMap(onMap);
    this.setDate(date);
    this.setType(type);
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

  setOnMap(onMap) {
    this.onMap = onMap;
  }

  setDate(date) {
    this.date = date;
  }

  setType(type) {
    this.type = type;
  }
}
