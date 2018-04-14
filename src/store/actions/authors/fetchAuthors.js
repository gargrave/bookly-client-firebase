// @flow
import type { Author, FbCollection } from '../../../globals/flowtypes';

import { parseFbError } from '../../../globals/errors';
import { db } from '../../../globals/firebase/';
import { authorModel } from '../../../models/Author.model';

import { AUTHORS } from '../../actionTypes';

import apiError from '../app/apiError';

import { DB_TABLE } from './constants';
import authorRequestEnd from './authorRequestEnd';
import authorRequestStart from './authorRequestStart';

const _fetchAuthors = (authors: Author[]) => ({
  type: AUTHORS.FETCH_SUCCESS,
  payload: { authors },
});

const fetchAuthors = () =>
  async (dispatch: Function, getState: Function) => {
    const authors = getState().authors.data;

    if (authors.length) {
      return authors;
    } else {
      dispatch(authorRequestStart());

      try {
        const userId = getState().auth.user.id;
        const query = db.collection(DB_TABLE)
          .where('owner', '==', userId);
        const results: FbCollection = await query.get();
        const records: Author[] = results.docs.map((doc) => authorModel.fromAPI(doc));

        dispatch(_fetchAuthors(records));
        return records;
      } catch (err) {
        dispatch(apiError(err));
        throw parseFbError(err);
      } finally {
        dispatch(authorRequestEnd());
      }
    }
  };

export default fetchAuthors;
