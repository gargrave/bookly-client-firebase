// @flow
import type { Author } from '../../../modules/authors/flowtypes'
import type { Book } from '../../../modules/books/flowtypes'
import type { ReduxAction } from '../../common/flowtypes'

import { updateBookOnAPI } from '../../../wrappers/api'
import { parseAPIError } from '../../../wrappers/errors'

import { setApiError } from '../../core/actions/setApiError'
import { requestEnd } from './requestEnd'
import { requestStart } from './requestStart'

import { bookHasValidAuthor, sortBooks } from '../helpers'
import types from './types'

const _updateBook = (book: Book) => ({
  type: types.UPDATE,
  payload: { book },
})

export const updateBook = (book: Book) => async (
  dispatch: Function,
  getState: Function,
) => {
  dispatch(requestStart())

  try {
    // validate author before proceeding
    const authors: Author[] = getState().authors.data
    if (!bookHasValidAuthor(book, authors)) {
      throw Error('Invalid Author data.')
    }

    const updatedRecord: Book = await updateBookOnAPI(book, authors)
    dispatch(_updateBook(updatedRecord))
    return updatedRecord
  } catch (err) {
    dispatch(setApiError(err))
    throw parseAPIError(err)
  } finally {
    dispatch(requestEnd())
  }
}

export const updateBookReducer = (state: any, action: ReduxAction) => ({
  ...state,
  data: sortBooks([
    ...state.data.filter(book => book.id !== action.payload.book.id),
    action.payload.book,
  ]),
})
