import { auth } from '../../../globals/firebase';

import { AUTH } from '../../actionTypes';

const _logout = () => ({ type: AUTH.LOGOUT });

const logout = () =>
  async (dispatch) => {
    await auth.signOut();
    dispatch(_logout());
  };

export default logout;
