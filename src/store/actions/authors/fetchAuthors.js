// @flow
import type { Author } from '../../../globals/flowtypes';

import { parseFbError } from '../../../globals/errors';
import { fetchAuthorsFromAPI } from '../../../wrappers/api';

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
        throw parseFbError(err);
      } finally {
        dispatch(authorRequestEnd());
      }
    }
  };

export default fetchAuthors;
