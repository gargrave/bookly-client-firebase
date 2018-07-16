// @flow
import type { Author } from '../../../modules/authors/flowtypes';
import type { Book } from '../../../modules/books/flowtypes';

import { updateBookOnAPI } from '../../../wrappers/api';
import { parsesetApiError } from '../../../wrappers/errors';

import { setApiError } from '../../core/actions/setApiError';

import { bookHasValidAuthor } from './helpers';
import { requestEnd } from './requestEnd';
import { requestStart } from './requestStart';

import types from './types';

const _updateBook = (book: Book) => ({
  type: types.UPDATE,
  payload: { book },
});

const updateBook = (book: Book) =>
  async (dispatch: Function, getState: Function) => {
    dispatch(requestStart());

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
      dispatch(setApiError(err));
      throw parsesetApiError(err);
    } finally {
      dispatch(requestEnd());
    }
  };

export default updateBook;
