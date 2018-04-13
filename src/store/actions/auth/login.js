import { parseFbError } from '../../../globals/errors';
import { auth } from '../../../globals/firebase';

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
      const result = await auth.signInAndRetrieveDataWithEmailAndPassword(email, password);
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
