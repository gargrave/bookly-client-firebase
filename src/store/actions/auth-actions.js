import { AUTH } from '../action-types';
import axios from 'axios';

import { apiUrls } from '../../constants/urls';
import { parseError } from '../../globals/errors';
import apiHelper from '../../utils/apiHelper';

function _requestStart() {
  return { type: AUTH.REQUEST_START };
}

function _requestEnd() {
  return { type: AUTH.REQUEST_END };
}

function _login(user) {
  return { type: AUTH.LOGIN, payload: { user } };
}

function _logout() {
  return { type: AUTH.LOGOUT };
}

function _fetchProfile(profile) {
  return { type: AUTH.FETCH_PROFILE, payload: { profile } };
}

export function login(user) {
  return async (dispatch) => {
    console.error('TODO: update "login" request to use Firebase');
    dispatch(_requestStart());
    try {
      const request = apiHelper.axPost(apiUrls.login, user);
      const result = await axios(request);
      const userData = result.data;

      dispatch(_login(userData));
      dispatch(_fetchProfile(userData.profile));
      localStorage.setItem('authToken', userData.token);

      return userData;
    } catch (err) {
      throw parseError(err);
    } finally {
      dispatch(_requestEnd());
    }
  };
}

export function fetchProfile(authToken) {
  return async (dispatch) => {
    console.error('TODO: update "fetch profile" request to use Firebase');
    dispatch(_requestStart());
    try {
      const request = apiHelper.axGet(apiUrls.users, authToken);
      const result = await axios(request);
      const userData = result.data;
      userData.token = authToken;

      dispatch(_login(userData));
      dispatch(_fetchProfile(userData.profile));

      return userData;
    } catch (err) {
      throw parseError(err);
    } finally {
      dispatch(_requestEnd());
    }
  };
}

export function logout() {
  return async (dispatch) => {
    console.error('TODO: update "logout" request to use Firebase');
    localStorage.clear();
    dispatch(_logout());
  };
}
