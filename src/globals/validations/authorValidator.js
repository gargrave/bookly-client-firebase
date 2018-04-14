// @flow
import type { Author } from '../../globals/flowtypes';
import { validationErrors } from '../errors';

function authorHasAllFields(author: Author) {
  return !!author.firstName && !!author.lastName;
}

function authorsMatch(a: Author, b: Author): boolean {
  if (a.firstName.trim() !== b.firstName.trim()) {
    return false;
  }
  if (a.lastName.trim() !== b.lastName.trim()) {
    return false;
  }
  return true;
}

function validateAuthor(data: Author): Object {
  const errors = {
    found: false,
    firstName: '',
    lastName: '',
  };
  const first = data.firstName;
  const last = data.lastName;

  if (!first) {
    errors.found = true;
    errors.firstName = validationErrors.required;
  }

  if (!last) {
    errors.found = true;
    errors.lastName = validationErrors.required;
  }

  return errors;
}

export {
  authorHasAllFields,
  authorsMatch,
  validateAuthor,
};
