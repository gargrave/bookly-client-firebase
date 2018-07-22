// @flow
import type { ReduxAction } from '../../common/flowtypes';
import type { Author } from '../flowtypes';

import { deleteAuthorFromAPI } from '../../../wrappers/api';
import { parseAPIError } from '../../../wrappers/errors';

import { deleteBooksByAuthor } from '../../books/actions';
import { setApiError } from '../../core/actions';

import { requestEnd } from './requestEnd';
import { requestStart } from './requestStart';

import { sortByLastName } from './helpers';
import types from './types';

const _deleteAuthor = (author: Author) => ({
  type: types.DELETE,
  payload: { author },
});

export const deleteAuthor = (author: Author) =>
  async (dispatch: Function) => {
    dispatch(requestStart());

    try {
      dispatch(deleteBooksByAuthor(author));
      await deleteAuthorFromAPI(author);
      dispatch(_deleteAuthor(author));
      return author;
    } catch (err) {
      dispatch(setApiError(err));
      throw parseAPIError(err);
    } finally {
      dispatch(requestEnd());
    }
  };

export const deleteAuthorReducer =
  (state: any, action: ReduxAction) => ({
    ...state,
    data: sortByLastName(
      state.data.filter((a) => a.id !== action.payload.author.id),
    ),
  });
