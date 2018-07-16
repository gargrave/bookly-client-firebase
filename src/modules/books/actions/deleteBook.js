// @flow
import type { Book } from '../../../modules/books/flowtypes';

import { deleteBookFromAPI } from '../../../wrappers/api';
import { parseAPIError } from '../../../wrappers/errors';

import { setApiError } from '../../core/actions/setApiError';

import { sortByAuthorLastName } from './helpers';
import types from './types';

import { requestEnd } from './requestEnd';
import { requestStart } from './requestStart';


const _deleteBook = (book: Book) => ({
  type: types.DELETE,
  payload: { book },
});

const deleteBook = (book: Book) =>
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

export default deleteBook;
