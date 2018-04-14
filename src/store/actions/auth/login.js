import { parseFbError } from '../../../globals/errors';
import { submitLogin } from '../../../modules/auth';

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
      throw parseFbError(err);
    } finally {
      dispatch(authRequestEnd());
    }
  };


export default login;
