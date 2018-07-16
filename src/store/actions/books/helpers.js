// @flow
import type { Author } from '../../../modules/authors/flowtypes';
import type { Book } from '../../../modules/books/flowtypes';

const bookHasValidAuthor = (book: Book, authors: Author[]) =>
  authors.find((author: Author) => author.id === book.authorId);

export {
  bookHasValidAuthor,
};
