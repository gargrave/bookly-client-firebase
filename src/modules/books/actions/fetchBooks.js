// @flow
import type { Author } from '../../authors/flowtypes'
import type { Book } from '../../books/flowtypes'
import type { ReduxAction } from '../../common/flowtypes'

import { fetchBooksFromAPI } from '../../../wrappers/api'
import { parseAPIError } from '../../../wrappers/errors'

import { fetchAuthors } from '../../authors/actions/fetchAuthors'
import { setApiError } from '../../core/actions/setApiError'

import { requestEnd } from './requestEnd'
import { requestStart } from './requestStart'

import { sortBooks } from '../helpers.js'
import types from './types'

const _fetchBooks = (books: Book[]) => ({
  type: types.FETCH,
  payload: { books },
})

export const fetchBooks = () => async (
  dispatch: Function,
  getState: Function,
) => {
  // ensure that Author data has been loaded
  let authors: Author[] = getState().authors.data
  if (!authors.length) {
    authors = await dispatch(fetchAuthors())
  }

  const books = getState().books.data
  if (books.length) {
    return books
  } else {
    dispatch(requestStart())

    try {
      const records: Book[] = await fetchBooksFromAPI(authors)
      dispatch(_fetchBooks(records))
      return records
    } catch (err) {
      dispatch(setApiError(err))
      throw parseAPIError(err)
    } finally {
      dispatch(requestEnd())
    }
  }
}

export const fetchBooksReducer = (state: any, action: ReduxAction) => ({
  ...state,
  data: sortBooks(action.payload.books),
})
