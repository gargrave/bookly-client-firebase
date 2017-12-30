import { BOOKS } from '../action-types';
import axios from 'axios';

import { apiUrls } from '../../constants/urls';
import { parseError } from '../../globals/errors';
import apiHelper from '../../utils/apiHelper';
import { getTokenOrDie } from '../store-helpers';

import { fetchAuthors } from './author-actions';

function _requestStart() {
  return { type: BOOKS.REQUEST_START };
}

function _requestEnd() {
  return { type: BOOKS.REQUEST_END };
}

function _fetchBooks(books) {
  return {
    type: BOOKS.FETCH_SUCCESS,
    payload: { books },
  };
}

function _createBook(book) {
  return {
    type: BOOKS.CREATE_SUCCESS,
    payload: { book },
  };
}

function _updateBook(book) {
  return {
    type: BOOKS.UPDATE_SUCCESS,
    payload: { book },
  };
}

export function fetchBooks() {
  return async (dispatch, getState) => {
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
        const authToken = getTokenOrDie(getState);
        const request = apiHelper.axGet(apiUrls.books, authToken);
        const result = await axios(request);
        // const pagination = result.data.meta
        const bookData = result.data.results;

        dispatch(_fetchBooks(bookData));
        return bookData;
      } catch (err) {
        throw parseError(err);
      } finally {
        dispatch(_requestEnd());
      }
    }
  };
}

export function createBook(book) {
  return async (dispatch, getState) => {
    dispatch(_requestStart());
    try {
      const authToken = getTokenOrDie(getState);
      const request = apiHelper.axPost(apiUrls.books, book, authToken);
      const result = await axios(request);
      const bookData = result.data;

      dispatch(_createBook(bookData));
      return bookData;
    } catch (err) {
      throw parseError(err);
    } finally {
      dispatch(_requestEnd());
    }
  };
}

export function updateBook(book) {
  return async (dispatch, getState) => {
    dispatch(_requestStart());
    try {
      const authToken = getTokenOrDie(getState);
      const url = `${apiUrls.books}${book.id}`;
      const request = apiHelper.axPut(url, book, authToken);
      const result = await axios(request);
      const bookData = result.data;

      dispatch(_updateBook(bookData));
      return bookData;
    } catch (err) {
      throw parseError(err);
    } finally {
      dispatch(_requestEnd());
    }
  };
}
