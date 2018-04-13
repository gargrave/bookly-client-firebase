import { userModel } from '../../../models/User.model';

import { AUTH } from '../../actionTypes';

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
