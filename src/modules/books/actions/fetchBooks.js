// @flow
import type { Author } from '../../../modules/authors/flowtypes';
import type { Book } from '../../../modules/books/flowtypes';

import { fetchBooksFromAPI } from '../../../wrappers/api';
import { parseAPIError } from '../../../wrappers/errors';

import { BOOKS } from '../../actionTypes';

import apiError from '../app/apiError';
import fetchAuthors from '../authors/fetchAuthors';

import bookRequestEnd from './bookRequestEnd';
import bookRequestStart from './bookRequestStart';

const _fetchBooks = (books: Book[]) => ({
  type: BOOKS.FETCH_SUCCESS,
  payload: { books },
});

const fetchBooks = () =>
  async (dispatch: Function, getState: Function) => {
    // ensure that Author data has been loaded
    let authors: Author[] = getState().authors.data;
    if (!authors.length) {
      authors = await dispatch(fetchAuthors());
    }

    const books = getState().books.data;
    if (books.length) {
      return books;
    } else {
      dispatch(bookRequestStart());

      try {
        const records: Book[] = await fetchBooksFromAPI(authors);
        dispatch(_fetchBooks(records));
        return records;
      } catch (err) {
        dispatch(apiError(err));
        throw parseAPIError(err);
      } finally {
        dispatch(bookRequestEnd());
      }
    }
  };

export default fetchBooks;
