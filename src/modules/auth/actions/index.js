import { reducerContainer } from '../../../store/helpers'

import { login, loginReducer } from './login'
import { logout, logoutReducer } from './logout'
import {
  markPasswordResetEmailSent,
  markPasswordResetEmailSentReducer,
} from './markPasswordResetEmailSent'
import {
  markVerificationEmailSent,
  markVerificationEmailSentReducer,
} from './markVerificationEmailSent'
import { register } from './register'
import { requestEndReducer } from './requestEnd'
import { requestStartReducer } from './requestStart'
import { setLocalUserData } from './setLocalUserData'

import types from './types'

const defaultState = () => ({
  authRequestPending: false,
  user: null,
  verificationEmailSent: false,
})

export default reducerContainer(defaultState(), {
  [types.LOGIN]: loginReducer,
  [types.LOGOUT]: logoutReducer,
  [types.PASSWORD_RESET_EMAIL_SENT]: markPasswordResetEmailSentReducer,
  [types.REQUEST_END]: requestEndReducer,
  [types.REQUEST_START]: requestStartReducer,
  [types.VERIFICATION_EMAIL_SENT]: markVerificationEmailSentReducer,
})

export const actions = {
  login,
  logout,
  markPasswordResetEmailSent,
  markVerificationEmailSent,
  register,
  setLocalUserData,
}
