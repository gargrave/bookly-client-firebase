// @flow
import type { Author, Book, FbDoc, FbDocRef } from '../../../constants/flowtypes';

import { parseFbError } from '../../../globals/errors';
import { db, timestamp } from '../../../globals/firebase/';
import { bookModel } from '../../../models/Book.model';

import { BOOKS } from '../../actionTypes';

import apiError from '../app/apiError';

import { DB_TABLE } from './constants';
import { bookHasValidAuthor } from './helpers';
import bookRequestEnd from './bookRequestEnd';
import bookRequestStart from './bookRequestStart';

const _updateBook = (book: Book) => ({
  type: BOOKS.UPDATE_SUCCESS,
  payload: { book },
});

const updateBook = (book: Book) =>
  async (dispatch: Function, getState: Function) => {
    try {
      // validate author before proceeding
      if (!bookHasValidAuthor(book, getState().authors.data)) {
        throw Error('Invalid Author data.');
      }

      dispatch(bookRequestStart());
      const payload = {
        title: book.title,
        authorId: book.authorId,
        created: book.created || timestamp(),
        updated: timestamp(),
      };

      const id = book.id;
      const docRef: FbDocRef = await db.collection(DB_TABLE).doc(id);
      await docRef.update(payload);
      const doc: FbDoc = await docRef.get();
      const authors: Author[] = getState().authors.data;
      const updatedRecord: Book = bookModel.fromAPI(doc, authors);

      dispatch(_updateBook(updatedRecord));
      return updatedRecord;
    } catch (err) {
      dispatch(apiError(err));
      throw parseFbError(err);
    } finally {
      dispatch(bookRequestEnd());
    }
  };

export default updateBook;
