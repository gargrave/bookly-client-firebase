// @flow
import type { Author, FbDocRef } from '../../../constants/flowtypes';

import { parseFbError } from '../../../globals/errors';
import { db } from '../../../globals/firebase/';
import { getDocRef } from '../../../utils/apiHelpers';

import { AUTHORS } from '../../actionTypes';

import apiError from '../app/apiError';
import deleteBooksByAuthor from '../books/deleteBooksByAuthor';

import { DB_TABLE } from './constants';
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
      const docRef: FbDocRef = await getDocRef(db, DB_TABLE, author.id);
      await docRef.delete();

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
