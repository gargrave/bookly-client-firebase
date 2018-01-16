// @flow
import { SNACKBAR } from '../actionTypes';

function _snackbarCreate(message: string) {
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

function snackbarCreate(message: string) {
  return async (dispatch: any) => {
    dispatch(_snackbarCreate(message));
  };
}

function snackbarPop() {
  return async (dispatch: any) => {
    dispatch(_snackbarPop());
  };
}

export {
  snackbarCreate,
  snackbarPop,
};
