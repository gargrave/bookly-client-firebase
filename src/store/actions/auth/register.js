import { submitRegister } from '../../../wrappers/auth';
import { parseAPIError } from '../../../wrappers/errors';

import apiError from '../app/apiError';

import authRequestEnd from './authRequestEnd';
import authRequestStart from './authRequestStart';
import setLocalUserData from './setLocalUserData';

const register = ({
  email,
  password,
}) => {
  return async (dispatch) => {
    dispatch(authRequestEnd());

    try {
      const result = await submitRegister(email, password);
      const userData = setLocalUserData(result);
      return userData;
    } catch (err) {
      dispatch(apiError(err));
      throw parseAPIError(err);
    } finally {
      dispatch(authRequestStart());
    }
  };
};

export default register;
