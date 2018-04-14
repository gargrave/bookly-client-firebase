// @flow
import type { Book } from '../../../globals/flowtypes';

import { parseFbError } from '../../../globals/errors';
import { deleteBookFromAPI } from '../../../wrappers/api';

import { BOOKS } from '../../actionTypes';

import apiError from '../app/apiError';

import bookRequestEnd from './bookRequestEnd';
import bookRequestStart from './bookRequestStart';

const _deleteBook = (book: Book) => ({
  type: BOOKS.DELETE_SUCCESS,
  payload: { book },
});

const deleteBook = (book: Book) =>
  async (dispatch: Function) => {
    dispatch(bookRequestStart());

    try {
      await deleteBookFromAPI(book);
      dispatch(_deleteBook(book));
      return book;
    } catch (err) {
      dispatch(apiError(err));
      throw parseFbError(err);
    } finally {
      dispatch(bookRequestEnd());
    }
  };

export default deleteBook;
