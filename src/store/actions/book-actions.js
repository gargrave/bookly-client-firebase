// @flow
import { BOOKS } from '../action-types';
import axios from 'axios';

import type { Author, Book, FirebaseDoc } from '../../constants/flowtypes';
import { getTokenOrDie } from '../store-helpers';
import { apiUrls } from '../../constants/urls';
import { parseError } from '../../globals/errors';
import { bookModel } from '../../models/Book.model';
import apiHelper from '../../utils/apiHelper';

import { db, docToObject, timestamp } from '../../globals/firebase/';

import { fetchAuthors } from './author-actions';

const DB = 'books';
const TEMP_USER_ID = 'h6E552ay3JdE6MrJfCIVfdXQsP23';

function _requestStart() {
  return { type: BOOKS.REQUEST_START };
}

function _requestEnd() {
  return { type: BOOKS.REQUEST_END };
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

export function fetchBooks() {
  return async (dispatch: any, getState: any) => {
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
        const results = await db.collection(DB).get();
        const authors = getState().authors.data;
        const records = results.docs.map(
          (doc) => bookModel.fromDoc(doc, authors)
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

export function createBook(book: Book) {
  return async (dispatch: any, getState: any) => {
    console.error('TODO: update "create book" request to use Firebase');
    dispatch(_requestStart());
    try {
      const payload = {
        owner: TEMP_USER_ID,
        created: timestamp(),
        updated: timestamp(),
        ...book,
      };

      const docRef = await db.collection(DB).add(payload);
      const doc = await docRef.get();
      const authors = getState().authors.data;

      const newRecord = docToObject(doc);
      dispatch(_createBook(newRecord));
      return newRecord;
    } catch (err) {
      console.error(`Error writing document: ${err}`);
      throw parseError(err);
    } finally {
      dispatch(_requestEnd());
    }
    // try {
    //   const authToken = getTokenOrDie(getState);
    //   const request = apiHelper.axPost(apiUrls.books, book, authToken);
    //   const result = await axios(request);
    //   const bookData = result.data;

    //   dispatch(_createBook(bookData));
    //   return bookData;
    // } catch (err) {
    //   throw parseError(err);
    // } finally {
    //   dispatch(_requestEnd());
    // }
  };
}

export function updateBook(book: Book) {
  return async (dispatch: any, getState: any) => {
    console.error('TODO: update "update book" request to use Firebase');
    dispatch(_requestStart());
    try {
      const authToken = getTokenOrDie(getState);
      const url = `${apiUrls.books}${book.id}`;
      const request = apiHelper.axPut(url, book, authToken);
      const result = await axios(request);
      const bookData = result.data;

      dispatch(_updateBook(bookData));
      return bookData;

      // const id = author.id;
      // const docRef = db.collection(DB).doc(id);
      // await docRef.update(payload);
      // const doc = await docRef.get();

      // const updatedRecord = docToAuthor(doc);
      // dispatch(_updateAuthor(updatedRecord));
      // return updatedRecord;
    } catch (err) {
      throw parseError(err);
    } finally {
      dispatch(_requestEnd());
    }
  };
}
