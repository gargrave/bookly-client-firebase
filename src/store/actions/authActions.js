import { AUTH } from '../actionTypes';

import { parseFbError } from '../../globals/errors';
import { auth } from '../../globals/firebase';
import { userModel } from '../../models/User.model';
import { apiErrorAction } from '../../utils/apiHelpers';

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
      dispatch(apiErrorAction(err));
      throw parseFbError(err);
    } finally {
      dispatch(_requestEnd());
    }
  };
}

function logout() {
  return async (dispatch) => {
    await auth.signOut();
    dispatch(_logout());
  };
}

export {
  login,
  logout,
  setLocalUserData,
};
