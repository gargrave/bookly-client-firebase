// @flow
import type { Book, BookErrors } from './flowtypes'

import { validationErrors } from '../../globals/errors'
import { bookModel } from './models'

export function bookHasAllFields(book: Book) {
  return !!book.title && !!book.author && !!book.author.id
}

export function booksMatch(a: Book, b: Book): boolean {
  if (a.title && b.title && a.title.trim() !== b.title.trim()) {
    return false
  }

  if (a.author.id !== b.author.id) {
    return false
  }

  // TODO: maybe make a separate helper for cleanly comparing strings
  if (!a.sortBy && b.sortBy && b.sortBy.length) {
    return false
  }
  if (a.sortBy && !b.sortBy && a.sortBy.length) {
    return false
  }
  if (a.sortBy && b.sortBy && a.sortBy.trim() !== b.sortBy.trim()) {
    return false
  }

  return true
}

export function validateBook(data: Book): BookErrors {
  const errors = {
    found: false,
    ...bookModel.emptyErrors(),
  }
  const title = data.title
  const authorId = data.author.id

  if (!title) {
    errors.found = true
    errors.title = validationErrors.required
  }

  if (!authorId) {
    errors.found = true
    errors.author = validationErrors.required
  }

  return errors
}
