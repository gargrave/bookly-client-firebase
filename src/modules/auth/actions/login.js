// @flow
import type { ReduxAction } from '../../common/flowtypes';

import { submitLogin } from '../../../wrappers/auth';
import { parseAPIError } from '../../../wrappers/errors';

import { setApiError } from '../../core/actions/setApiError';

import { requestEnd } from './requestEnd';
import { requestStart } from './requestStart';
import { setLocalUserData } from './setLocalUserData';

type LoginProps = {
  email: string,
  password: string,
};

export const login = ({
  email,
  password,
}: LoginProps) =>
  async (dispatch: Function) => {
    dispatch(requestStart());

    try {
      const result = await submitLogin(email, password);
      const userData = setLocalUserData(result);
      return userData;
    } catch (err) {
      dispatch(setApiError(err));
      throw parseAPIError(err);
    } finally {
      dispatch(requestEnd());
    }
  };


export const loginReducer =
  (state: any, action: ReduxAction) => ({
    ...state,
    user: action.payload.user,
  });
