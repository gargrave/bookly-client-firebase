// @flow
import type { Author, FbCollection } from '../../../globals/flowtypes';

import {
  deleteBooksFromAPI,
  fetchBooksByAuthorFromAPI,
} from '../../../wrappers/api';
import { parseAPIError } from '../../../wrappers/errors';

import { BOOKS } from '../../actionTypes';

import apiError from '../app/apiError';

import bookRequestEnd from './bookRequestEnd';
import bookRequestStart from './bookRequestStart';

const _deleteBooksByAuthor = (author: Author) => ({
  type: BOOKS.DELETE_BY_AUTHOR_SUCCESS,
  payload: { author },
});

const deleteBooksByAuthor = (author: Author) =>
  async (dispatch: Function) => {
    dispatch(bookRequestStart());

    try {
      const booksByAuthor: FbCollection = await fetchBooksByAuthorFromAPI(author);
      if (booksByAuthor.docs.length) {
        await deleteBooksFromAPI(booksByAuthor);
        dispatch(_deleteBooksByAuthor(author));
      }
    } catch (err) {
      dispatch(apiError(err));
      throw parseAPIError(err);
    } finally {
      dispatch(bookRequestEnd());
    }
  };

export default deleteBooksByAuthor;
