import firebase from 'firebase';
import 'firebase/firestore';

import { devConfig } from './firebaseConfig';

let initialized = false;
let firebaseAuth;
let db;

if (!initialized) {
  firebase.initializeApp(devConfig);
  firebaseAuth = firebase.auth();
  db = firebase.firestore();
  initialized = true;
}

export const fbTimestamp = () =>
  firebase.firestore.FieldValue.serverTimestamp();

export {
  db,
  firebaseAuth,
};
