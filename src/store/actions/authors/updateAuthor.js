// @flow
import type { Author } from '../../../globals/flowtypes';

import { updateAuthorOnAPI } from '../../../wrappers/api';
import { parseAPIError } from '../../../wrappers/errors';

import { AUTHORS } from '../../actionTypes';

import apiError from '../app/apiError';
import refreshBooksByAuthor from '../books/refreshBooksByAuthor';

import authorRequestEnd from './authorRequestEnd';
import authorRequestStart from './authorRequestStart';

const _updateAuthor = (author: Author) => ({
  type: AUTHORS.UPDATE_SUCCESS,
  payload: { author },
});

const updateAuthor = (author: Author) =>
  async (dispatch: Function) => {
    dispatch(authorRequestStart());

    try {
      const updatedRecord = await updateAuthorOnAPI(author);
      dispatch(_updateAuthor(updatedRecord));
      dispatch(refreshBooksByAuthor(updatedRecord));
      return updatedRecord;
    } catch (err) {
      dispatch(apiError(err));
      throw parseAPIError(err);
    } finally {
      dispatch(authorRequestEnd());
    }
  };

export default updateAuthor;
