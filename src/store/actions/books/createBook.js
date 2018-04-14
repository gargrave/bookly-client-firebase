// @flow
import type { Author, Book } from '../../../globals/flowtypes';

import { parseFbError } from '../../../globals/errors';
import { createBookOnAPI } from '../../../wrappers/api';

import { BOOKS } from '../../actionTypes';

import apiError from '../app/apiError';

import { bookHasValidAuthor } from './helpers';
import bookRequestEnd from './bookRequestEnd';
import bookRequestStart from './bookRequestStart';

const _createBook = (book: Book) => ({
  type: BOOKS.CREATE_SUCCESS,
  payload: { book },
});

const createBook = (book: Book) =>
  async (dispatch: Function, getState: Function) => {
    dispatch(bookRequestStart());

    try {
      // validate author before proceeding
      const authors: Author[] = getState().authors.data;
      if (!bookHasValidAuthor(book, authors)) {
        throw Error('Invalid Author data.');
      }

      const newRecord: Book = await createBookOnAPI(book, authors);
      dispatch(_createBook(newRecord));
      return newRecord;
    } catch (err) {
      dispatch(apiError(err));
      throw parseFbError(err);
    } finally {
      dispatch(bookRequestEnd());
    }
  };

export default createBook;
