import { combineReducers } from 'redux';

import app from './app';
import auth from './auth';
import authors from './authors';
import books from './books';

export default combineReducers({
  app,
  auth,
  authors,
  books,
});
