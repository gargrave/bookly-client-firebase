// @flow
import { BOOKS } from '../actionTypes';

import type { Author, Book, FbCollection, FbDoc, FbDocRef } from '../../constants/flowtypes';
import { parseError } from '../../globals/errors';
import { bookModel, refreshBookAuthor } from '../../models/Book.model';

import { db, timestamp } from '../../globals/firebase/';

import { fetchAuthors } from './authorActions';

const DB = 'books';

function _requestStart() {
  return {
    type: BOOKS.REQUEST_START,
  };
}

function _requestEnd() {
  return {
    type: BOOKS.REQUEST_END,
  };
}

function _fetchBooks(books: Book[]) {
  return {
    type: BOOKS.FETCH_SUCCESS,
    payload: { books },
  };
}

function _createBook(book: Book) {
  return {
    type: BOOKS.CREATE_SUCCESS,
    payload: { book },
  };
}

function _updateBook(book: Book) {
  return {
    type: BOOKS.UPDATE_SUCCESS,
    payload: { book },
  };
}

function refreshBooksByAuthor(author: Author) {
  return (dispatch: Function, getState: Function) => {
    const books = getState().books.data;
    const booksToIgnore = books
      .filter((b: Book) => b.author.id !== author.id);
    const booksToUpdate = books
      .filter((b: Book) => b.author.id === author.id);

    booksToUpdate.forEach((book: Book) =>
      refreshBookAuthor(book, [author])
    );
    dispatch(_fetchBooks([
      ...booksToIgnore,
      ...booksToUpdate,
    ]));
  };
}

function fetchBooks() {
  return async (dispatch: Function, getState: Function) => {
    // ensure that Author data has been loaded
    const authors = getState().authors.data;
    if (!authors.length) {
      await dispatch(fetchAuthors());
    }

    const books = getState().books.data;
    if (books.length) {
      return books;
    } else {
      dispatch(_requestStart());
      try {
        const results: FbCollection = await db.collection(DB).get();
        const authors: Author[] = getState().authors.data;
        const records: Book[] = results.docs.map(
          (doc: FbDoc) => bookModel.fromAPI(doc, authors)
        );

        dispatch(_fetchBooks(records));
        return records;
      } catch (err) {
        throw parseError(err);
      } finally {
        dispatch(_requestEnd());
      }
    }
  };
}

function createBook(book: Book) {
  return async (dispatch: Function, getState: Function) => {
    dispatch(_requestStart());
    try {
      const payload = {
        owner: getState().auth.user.id,
        created: timestamp(),
        updated: timestamp(),
        ...book,
      };

      const docRef: FbDocRef = await db.collection(DB).add(payload);
      const doc: FbDoc = await docRef.get();
      const authors: Author[] = getState().authors.data;
      const newRecord: Book = bookModel.fromAPI(doc, authors);

      dispatch(_createBook(newRecord));
      return newRecord;
    } catch (err) {
      console.error(`Error writing document: ${err}`);
      throw parseError(err);
    } finally {
      dispatch(_requestEnd());
    }
  };
}

function updateBook(book: Book) {
  return async (dispatch: Function, getState: Function) => {
    dispatch(_requestStart());
    try {
      const payload = {
        title: book.title,
        authorId: book.authorId,
        created: book.created || timestamp(),
        updated: timestamp(),
      };

      const id = book.id;
      const docRef: FbDocRef = await db.collection(DB).doc(id);
      await docRef.update(payload);
      const doc: FbDoc = await docRef.get();
      const authors: Author[] = getState().authors.data;
      const updatedRecord: Book = bookModel.fromAPI(doc, authors);

      dispatch(_updateBook(updatedRecord));
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
  refreshBooksByAuthor,
  createBook,
  fetchBooks,
  updateBook,
};
