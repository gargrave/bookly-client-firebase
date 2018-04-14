import { AUTH } from '../../actionTypes';

import defaultState from './defaultState';

const clearPreselectedAuthorReducer = (state, action) => {
  if (action.type !== AUTH.LOGOUT) {
    return state;
  }

  return { ...defaultState };
};

export default clearPreselectedAuthorReducer;
