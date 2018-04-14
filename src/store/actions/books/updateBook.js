// @flow
import type { Author, Book } from '../../../globals/flowtypes';

import { updateBookOnAPI } from '../../../wrappers/api';
import { parseAPIError } from '../../../wrappers/errors';

import { BOOKS } from '../../actionTypes';

import apiError from '../app/apiError';

import { bookHasValidAuthor } from './helpers';
import bookRequestEnd from './bookRequestEnd';
import bookRequestStart from './bookRequestStart';

const _updateBook = (book: Book) => ({
  type: BOOKS.UPDATE_SUCCESS,
  payload: { book },
});

const updateBook = (book: Book) =>
  async (dispatch: Function, getState: Function) => {
    dispatch(bookRequestStart());

    try {
      // validate author before proceeding
      const authors: Author[] = getState().authors.data;
      if (!bookHasValidAuthor(book, authors)) {
        throw Error('Invalid Author data.');
      }

      const updatedRecord: Book = await updateBookOnAPI(book, authors);
      dispatch(_updateBook(updatedRecord));
      return updatedRecord;
    } catch (err) {
      dispatch(apiError(err));
      throw parseAPIError(err);
    } finally {
      dispatch(bookRequestEnd());
    }
  };

export default updateBook;
