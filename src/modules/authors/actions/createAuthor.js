// @flow
import type { ReduxAction } from '../../common/flowtypes'
import type { Author } from '../flowtypes'

import { createAuthorOnAPI } from '../../../wrappers/api'
import { parseAPIError } from '../../../wrappers/errors'

import { setApiError } from '../../core/actions/setApiError'

import { requestEnd } from './requestEnd'
import { requestStart } from './requestStart'

import { sortByLastName } from './helpers'
import types from './types'

const _createAuthor = (author: Author) => ({
  type: types.CREATE,
  payload: { author },
})

export const createAuthor = (author: Author) => async (dispatch: Function) => {
  dispatch(requestStart())

  try {
    const newRecord: Author = await createAuthorOnAPI(author)
    dispatch(_createAuthor(newRecord))
    return newRecord
  } catch (err) {
    dispatch(setApiError(err))
    throw parseAPIError(err)
  } finally {
    dispatch(requestEnd())
  }
}

export const createAuthorReducer = (state: any, action: ReduxAction) => ({
  ...state,
  data: sortByLastName([...state.data, action.payload.author]),
})
