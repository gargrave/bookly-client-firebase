import { AUTH } from '../../actionTypes';

import defaultState from './defaultState';

const clearProfileReducer = (state, action) => {
  if (action.type !== AUTH.LOGOUT) {
    return state;
  }

  return { ...defaultState };
};

export default clearProfileReducer;
