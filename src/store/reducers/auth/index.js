import { AUTH } from '../../actionTypes';

import { actionContainer } from '../helpers';

import defaultState from './defaultState';

import login from './login';
import logout from './logout';
import authRequestEnd from './authRequestEnd';
import authRequestStart from './authRequestStart';

const actions = {
  [AUTH.LOGIN]: login,
  [AUTH.LOGOUT]: logout,
  [AUTH.REQUEST_END]: authRequestEnd,
  [AUTH.REQUEST_START]: authRequestStart,
};

export default actionContainer(defaultState, actions);
