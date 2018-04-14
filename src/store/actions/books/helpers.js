// @flow
import type { Author, Book } from '../../../globals/flowtypes';

const bookHasValidAuthor = (book: Book, authors: Author[]) =>
  authors.find((author: Author) => author.id === book.authorId);

export {
  bookHasValidAuthor,
};
