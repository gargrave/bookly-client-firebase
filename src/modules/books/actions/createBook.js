// @flow
import type { Author } from '../../../modules/authors/flowtypes';
import type { Book } from '../../../modules/books/flowtypes';
import type { ReduxAction } from '../../common/flowtypes';

import { createBookOnAPI } from '../../../wrappers/api';
import { parseAPIError } from '../../../wrappers/errors';

import { setApiError } from '../../core/actions/setApiError';

import { sortByAuthorLastName } from './helpers';
import types from './types';

import { bookHasValidAuthor } from './helpers';
import { requestEnd } from './requestEnd';
import { requestStart } from './requestStart';

const _createBook = (book: Book) => ({
  type: types.CREATE,
  payload: { book },
});

export const createBook = (book: Book) =>
  async (dispatch: Function, getState: Function) => {
    dispatch(requestStart());

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
      dispatch(setApiError(err));
      throw parseAPIError(err);
    } finally {
      dispatch(requestEnd());
    }
  };

export const createBookReducer =
  (state: any, action: ReduxAction) => ({
    ...state,
    data: sortByAuthorLastName([
      ...state.data,
      action.payload.book,
    ]),
  });

export default createBook;
