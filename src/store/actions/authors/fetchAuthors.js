// @flow
import type { Author } from '../../../globals/flowtypes';

import { fetchAuthorsFromAPI } from '../../../wrappers/api';
import { parseAPIError } from '../../../wrappers/errors';

import { AUTHORS } from '../../actionTypes';

import apiError from '../app/apiError';

import authorRequestEnd from './authorRequestEnd';
import authorRequestStart from './authorRequestStart';

const _fetchAuthors = (authors: Author[]) => ({
  type: AUTHORS.FETCH_SUCCESS,
  payload: { authors },
});

const fetchAuthors = () =>
  async (dispatch: Function, getState: Function) => {
    const authors = getState().authors.data;

    if (authors.length) {
      return authors;
    } else {
      dispatch(authorRequestStart());

      try {
        const records = await fetchAuthorsFromAPI();
        dispatch(_fetchAuthors(records));
        return records;
      } catch (err) {
        dispatch(apiError(err));
        throw parseAPIError(err);
      } finally {
        dispatch(authorRequestEnd());
      }
    }
  };

export default fetchAuthors;
