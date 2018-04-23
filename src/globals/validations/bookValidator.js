// @flow
import type { Book, BookErrors } from '../../globals/flowtypes';

import { validationErrors } from '../errors';
import { bookModel } from '../../models/Book.model';
import { toUnixTimestamp } from '../../globals/utils/dateHelpers';

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

  const asdf = toUnixTimestamp(a.startedOn, 0);
  const zxcv = toUnixTimestamp(b.startedOn, 0);
  console.log({ asdf, zxcv });
  if (
    a.author.id !== b.author.id ||
    a.finished !== b.finished ||
    a.startedOn !== b.startedOn
  ) {
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
