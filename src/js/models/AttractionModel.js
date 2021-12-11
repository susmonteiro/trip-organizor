export default class AttractionModel {
  constructor({
    attrID = null,
    attrTrip = null,
    attrName = null,
    attrCoord = [13, 13],
    attrIsFav = false,
    attrFinished = false,
    attrOnMap = false,
    attrDate = null,
    attrNotes = null,
    attrType = null
  }) {
    this.setID(attrID);
    this.setTrip(attrTrip);
    this.setKey(attrID, attrTrip);
    this.setName(attrName);
    this.setCoord(attrCoord);
    this.setIsFav(attrIsFav);
    this.setFinished(attrFinished);
    this.setOnMap(attrOnMap);
    this.setDate(attrDate);
    this.setNotes(attrNotes);
    this.setType(attrType);
  }

  setID(id) {
    this.attrID = id;
  }

  setTrip(trip) {
    this.attrTrip = trip;
  }

  setKey(id, trip) {
    this.attrKey = id + trip;
  }

  setName(attrName) {
    this.attrName = attrName;
  }

  setCoord(attrCoord) {
    this.attrCoord = [...attrCoord];
  }

  setIsFav(attrIsFav) {
    this.attrIsFav = attrIsFav;
  }

  setFinished(attrFinished) {
    this.attrFinished = attrFinished;
  }

  setOnMap(attrOnMap) {
    this.attrOnMap = attrOnMap;
  }

  setDate(attrDate) {
    this.attrDate = attrDate;
  }

  setNotes(attrNotes) {
    this.attrNotes = attrNotes;
  }

  setType(attrType) {
    this.attrType = attrType;
  }
}
