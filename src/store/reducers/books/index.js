import { AUTH, BOOKS } from '../../actionTypes';

import { actionContainer } from '../helpers';

import defaultState from './defaultState';

import bookRequestEnd from './bookRequestEnd';
import bookRequestStart from './bookRequestStart';
import clearBooks from './clearBooks';
import createBook from './createBook';
import deleteBook from './deleteBook';
import deleteBooksByAuthor from './deleteBooksByAuthor';
import fetchBooks from './fetchBooks';
import updateBook from './updateBook';

const actions = {
  [AUTH.LOGOUT]: clearBooks,
  [BOOKS.CREATE_SUCCESS]: createBook,
  [BOOKS.DELETE_SUCCESS]: deleteBook,
  [BOOKS.DELETE_BY_AUTHOR_SUCCESS]: deleteBooksByAuthor,
  [BOOKS.FETCH_SUCCESS]: fetchBooks,
  [BOOKS.REQUEST_END]: bookRequestEnd,
  [BOOKS.REQUEST_START]: bookRequestStart,
  [BOOKS.UPDATE_SUCCESS]: updateBook,
};

export default actionContainer(defaultState, actions);
