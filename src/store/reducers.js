import { combineReducers } from 'redux'

import auth from '../modules/auth/actions'
import authors from '../modules/authors/actions'
import books from '../modules/books/actions'
import core from '../modules/core/actions'
import profile from '../modules/profiles/actions'
import snackbar from '../modules/snackbar/actions'

export default combineReducers({
  auth,
  authors,
  books,
  core,
  profile,
  snackbar,
})
