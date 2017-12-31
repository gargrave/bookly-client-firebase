import firebase from 'firebase';
import 'firebase/firestore';

import firebaseConfig from '../../secrets/firebaseConfig.js';

let initialized = false;
let db;

if (!initialized) {
  firebase.initializeApp(firebaseConfig);
  db = firebase.firestore();
  initialized = true;
}

function timestamp() {
  return firebase.firestore.FieldValue.serverTimestamp();
}

export {
  db,
  timestamp,
};
