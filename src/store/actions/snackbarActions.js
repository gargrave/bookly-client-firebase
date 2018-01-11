// @flow
import { SNACKBAR } from '../actionTypes';

function _createSnackbar(message: string) {
  return {
    type: SNACKBAR.SNACKBAR_CREATE,
    payload: {
      message,
    },
  };
}

function _snackbarPop() {
  return {
    type: SNACKBAR.SNACKBAR_POP,
  };
}

function createSnackbar(message: string) {
  return async (dispatch: any) => {
    dispatch(_createSnackbar(message));
  };
}

function snackbarPop() {
  return async (dispatch: any) => {
    dispatch(_snackbarPop());
  };
}

export {
  createSnackbar,
  snackbarPop,
};
