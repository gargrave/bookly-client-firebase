// @flow
import type { Book } from '../../constants/flowtypes';

import { validationErrors } from '../errors';
import { bookModel } from '../../models/Book.model';

function booksMatch(a: Book, b: Book): boolean {
  if (a.title.trim() !== b.title.trim()) {
    return false;
  }

  if (a.author.id !== b.author.id) {
    return false;
  }

  return true;
}

function validateBook(data: Book): Object {
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
  booksMatch,
  validateBook,
};
