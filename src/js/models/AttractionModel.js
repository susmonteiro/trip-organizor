export default class AttractionModel {
  constructor(
    attrID = null,
    attrName = null,
    attrCoord = [null, null],
    attrIsFav = false,
    attrFinished = false,
    attrOnMap = false,
    attrDate = null,
    attrNotes = null,
    attrType = null
  ) {
    this.observers = [];
    this.setID(attrID);
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

  setName(attrName) {
    this.attrName = attrName;
  }

  setCoord(attrCoord) {
    this.attrCoord = attrCoord;
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
