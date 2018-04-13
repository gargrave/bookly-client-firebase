// @flow
import type { Author, Book, FbCollection, FbDoc } from '../../../constants/flowtypes';

import { parseFbError } from '../../../globals/errors';
import { db } from '../../../globals/firebase/';
import { bookModel } from '../../../models/Book.model';
import { apiErrorAction } from '../../../utils/apiHelpers';

import { BOOKS } from '../../actionTypes';

import fetchAuthors from '../authors/fetchAuthors';

import { DB_TABLE } from './constants';
import bookRequestEnd from './bookRequestEnd';
import bookRequestStart from './bookRequestStart';

const _fetchBooks = (books: Book[]) => ({
  type: BOOKS.FETCH_SUCCESS,
  payload: { books },
});

const fetchBooks = () =>
  async (dispatch: Function, getState: Function) => {
    // ensure that Author data has been loaded
    const authors = getState().authors.data;
    if (!authors.length) {
      await dispatch(fetchAuthors());
    }

    const books = getState().books.data;
    if (books.length) {
      return books;
    } else {
      dispatch(bookRequestStart());
      try {
        const userId = getState().auth.user.id;
        const query = db.collection(DB_TABLE)
          .where('owner', '==', userId);
        const results: FbCollection = await query.get();
        const authors: Author[] = getState().authors.data;
        const records: Book[] = results.docs.map(
          (doc: FbDoc) => bookModel.fromAPI(doc, authors)
        );

        dispatch(_fetchBooks(records));
        return records;
      } catch (err) {
        dispatch(apiErrorAction(err));
        throw parseFbError(err);
      } finally {
        dispatch(bookRequestEnd());
      }
    }
  };

export default fetchBooks;
