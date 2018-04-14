// @flow
import type { Author } from '../../../globals/flowtypes';

import { createAuthorOnAPI } from '../../../wrappers/api';
import { parseAPIError } from '../../../wrappers/errors';

import { AUTHORS } from '../../actionTypes';

import apiError from '../app/apiError';

import authorRequestEnd from './authorRequestEnd';
import authorRequestStart from './authorRequestStart';

const _createAuthor = (author: Author) => ({
  type: AUTHORS.CREATE_SUCCESS,
  payload: { author },
});

const createAuthor = (author: Author) =>
  async (dispatch: Function) => {
    dispatch(authorRequestStart());

    try {
      const newRecord: Author = await createAuthorOnAPI(author);
      dispatch(_createAuthor(newRecord));
      return newRecord;
    } catch (err) {
      dispatch(apiError(err));
      throw parseAPIError(err);
    } finally {
      dispatch(authorRequestEnd());
    }
  };

export default createAuthor;
