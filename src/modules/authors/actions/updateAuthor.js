// @flow
import type { ReduxAction } from '../../common/flowtypes'
import type { Author } from '../flowtypes'

import { updateAuthorOnAPI } from '../../../wrappers/api'
import { parseAPIError } from '../../../wrappers/errors'

import { refreshBooksByAuthor } from '../../books/actions/refreshBooksByAuthor'
import { setApiError } from '../../core/actions/setApiError'

import { requestEnd } from './requestEnd'
import { requestStart } from './requestStart'

import { sortByLastName } from './helpers'
import types from './types'

const _updateAuthor = (author: Author) => ({
  type: types.UPDATE,
  payload: { author },
})

export const updateAuthor = (author: Author) => async (dispatch: Function) => {
  dispatch(requestStart())

  try {
    const updatedRecord = await updateAuthorOnAPI(author)
    dispatch(_updateAuthor(updatedRecord))
    dispatch(refreshBooksByAuthor(updatedRecord))
    return updatedRecord
  } catch (err) {
    dispatch(setApiError(err))
    throw parseAPIError(err)
  } finally {
    dispatch(requestEnd())
  }
}

export const updateAuthorReducer = (state: any, action: ReduxAction) => ({
  ...state,
  data: sortByLastName([
    ...state.data.filter(a => a.id !== action.payload.author.id),
    action.payload.author,
  ]),
})
