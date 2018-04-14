import { submitLogin } from '../../../wrappers/auth';
import { parseAPIError } from '../../../wrappers/errors';

import apiError from '../app/apiError';

import authRequestEnd from './authRequestEnd';
import authRequestStart from './authRequestStart';
import setLocalUserData from './setLocalUserData';

const login = ({
  email,
  password,
}) =>
  async (dispatch) => {
    dispatch(authRequestStart());

    try {
      const result = await submitLogin(email, password);
      const userData = setLocalUserData(result);
      return userData;
    } catch (err) {
      dispatch(apiError(err));
      throw parseAPIError(err);
    } finally {
      dispatch(authRequestEnd());
    }
  };


export default login;
