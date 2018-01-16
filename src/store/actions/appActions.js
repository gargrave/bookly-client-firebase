import { APP } from '../actionTypes';

function _setInitialized() {
  return {
    type: APP.INITIALIZED,
  };
}

export function setInitialized() {
  return async (dispatch) => {
    dispatch(_setInitialized());
  };
}
