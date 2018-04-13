// @flow
import type { Author, Book } from '../../../constants/flowtypes';
import { refreshBookAuthor } from '../../../models/Book.model';

import { BOOKS } from '../../actionTypes';

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
