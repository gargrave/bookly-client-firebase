import { AUTH } from '../../actionTypes';

import { auth } from '../../../globals/firebase';

const _logout = () => ({ type: AUTH.LOGOUT });

const logout = () =>
  async (dispatch) => {
    await auth.signOut();
    dispatch(_logout());
  };

export default logout;
