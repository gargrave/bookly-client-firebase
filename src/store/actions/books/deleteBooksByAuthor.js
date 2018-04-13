// @flow
import type { Author, FbCollection, FbDoc } from '../../../constants/flowtypes';

import { parseFbError } from '../../../globals/errors';
import { db } from '../../../globals/firebase/';

import { BOOKS } from '../../actionTypes';

import apiError from '../app/apiError';

import { DB_TABLE } from './constants';
import bookRequestEnd from './bookRequestEnd';
import bookRequestStart from './bookRequestStart';

const _deleteBooksByAuthor = (author: Author) => ({
  type: BOOKS.DELETE_BY_AUTHOR_SUCCESS,
  payload: { author },
});

const deleteBooksByAuthor = (author: Author) =>
  async (dispatch: Function, getState: Function) => {
    dispatch(bookRequestStart());

    try {
      const userId = getState().auth.user.id;
      const query = await db.collection(DB_TABLE)
        .where('owner', '==', userId)
        .where('authorId', '==', author.id);
      const results: FbCollection = await query.get();

      if (results.docs.length) {
        const batch = db.batch();
        results.docs.forEach(
          (doc: FbDoc) => batch.delete(doc.ref)
        );
        await batch.commit();
        dispatch(_deleteBooksByAuthor(author));
      }
    } catch (err) {
      dispatch(apiError(err));
      throw parseFbError(err);
    } finally {
      dispatch(bookRequestEnd());
    }
  };

export default deleteBooksByAuthor;
