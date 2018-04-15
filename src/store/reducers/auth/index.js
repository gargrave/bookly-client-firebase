import { AUTH } from '../../actionTypes';

import { actionContainer } from '../helpers';

import defaultState from './defaultState';

import authRequestEnd from './authRequestEnd';
import authRequestStart from './authRequestStart';
import login from './login';
import logout from './logout';
import markVerificationEmailSent from './markVerificationEmailSent';

const actions = {
  [AUTH.LOGIN]: login,
  [AUTH.LOGOUT]: logout,
  [AUTH.REQUEST_END]: authRequestEnd,
  [AUTH.REQUEST_START]: authRequestStart,
  [AUTH.VERIFICATION_EMAIL_SENT]: markVerificationEmailSent,
};

export default actionContainer(defaultState, actions);
