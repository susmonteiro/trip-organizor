import db from '../firebaseConfig';
import * as React from 'react';
import firebase from 'firebase/compat/app'; //v9
import { auth } from '../firebaseConfig';
import { ref, set, onValue } from 'firebase/database';
import { signOut, onAuthStateChanged } from 'firebase/auth';

let logged = false;
export default function persistModel(model) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      logged = true;
      model.setUserID(user.uid);
      let loadingFromFirebase = false;
      model.addObserver(function () {
        //whenever the data in the model changes, we want to update the data in the firebase DB
        if (loadingFromFirebase) return; //avoid the case when the data is changed because we are reading from the DB
        db.ref(user.uid).set({
          // object literal
          tripCurrent: model.tripCurrent,
          trips: model.trips,
          attrCurrent: model.attrCurrent,
          attractions: model.attractions
        });
      });
      db.ref(user.uid).on('value', function (data) {
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
          if (window.location.pathname == '/') window.location.href = '/trips';
        }
      });
    } else {
      logged = false;
      if (window.location.pathname !== '/') window.location.href = '/';
    }
  });
}

function signout() {
  signOut(auth)
    .then((window.location.href = '/'))
    .catch(console.error);
}

function isLogged() {
  return logged;
}

export { signout, isLogged };
