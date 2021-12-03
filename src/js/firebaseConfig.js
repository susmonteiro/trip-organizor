import firebase from 'firebase/compat/app'; //v9
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: 'AIzaSyD6mL4SeWfGObzYnAGT7RXTkl-Z2umBYV8',
  authDomain: 'dh2642-g53.firebaseapp.com',
  projectId: 'dh2642-g53',
  storageBucket: 'dh2642-g53.appspot.com',
  messagingSenderId: '420721287619',
  appId: '1:420721287619:web:83dd5777543e446972dd76'
};

firebase.initializeApp(firebaseConfig);

const nameREF = firebase.database().ref('dh2642-rtdb');
export default nameREF;
