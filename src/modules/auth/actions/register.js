import { submitRegister } from '../../../wrappers/auth'
import { parseAPIError } from '../../../wrappers/errors'

import { setApiError } from '../../core/actions/setApiError'

import { requestEnd } from './requestEnd'
import { requestStart } from './requestStart'
import { setLocalUserData } from './setLocalUserData'

export const register = ({ email, password }) => {
  return async dispatch => {
    dispatch(requestEnd())

    try {
      const result = await submitRegister(email, password)
      const userData = setLocalUserData(result)
      return userData
    } catch (err) {
      dispatch(setApiError(err))
      throw parseAPIError(err)
    } finally {
      dispatch(requestStart())
    }
  }
}
