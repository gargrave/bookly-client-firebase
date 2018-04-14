// @flow
import type { Author, Book, FbDoc, FbDocRef } from '../../../globals/flowtypes';

import { parseFbError } from '../../../globals/errors';
import { db, timestamp } from '../../../globals/firebase/';
import { bookModel } from '../../../models/Book.model';

import { BOOKS } from '../../actionTypes';

import apiError from '../app/apiError';

import { DB_TABLE } from './constants';
import { bookHasValidAuthor } from './helpers';
import bookRequestEnd from './bookRequestEnd';
import bookRequestStart from './bookRequestStart';

const _createBook = (book: Book) => ({
  type: BOOKS.CREATE_SUCCESS,
  payload: { book },
});

const createBook = (book: Book) =>
  async (dispatch: Function, getState: Function) => {
    try {
      // validate author before proceeding
      if (!bookHasValidAuthor(book, getState().authors.data)) {
        throw Error('Invalid Author data.');
      }

      dispatch(bookRequestStart());
      const payload = {
        owner: getState().auth.user.id,
        created: timestamp(),
        updated: timestamp(),
        ...book,
      };

      const docRef: FbDocRef = await db.collection(DB_TABLE).add(payload);
      const doc: FbDoc = await docRef.get();
      const authors: Author[] = getState().authors.data;
      const newRecord: Book = bookModel.fromAPI(doc, authors);

      dispatch(_createBook(newRecord));
      return newRecord;
    } catch (err) {
      dispatch(apiError(err));
      throw parseFbError(err);
    } finally {
      dispatch(bookRequestEnd());
    }
  };

export default createBook;
