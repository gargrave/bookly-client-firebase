import { AUTH, PROFILE } from '../../actionTypes';

import { actionContainer } from '../helpers';

import defaultState from './defaultState';

import clearProfile from './clearProfile';
import fetchProfile from './fetchProfile';
import profileRequestEnd from './profileRequestEnd';
import profileRequestStart from './profileRequestStart';
import updateProfile from './updateProfile';

const actions = {
  [AUTH.LOGOUT]: clearProfile,
  [PROFILE.FETCH_SUCCESS]: fetchProfile,
  [PROFILE.UPDATE_SUCCESS]: updateProfile,
  [PROFILE.REQUEST_END]: profileRequestEnd,
  [PROFILE.REQUEST_START]: profileRequestStart,
};

export default actionContainer(defaultState, actions);
