// @flow
import type { ReduxAction } from '../../common/flowtypes'

import types from './types'

export const markPasswordResetEmailSent = (email: string) => ({
  type: types.PASSWORD_RESET_EMAIL_SENT,
  payload: { email },
})

export const markPasswordResetEmailSentReducer = (
  state: any,
  action: ReduxAction,
) => ({
  ...state,
  passwordResetEmailSentTo: action.payload.email,
})
