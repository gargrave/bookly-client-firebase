import { AUTH } from '../../actionTypes';

import { userModel } from '../../../models/User.model';

const login = (user) => ({
  type: AUTH.LOGIN,
  payload: { user },
});

const setLocalUserData = (user) =>
  async (dispatch) => {
    const userData = userModel.fromAPI(user);
    dispatch(login(userData));
    return userData;
  };

export default setLocalUserData;
