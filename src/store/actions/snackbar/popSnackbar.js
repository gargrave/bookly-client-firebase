// @flow
import { SNACKBAR } from '../../actionTypes';

const popSnackbar = () =>
  async (dispatch: any) => {
    dispatch({ type: SNACKBAR.SNACKBAR_POP });
  };

export default popSnackbar;
