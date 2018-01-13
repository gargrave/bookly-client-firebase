// @flow
import { APP, AUTHORS } from '../actionTypes';

import type { Author, FbCollection, FbDoc, FbDocRef, FbError } from '../../constants/flowtypes';

import { deleteBooksByAuthor, refreshBooksByAuthor } from './bookActions';
import { parseFbError } from '../../globals/errors';
import { db, timestamp } from '../../globals/firebase/';
import { authorModel } from '../../models/Author.model';

const DB = 'authors';

// TODO: move this to a helper module
async function getDocRef(id: string): FbDocRef {
  return db.collection(DB).doc(id);
}

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
    payload: {
      authors,
    },
  };
}

function _createAuthor(author: Author) {
  return {
    type: AUTHORS.CREATE_SUCCESS,
    payload: {
      author,
    },
  };
}

function _updateAuthor(author: Author) {
  return {
    type: AUTHORS.UPDATE_SUCCESS,
    payload: {
      author,
    },
  };
}

function _deleteAuthor(author: Author) {
  return {
    type: AUTHORS.DELETE_SUCCESS,
    payload: {
      author,
    },
  };
}

// TODO: move this to a separate module
function _apiError(err: FbError) {
  return {
    type: APP.API_ERROR,
    payload: {
      err,
    },
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
        const userId = getState().auth.user.id;
        const query = db.collection(DB)
          .where('owner', '==', userId);
        const results: FbCollection = await query.get();
        const records: Author[] = results.docs.map((doc) => authorModel.fromAPI(doc));

        dispatch(_fetchAuthors(records));
        return records;
      } catch (err) {
        console.error('TODO: Deal with error in authorActions.fetchAuthors()');
        console.error(err);
        throw parseFbError(err);
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
      console.error('TODO: Deal with error in authorActions.createAuthor()');
      console.error(err);
      throw parseFbError(err);
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
      console.error('TODO: Deal with error in authorActions.updateAuthor()');
      console.error(err);
      throw parseFbError(err);
    } finally {
      dispatch(_requestEnd());
    }
  };
}

function deleteAuthor(author: Author) {
  return async (dispatch: Function) => {
    dispatch(_requestStart());
    try {
      dispatch(deleteBooksByAuthor(author));
      const docRef: FbDocRef = await getDocRef(author.id);
      await docRef.delete();

      dispatch(_deleteAuthor(author));
      return author;
    } catch (err) {
      dispatch(_apiError(err));
      throw parseFbError(err);
    } finally {
      dispatch(_requestEnd());
    }
  };
}

export {
  createAuthor,
  deleteAuthor,
  fetchAuthors,
  updateAuthor,
};
