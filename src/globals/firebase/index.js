import firebase from 'firebase';
import 'firebase/firestore';

import firebaseConfig from '../../secrets/firebaseConfig.js';

let initialized = false;
let auth;
let db;

if (!initialized) {
  firebase.initializeApp(firebaseConfig);
  auth = firebase.auth();
  db = firebase.firestore();
  initialized = true;
}

function timestamp() {
  return firebase.firestore.FieldValue.serverTimestamp();
}

export {
  auth,
  db,
  timestamp,
};
