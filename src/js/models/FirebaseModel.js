import nameREF from '../firebaseConfig';
import TripModel from './TripModel.js';
import AttractionModel from './AttractionModel';

export default function persistModel(model) {
  let loadingFromFirebase = false;
  model.addObserver(function () {
    //whenever the data in the model changes, we want to update the data in the firebase DB
    if (loadingFromFirebase) return; //avoid the case when the data is changed because we are reading from the DB
    nameREF.set({
      // object literal
      tripCurrent: model.tripCurrent,
      trips: model.trips,
      attrCurrent: model.attrCurrent,
      attractions: model.attractions
    });
  });
  nameREF.on('value', function (data) {
    loadingFromFirebase = true;
    try {
      if (data.val()) {
        model.setTrips(data.val().trips || []);
        model.setTripCurrent(data.val().tripCurrent || null);
        model.setAttractions(data.val().attractions || []); //PAULO
        model.setAttrCurrent(data.val().attrCurrent || null); //PAULO
      }
    } catch (e) {
      console.error(e);
    } finally {
      loadingFromFirebase = false;
    }
  });
}
