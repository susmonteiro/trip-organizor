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
        //
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
          if(window.location.pathname == '/') window.location.href = '/trips' //TODO 
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
  /* SaveTripsFirebase, SaveAttrFirebase, ReadTripsFromFirebase, ReadAttrFromFirebase,*/ login,
  register,
  signout
};

/*

----------------------------------------




function SaveTripsFirebase(new_trips) {
  var unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      try {
        console.log(user.uid);
        db.ref(`${user.uid}`).set({
          trips: new_trips
        });
      } catch (error) {
        alert(error);
      }
    }
  });

  unsubscribe();
}

function SaveAttrFirebase(new_attractions) {
  var unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      try {
        db.ref(`${user.uid}`).set({
          attractions: new_attractions
        });
      } catch (error) {
        alert(error);
      }
    }
  });

  unsubscribe();
}

function ReadTripsFromFirebase({ model }) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      try {
        db.ref(`${user.uid}`).on('value', (data) => {
          if (data.val()) {
            model.setTrips(data.val().trips || []);
          }
        });
      } catch (error) {
        alert(error);
      }
    }
  });
}

function ReadAttrFromFirebase({ model }) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      try {
        db.ref(`${user.uid}`).on('value', (data) => {
          if (data.val()) {
            model.setAttractions(data.val().attractions || []);
          }
        });
      } catch (error) {
        alert(error);
      }
    }
  });
}


*/
