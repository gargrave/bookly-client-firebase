// @flow
import { SNACKBAR } from '../../actionTypes';

const popSnackbar = () =>
  async (dispatch: any) => {
    dispatch({ type: SNACKBAR.POP_SNACKBAR });
  };

export default popSnackbar;
