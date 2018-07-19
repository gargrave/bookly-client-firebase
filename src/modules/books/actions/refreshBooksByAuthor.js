// @flow
import type { Author } from '../../authors/flowtypes';
import type { Book } from '../flowtypes';

import { refreshBookAuthor } from '../models';

import { BOOKS } from './types';

const fetchBooks = (books: Book[]) => ({
  type: BOOKS.FETCH_SUCCESS,
  payload: { books },
});

const refreshBooksByAuthor = (author: Author) => {
  return (dispatch: Function, getState: Function) => {
    const books = getState().books.data;
    const booksToIgnore = books
      .filter((b: Book) => b.author.id !== author.id);
    const booksToUpdate = books
      .filter((b: Book) => b.author.id === author.id);

    booksToUpdate.forEach((book: Book) =>
      refreshBookAuthor(book, [author])
    );

    dispatch(fetchBooks([
      ...booksToIgnore,
      ...booksToUpdate,
    ]));
  };
};

export default refreshBooksByAuthor;
