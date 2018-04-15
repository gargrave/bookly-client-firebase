import { combineReducers } from 'redux';

import app from './app';
import auth from './auth';
import authors from './authors';
import books from './books';
import profile from './profile';
import snackbar from './snackbar';

export default combineReducers({
  app,
  auth,
  authors,
  books,
  profile,
  snackbar,
});
