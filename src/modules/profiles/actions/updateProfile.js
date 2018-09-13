// @flow
import type { ReduxAction } from '../../common/flowtypes'
import type { Profile } from '../flowtypes'

import { updateProfileOnAPI } from '../../../wrappers/api'
import { parseAPIError } from '../../../wrappers/errors'

import { setApiError } from '../../core/actions/setApiError'

import { requestEnd } from './requestEnd'
import { requestStart } from './requestStart'

import types from './types'

const _updateProfile = (profile: Profile) => ({
  type: types.UPDATE,
  payload: { profile },
})

export const updateProfile = (profile: Profile) => async (
  dispatch: Function,
) => {
  dispatch(requestStart())

  try {
    const updatedRecord = await updateProfileOnAPI(profile)
    dispatch(_updateProfile(updatedRecord))
    return updatedRecord
  } catch (err) {
    dispatch(setApiError(err))
    throw parseAPIError(err)
  } finally {
    dispatch(requestEnd())
  }
}

export const updateProfileReducer = (state: any, action: ReduxAction) => ({
  ...state,
  data: action.payload.profile,
})
