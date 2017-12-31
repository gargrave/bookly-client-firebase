// @flow
import { AUTHORS } from '../action-types';

import type { Author, FirebaseDoc } from '../../constants/flowtypes';
import { parseError } from '../../globals/errors';
import { db, timestamp } from '../../globals/firebase/';

const DB = 'authors';
const TEMP_USER_ID = 'h6E552ay3JdE6MrJfCIVfdXQsP23';

function docToAuthor(doc: FirebaseDoc) {
  return {
    id: doc.id,
    ...doc.data(),
  };
}

function _requestStart() {
  return { type: AUTHORS.REQUEST_START };
}

function _requestEnd() {
  return { type: AUTHORS.REQUEST_END };
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

export function fetchAuthors() {
  return async (dispatch: any, getState: any) => {
    const authors = getState().authors.data;
    if (authors.length) {
      return authors;
    } else {
      dispatch(_requestStart());
      try {
        const result = await db.collection(DB).get();
        const authors = result.docs.map((doc) => docToAuthor(doc));
        dispatch(_fetchAuthors(authors));
        return authors;
      } catch (err) {
        throw parseError(err);
      } finally {
        dispatch(_requestEnd());
      }
    }
  };
}

export function createAuthor(author: Author) {
  return async (dispatch: any) => {
    dispatch(_requestStart());
    try {
      const payload = {
        owner: TEMP_USER_ID,
        created: timestamp(),
        updated: timestamp(),
        ...author,
      };

      const docRef = await db.collection(DB).add(payload);
      const doc = await docRef.get();

      const newAuthor = docToAuthor(doc);
      dispatch(_createAuthor(newAuthor));
      return newAuthor;
    } catch (err) {
      console.error(`Error writing document: ${err}`);
      throw parseError(err);
    } finally {
      dispatch(_requestEnd());
    }
  };
}

export function updateAuthor(author: Author) {
  return async (dispatch: any) => {
    dispatch(_requestStart());
    try {
      const payload = {
        firstName: author.firstName,
        lastName: author.lastName,
        created: author.created || timestamp(),
        updated: timestamp(),
      };

      const id = author.id;
      const docRef = db.collection(DB).doc(id);
      await docRef.update(payload);
      const doc = await docRef.get();

      const updatedAuthor = docToAuthor(doc);
      dispatch(_updateAuthor(updatedAuthor));
      return updatedAuthor;
    } catch (err) {
      throw parseError(err);
    } finally {
      dispatch(_requestEnd());
    }
  };
}
