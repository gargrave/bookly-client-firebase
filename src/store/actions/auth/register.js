import { submitRegister } from '../../../modules/auth';

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
      throw parseFbError(err);
    } finally {
      dispatch(authRequestStart());
    }
  };
};

export default register;
