// @flow
import type { Author } from './flowtypes'

import { validationErrors } from '../../globals/errors'

export function authorHasAllFields(author: Author) {
  return !!author.firstName && !!author.lastName
}

export function authorsMatch(a: Author, b: Author): boolean {
  if (a.firstName.trim() !== b.firstName.trim()) {
    return false
  }
  if (a.lastName.trim() !== b.lastName.trim()) {
    return false
  }
  return true
}

export function validateAuthor(data: Author): Object {
  const errors = {
    found: false,
    firstName: '',
    lastName: '',
  }
  const first = data.firstName
  const last = data.lastName

  if (!first) {
    errors.found = true
    errors.firstName = validationErrors.required
  }

  if (!last) {
    errors.found = true
    errors.lastName = validationErrors.required
  }

  return errors
}
