// @flow
import type { Author, FbDoc, FbDocRef } from '../../../constants/flowtypes';

import { parseFbError } from '../../../globals/errors';
import { db, timestamp } from '../../../globals/firebase/';
import { authorModel } from '../../../models/Author.model';

import { AUTHORS } from '../../actionTypes';

import apiError from '../app/apiError';
import refreshBooksByAuthor from '../books/refreshBooksByAuthor';

import { DB_TABLE } from './constants';
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
      const payload = {
        firstName: author.firstName,
        lastName: author.lastName,
        created: author.created || timestamp(),
        updated: timestamp(),
      };

      const id = author.id;
      const docRef: FbDocRef = await db.collection(DB_TABLE).doc(id);
      await docRef.update(payload);
      const doc: FbDoc = await docRef.get();
      const updatedRecord: Author = authorModel.fromAPI(doc);

      dispatch(_updateAuthor(updatedRecord));
      dispatch(refreshBooksByAuthor(updatedRecord));
      return updatedRecord;
    } catch (err) {
      dispatch(apiError(err));
      throw parseFbError(err);
    } finally {
      dispatch(authorRequestEnd());
    }
  };

export default updateAuthor;
