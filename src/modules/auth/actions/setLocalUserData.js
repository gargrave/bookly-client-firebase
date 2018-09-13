import { userModel } from '../models'

import types from './types'

const login = user => ({
  type: types.LOGIN,
  payload: { user },
})

export const setLocalUserData = user => async dispatch => {
  const userData = userModel.fromAPI(user)
  dispatch(login(userData))
  return userData
}
