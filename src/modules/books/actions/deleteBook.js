// @flow
import type { Book } from '../../../modules/books/flowtypes';
import type { ReduxAction } from '../../common/flowtypes';

import { deleteBookFromAPI } from '../../../wrappers/api';
import { parseAPIError } from '../../../wrappers/errors';

import { setApiError } from '../../core/actions/setApiError';

import { sortByAuthorLastName } from './helpers';

import { requestEnd } from './requestEnd';
import { requestStart } from './requestStart';

import types from './types';

const _deleteBook = (book: Book) => ({
  type: types.DELETE,
  payload: { book },
});

export const deleteBook = (book: Book) =>
  async (dispatch: Function) => {
    dispatch(requestStart());

    try {
      await deleteBookFromAPI(book);
      dispatch(_deleteBook(book));
      return book;
    } catch (err) {
      dispatch(setApiError(err));
      throw parseAPIError(err);
    } finally {
      dispatch(requestEnd());
    }
  };

export const deleteBookReducer = (state: any, action: ReduxAction) => ({
  ...state,
  data: sortByAuthorLastName(
    state.data.filter((book) => book.id !== action.payload.book.id),
  ),
});
