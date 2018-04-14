import { submitLogout } from '../../../wrappers/auth';

import { AUTH } from '../../actionTypes';

const _logout = () => ({ type: AUTH.LOGOUT });

const logout = () =>
  async (dispatch) => {
    await submitLogout();
    dispatch(_logout());
  };

export default logout;
