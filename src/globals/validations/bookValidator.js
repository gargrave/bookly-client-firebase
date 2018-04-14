// @flow
import type { Book, BookErrors } from '../../globals/flowtypes';

import { validationErrors } from '../errors';
import { bookModel } from '../../models/Book.model';

function bookHasAllFields(book: Book) {
  return !!book.title
    && !!book.author
    && !!book.author.id;
}

function booksMatch(a: Book, b: Book): boolean {
  if (a.title && b.title &&
      a.title.trim() !== b.title.trim()) {
    return false;
  }

  if (a.author.id !== b.author.id) {
    return false;
  }

  return true;
}

function validateBook(data: Book): BookErrors {
  const errors = {
    found: false,
    ...bookModel.emptyErrors(),
  };
  const title = data.title;
  const authorId = data.author.id;

  if (!title) {
    errors.found = true;
    errors.title = validationErrors.required;
  }

  if (!authorId) {
    errors.found = true;
    errors.author = validationErrors.required;
  }

  return errors;
}

export {
  bookHasAllFields,
  booksMatch,
  validateBook,
};
