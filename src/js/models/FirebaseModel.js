import db from '../firebaseConfig';
import * as React from 'react';
import firebase from 'firebase/compat/app'; //v9
import { auth } from '../firebaseConfig';
import { ref, set, onValue } from "firebase/database";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

export default function persistModel(model) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      model.setUserID(user.uid) // TODO 
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
          console.log(window.location.href)
          if(window.location.pathname == '/') window.location.href = '/trips' 
        }
      });
    } else {
      if(window.location.pathname !== '/') window.location.href = '/';
    }
  });
}
function login(email, password) {
  signInWithEmailAndPassword(auth, email, password).catch((error) => alert(error.message));
}

function register(email, password, verify_password) {
  if (password !== verify_password) {
    alert('The passwords are not equal');
    return;
  }
  createUserWithEmailAndPassword(auth, email, password).catch((error) => {
    alert(error.code, error.message);
  });
}

function signout() {
  signOut(auth).then(window.location.href = '/').catch(console.log);
}

export {
  login,
  register,
  signout
};
