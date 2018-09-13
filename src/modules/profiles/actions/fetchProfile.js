// @flow
import type { ReduxAction } from '../../common/flowtypes'
import type { Profile } from '../flowtypes'

import { fetchProfileFromAPI } from '../../../wrappers/api'
import { parseAPIError } from '../../../wrappers/errors'

import { setApiError } from '../../core/actions/setApiError'

import { requestEnd } from './requestEnd'
import { requestStart } from './requestStart'

import types from './types'

const _fetchProfile = (profile: Profile) => ({
  type: types.FETCH,
  payload: profile,
})

export const fetchProfile = () => async (dispatch: Function) => {
  dispatch(requestStart())

  try {
    const record = await fetchProfileFromAPI()
    dispatch(_fetchProfile(record))
    return record
  } catch (err) {
    dispatch(setApiError(err))
    throw parseAPIError(err)
  } finally {
    dispatch(requestEnd())
  }
}

export const fetchProfileReducer = (state: any, action: ReduxAction) => ({
  ...state,
  data: action.payload,
})
