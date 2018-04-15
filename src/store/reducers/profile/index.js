import { AUTH, PROFILE } from '../../actionTypes';

import { actionContainer } from '../helpers';

import defaultState from './defaultState';

import clearProfile from './clearProfile';
import fetchProfile from './fetchProfile';
import profileRequestEnd from './profileRequestEnd';
import profileRequestStart from './profileRequestStart';

const actions = {
  [AUTH.LOGOUT]: clearProfile,
  [PROFILE.FETCH_SUCCESS]: fetchProfile,
  [PROFILE.REQUEST_END]: profileRequestEnd,
  [PROFILE.REQUEST_START]: profileRequestStart,
};

export default actionContainer(defaultState, actions);
