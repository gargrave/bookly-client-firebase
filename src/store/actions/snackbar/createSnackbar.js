// @flow
import { SNACKBAR } from '../../actionTypes';

const _createSnackbar = (message: string) => ({
  type: SNACKBAR.SNACKBAR_CREATE,
  payload: { message },
});

const createSnackbar = (message: string) =>
  async (dispatch: any) => {
    dispatch(_createSnackbar(message));
  };

export default createSnackbar;
