// @flow
import type { Author } from '../../../modules/authors/flowtypes';
import type { Book } from '../../../modules/books/flowtypes';

export const bookHasValidAuthor = (book: Book, authors: Author[]) =>
  authors.find((author: Author) => author.id === book.authorId);

export const sortByAuthorLastName = (books: Book[]) =>
  books
  .sort((a, b) => {
    return a.title > b.title ? 1 : -1;
  })
  .sort((a, b) => {
    return a.author.lastName.toLowerCase() > b.author.lastName.toLowerCase() ? 1 : -1;
  });

