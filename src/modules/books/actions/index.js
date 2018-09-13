import { reducerContainer } from '../../../store/helpers'

import { clearBooksReducer } from './clearBooks'
import { createBook, createBookReducer } from './createBook'
import { deleteBook, deleteBookReducer } from './deleteBook'
import {
  deleteBooksByAuthor,
  deleteBooksByAuthorReducer,
} from './deleteBooksByAuthor'
import { fetchBooks, fetchBooksReducer } from './fetchBooks'
import { refreshBooksByAuthor } from './refreshBooksByAuthor'
import { requestEndReducer } from './requestEnd'
import { requestStartReducer } from './requestStart'
import { updateBook, updateBookReducer } from './updateBook'

import authTypes from '../../auth/actions/types'
import types from './types'

const defaultState = () => ({
  booksRequestPending: false,
  data: [],
})

export default reducerContainer(defaultState(), {
  [authTypes.LOGOUT]: clearBooksReducer,
  [types.CREATE]: createBookReducer,
  [types.DELETE]: deleteBookReducer,
  [types.DELETE_BY_AUTHOR]: deleteBooksByAuthorReducer,
  [types.FETCH]: fetchBooksReducer,
  [types.REQUEST_END]: requestEndReducer,
  [types.REQUEST_START]: requestStartReducer,
  [types.UPDATE]: updateBookReducer,
})

export const actions = {
  createBook,
  deleteBook,
  deleteBooksByAuthor,
  fetchBooks,
  refreshBooksByAuthor,
  updateBook,
}
