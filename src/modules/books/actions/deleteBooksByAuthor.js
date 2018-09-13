// @flow
import type { FbCollection } from '../../../wrappers/firebase/flowtypes'
import type { Author } from '../../authors/flowtypes'
import type { ReduxAction } from '../../common/flowtypes'

import {
  deleteBooksFromAPI,
  fetchBooksByAuthorFromAPI,
} from '../../../wrappers/api'
import { parseAPIError } from '../../../wrappers/errors'

import { setApiError } from '../../core/actions/setApiError'
import { requestEnd } from './requestEnd'
import { requestStart } from './requestStart'

import types from './types'

const _deleteBooksByAuthor = (author: Author) => ({
  type: types.DELETE_BY_AUTHOR,
  payload: { author },
})

export const deleteBooksByAuthor = (author: Author) => async (
  dispatch: Function,
) => {
  dispatch(requestStart())

  try {
    const booksByAuthor: FbCollection = await fetchBooksByAuthorFromAPI(author)
    if (booksByAuthor.docs.length) {
      await deleteBooksFromAPI(booksByAuthor)
      dispatch(_deleteBooksByAuthor(author))
    }
  } catch (err) {
    dispatch(setApiError(err))
    throw parseAPIError(err)
  } finally {
    dispatch(requestEnd())
  }
}

export const deleteBooksByAuthorReducer = (
  state: any,
  action: ReduxAction,
) => ({
  ...state,
  data: state.data.filter(book => book.author.id !== action.payload.author.id),
})

export default deleteBooksByAuthor
