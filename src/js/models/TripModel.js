export default class TripModel {
  constructor(
    title = '',
    country = '',
    countryCode = '',
    city = '',
    dateBegin = new Date(),
    dateEnd = new Date(),
    coord = [null, null],
    finished = false
  ) {
    this.setTitle(title);
    this.setCountry(country);
    this.setCountryCode(countryCode);
    this.setCity(city);
    this.setDateBegin(dateBegin);
    this.setDateEnd(dateEnd);
    this.setCoord(coord);
    this.setFinished(finished);
  }

  setTitle(title) {
    this.title = title;
  }
  setCountry(country) {
    this.country = country;
  }
  setCountryCode(countryCode) {
    this.countryCode = countryCode;
  }
  setCity(city) {
    this.city = city;
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
