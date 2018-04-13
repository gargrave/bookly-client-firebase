// @flow
import type { Author, FbDoc, FbDocRef } from '../../../constants/flowtypes';

import { parseFbError } from '../../../globals/errors';
import { db, timestamp } from '../../../globals/firebase/';
import { authorModel } from '../../../models/Author.model';

import { AUTHORS } from '../../actionTypes';

import apiError from '../app/apiError';

import { DB_TABLE } from './constants';
import authorRequestEnd from './authorRequestEnd';
import authorRequestStart from './authorRequestStart';

const _createAuthor = (author: Author) => ({
  type: AUTHORS.CREATE_SUCCESS,
  payload: { author },
});

const createAuthor = (author: Author) =>
  async (dispatch: Function, getState: Function) => {
    dispatch(authorRequestStart());

    try {
      const payload = {
        owner: getState().auth.user.id,
        created: timestamp(),
        updated: timestamp(),
        ...author,
      };

      const docRef: FbDocRef = await db.collection(DB_TABLE).add(payload);
      const doc: FbDoc = await docRef.get();
      const newRecord: Author = authorModel.fromAPI(doc);

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
