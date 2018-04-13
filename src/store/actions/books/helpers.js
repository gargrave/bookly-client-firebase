// @flow
import type { Author, Book } from '../../../constants/flowtypes';

const bookHasValidAuthor = (book: Book, authors: Author[]) =>
  authors.find((author: Author) => author.id === book.authorId);

export {
  bookHasValidAuthor,
};
