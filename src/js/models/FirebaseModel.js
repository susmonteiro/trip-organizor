import nameREF from '../firebaseConfig';
import TripModel from './TripModel.js';
import UserModel from './UserModel';
import AttractionModel from './AttractionModel';

export default function persistModel(model) {
  let loadingFromFirebase = false;
  model.addObserver(function () {
    //whenever the data in the model changes, we want to update the data in the firebase DB
    if (loadingFromFirebase) return; //avoid the case when the data is changed because we are reading from the DB
    console.log("writing")
    nameREF.set({
      // object literal
      tripCurrent: model.tripCurrent,
      trips: model.trips
    });
  });
  nameREF.on('value', function (data) {
    loadingFromFirebase = true;
    console.log("loop")
    try {
      if (data.val()) {
        model.deleteAllTrips();
        model.setTripCurrent(data.val().tripCurrent || null);
        data.val().trips.map((trip) => {
          const MyModel = new TripModel();
          trip.attractions.map((site) => {
            const attr = new AttractionModel({
              attrID: site.attrID || null,
              attrName: site.attrName || null,
              attrCoord: site.attrCoord || [null, null],
              attrIsFav: site.attrIsFav || false,
              attrFinished: site.attrFinished || false,
              attrOnMap: site.attrOnMap || false,
              attrDate: site.attrDate || null,
              attrNotes: site.attrNotes || null,
              attrType: site.attrType || null
            });
            MyModel.addAttraction(attr); 
          });
          model.addTrip(MyModel);
        });

        //model.setTrips(data.val().trips || []);
      }
    } catch (e) {
      console.log(e);
    } finally {
      loadingFromFirebase = false;
    }
  });
}
