// @flow
import type { ReduxAction } from '../../common/flowtypes';
import type { Author } from '../flowtypes';

import { fetchAuthorsFromAPI } from '../../../wrappers/api';
import { parseAPIError } from '../../../wrappers/errors';

import { setApiError } from '../../core/actions';

import { requestEnd } from './requestEnd';
import { requestStart } from './requestStart';

import { sortByLastName } from './helpers';
import types from './types';

const _fetchAuthors = (authors: Author[]) => ({
  type: types.FETCH,
  payload: { authors },
});

export const fetchAuthors = () =>
  async (dispatch: Function, getState: Function) => {
    const authors = getState().authors.data;

    if (authors.length) {
      return authors;
    } else {
      dispatch(requestStart());

      try {
        const records = await fetchAuthorsFromAPI();
        dispatch(_fetchAuthors(records));
        return records;
      } catch (err) {
        dispatch(setApiError(err));
        throw parseAPIError(err);
      } finally {
        dispatch(requestEnd());
      }
    }
  };

export const fetchAuthorsReducer =
  (state: any, action: ReduxAction) => ({
    ...state,
    data: sortByLastName(action.payload.authors),
  });
