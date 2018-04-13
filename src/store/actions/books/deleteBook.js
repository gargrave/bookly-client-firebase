// @flow
import type { Book, FbDocRef } from '../../../constants/flowtypes';

import { parseFbError } from '../../../globals/errors';
import { db } from '../../../globals/firebase/';
import { apiErrorAction, getDocRef } from '../../../utils/apiHelpers';

import { BOOKS } from '../../actionTypes';

import { DB_TABLE } from './constants';
import bookRequestEnd from './bookRequestEnd';
import bookRequestStart from './bookRequestStart';

const _deleteBook = (book: Book) => ({
  type: BOOKS.DELETE_SUCCESS,
  payload: { book },
});

const deleteBook = (book: Book) =>
  async (dispatch: Function) => {
    dispatch(bookRequestStart());

    try {
      const docRef: FbDocRef = await getDocRef(db, DB_TABLE, book.id);
      await docRef.delete();
      dispatch(_deleteBook(book));
      return book;
    } catch (err) {
      dispatch(apiErrorAction(err));
      throw parseFbError(err);
    } finally {
      dispatch(bookRequestEnd());
    }
  };

export default deleteBook;
