import { AUTH } from '../action-types';

import { parseError } from '../../globals/errors';
import { auth } from '../../globals/firebase';
import { userModel } from '../../models/User.model';

function _requestStart() {
  return {
    type: AUTH.REQUEST_START,
  };
}

function _requestEnd() {
  return {
    type: AUTH.REQUEST_END,
  };
}

function _login(user) {
  return {
    type: AUTH.LOGIN,
    payload: { user },
  };
}

function _logout() {
  return {
    type: AUTH.LOGOUT,
  };
}

function setLocalUserData(user) {
  return async(dispatch) => {
    const userData = userModel.fromAPI(user);
    dispatch(_login(userData));
    return userData;
  };
}

function login({ email, password }) {
  return async (dispatch) => {
    dispatch(_requestStart());
    try {
      const result = await auth.signInAndRetrieveDataWithEmailAndPassword(email, password);
      const userData = setLocalUserData(result);
      return userData;
    } catch (err) {
      // TODO: user Firebase's error structure:
      // https://firebase.google.com/docs/reference/js/firebase.auth.Auth.html?authuser=0#signInAndRetrieveDataWithEmailAndPassword
      console.log(err);
      throw parseError(err);
    } finally {
      dispatch(_requestEnd());
    }
  };
}

function logout() {
  return async (dispatch) => {
    console.error('TODO: update "logout" request to use Firebase');
    await auth.signOut();
    dispatch(_logout());
  };
}

export {
  login,
  logout,
  setLocalUserData,
};
