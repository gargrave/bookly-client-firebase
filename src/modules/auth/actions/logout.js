// @flow
import { submitLogout } from '../../../wrappers/auth'

import types from './types'

const _logout = () => ({
  type: types.LOGOUT,
})

export const logout = () => async (dispatch: Function) => {
  await submitLogout()
  dispatch(_logout())
}

export const logoutReducer = (state: any) => ({
  ...state,
  user: null,
})
