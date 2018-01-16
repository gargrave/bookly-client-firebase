// @flow
import { APP, BOOKS } from '../actionTypes';

import type { Author, Book, FbCollection, FbDoc, FbDocRef, FbError } from '../../constants/flowtypes';
import { parseFbError } from '../../globals/errors';
import { bookModel, refreshBookAuthor } from '../../models/Book.model';

import { db, timestamp } from '../../globals/firebase/';

import { fetchAuthors } from './authorActions';

const DB = 'books';

// TODO: move this to a helper module
async function getDocRef(id: string): FbDocRef {
  return db.collection(DB).doc(id);
}

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

function _deleteBook(book: Book) {
  return {
    type: BOOKS.DELETE_SUCCESS,
    payload: {
      book,
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

function _deleteBooksByAuthor(author: Author) {
  return {
    type: BOOKS.DELETE_BY_AUTHOR_SUCCESS,
    payload: {
      author,
    },
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
        const userId = getState().auth.user.id;
        const query = db.collection(DB)
          .where('owner', '==', userId);
        const results: FbCollection = await query.get();
        const authors: Author[] = getState().authors.data;
        const records: Book[] = results.docs.map(
          (doc: FbDoc) => bookModel.fromAPI(doc, authors)
        );

        dispatch(_fetchBooks(records));
        return records;
      } catch (err) {
        console.error('TODO: Deal with error in bookActions.fetchBooks()');
        console.error(err);
        throw parseFbError(err);
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
      console.error('TODO: Deal with error in bookActions.createBook()');
      console.error(err);
      throw parseFbError(err);
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
      console.error('TODO: Deal with error in bookActions.updateBook()');
      console.error(err);
      throw parseFbError(err);
    } finally {
      dispatch(_requestEnd());
    }
  };
}

function deleteBook(book: Book) {
  return async (dispatch: Function) => {
    dispatch(_requestStart());
    try {
      const docRef: FbDocRef = await getDocRef(book.id);
      await docRef.delete();
      dispatch(_deleteBook(book));
      return book;
    } catch (err) {
      dispatch(_apiError(err));
      throw parseFbError(err);
    } finally {
      dispatch(_requestEnd());
    }
  };
}

function deleteBooksByAuthor(author: Author) {
  return async (dispatch: Function, getState: Function) => {
    dispatch(_requestStart());
    try {
      const userId = getState().auth.user.id;
      const query = await db.collection(DB)
        .where('owner', '==', userId)
        .where('authorId', '==', author.id);
      const results: FbCollection = await query.get();
      if (results.docs.length) {
        const batch = db.batch();
        results.docs.forEach(
          (doc: FbDoc) => batch.delete(doc.ref)
        );
        await batch.commit();
        dispatch(_deleteBooksByAuthor(author));
      }
    } catch (err) {
      dispatch(_apiError(err));
      throw parseFbError(err);
    } finally {
      dispatch(_requestEnd());
    }
  };
}

export {
  createBook,
  deleteBook,
  deleteBooksByAuthor,
  fetchBooks,
  refreshBooksByAuthor,
  updateBook,
};
