// @flow
import { AUTHORS } from '../actionTypes';

import type { Author, FbCollection, FbDoc, FbDocRef } from '../../constants/flowtypes';

import { refreshBooksByAuthor } from './bookActions';
import { parseError } from '../../globals/errors';
import { db, timestamp } from '../../globals/firebase/';
import { authorModel } from '../../models/Author.model';

const DB = 'authors';

function _requestStart() {
  return {
    type: AUTHORS.REQUEST_START,
  };
}

function _requestEnd() {
  return {
    type: AUTHORS.REQUEST_END,
  };
}

function _fetchAuthors(authors: Author[]) {
  return {
    type: AUTHORS.FETCH_SUCCESS,
    payload: { authors },
  };
}

function _createAuthor(author: Author) {
  return {
    type: AUTHORS.CREATE_SUCCESS,
    payload: { author },
  };
}

function _updateAuthor(author: Author) {
  return {
    type: AUTHORS.UPDATE_SUCCESS,
    payload: { author },
  };
}

function fetchAuthors() {
  return async (dispatch: Function, getState: Function) => {
    const authors = getState().authors.data;
    if (authors.length) {
      return authors;
    } else {
      dispatch(_requestStart());
      try {
        const results: FbCollection = await db.collection(DB).get();
        const records: Author[] = results.docs.map((doc) => authorModel.fromAPI(doc));

        dispatch(_fetchAuthors(records));
        return records;
      } catch (err) {
        throw parseError(err);
      } finally {
        dispatch(_requestEnd());
      }
    }
  };
}

function createAuthor(author: Author) {
  return async (dispatch: Function, getState: Function) => {
    dispatch(_requestStart());
    try {
      const payload = {
        owner: getState().auth.user.id,
        created: timestamp(),
        updated: timestamp(),
        ...author,
      };

      const docRef: FbDocRef = await db.collection(DB).add(payload);
      const doc: FbDoc = await docRef.get();
      const newRecord: Author = authorModel.fromAPI(doc);

      dispatch(_createAuthor(newRecord));
      return newRecord;
    } catch (err) {
      console.error(`Error writing document: ${err}`);
      throw parseError(err);
    } finally {
      dispatch(_requestEnd());
    }
  };
}

function updateAuthor(author: Author) {
  return async (dispatch: Function) => {
    dispatch(_requestStart());
    try {
      const payload = {
        firstName: author.firstName,
        lastName: author.lastName,
        created: author.created || timestamp(),
        updated: timestamp(),
      };

      const id = author.id;
      const docRef: FbDocRef = await db.collection(DB).doc(id);
      await docRef.update(payload);
      const doc: FbDoc = await docRef.get();
      const updatedRecord: Author = authorModel.fromAPI(doc);

      dispatch(_updateAuthor(updatedRecord));
      dispatch(refreshBooksByAuthor(updatedRecord));
      return updatedRecord;
    } catch (err) {
      console.error(`Error updating document: ${err}`);
      throw parseError(err);
    } finally {
      dispatch(_requestEnd());
    }
  };
}

export {
  createAuthor,
  fetchAuthors,
  updateAuthor,
};
