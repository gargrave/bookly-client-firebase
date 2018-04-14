// @flow
import type { Author } from '../../../globals/flowtypes';

import { parseFbError } from '../../../globals/errors';
import { createAuthorOnAPI } from '../../../wrappers/api';

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
      throw parseFbError(err);
    } finally {
      dispatch(authorRequestEnd());
    }
  };

export default createAuthor;
