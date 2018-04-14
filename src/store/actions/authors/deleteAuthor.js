// @flow
import type { Author } from '../../../globals/flowtypes';

import { parseFbError } from '../../../globals/errors';
import { deleteAuthorFromAPI } from '../../../wrappers/api';

import { AUTHORS } from '../../actionTypes';

import apiError from '../app/apiError';
import deleteBooksByAuthor from '../books/deleteBooksByAuthor';

import authorRequestEnd from './authorRequestEnd';
import authorRequestStart from './authorRequestStart';

const _deleteAuthor = (author: Author) => ({
  type: AUTHORS.DELETE_SUCCESS,
  payload: {
    author,
  },
});

const deleteAuthor = (author: Author) =>
  async (dispatch: Function) => {
    dispatch(authorRequestStart());

    try {
      dispatch(deleteBooksByAuthor(author));
      await deleteAuthorFromAPI(author);
      dispatch(_deleteAuthor(author));
      return author;
    } catch (err) {
      dispatch(apiError(err));
      throw parseFbError(err);
    } finally {
      dispatch(authorRequestEnd());
    }
  };

export default deleteAuthor;
