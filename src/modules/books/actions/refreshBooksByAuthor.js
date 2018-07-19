// @flow
import type { Author } from '../../../modules/authors/flowtypes';
import type { Book } from '../../../modules/books/flowtypes';

import { refreshBookAuthor } from '../../../modules/books/models';

import types from './types';

const fetchBooks = (books: Book[]) => ({
  type: types.FETCH,
  payload: { books },
});

export const refreshBooksByAuthor = (author: Author) => {
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
