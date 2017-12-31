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

function docToObject(doc) {
  return {
    id: doc.id,
    ...doc.data(),
  };
}

function timestamp() {
  return firebase.firestore.FieldValue.serverTimestamp();
}

export {
  db,
  docToObject,
  timestamp,
};
