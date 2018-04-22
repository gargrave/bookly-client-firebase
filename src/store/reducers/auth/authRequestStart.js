import { AUTH } from '../../actionTypes';

const authRequestStartReducer = (state, action) => {
  if (action.type !== AUTH.REQUEST_START) {
    return state;
  }

  return {
    ...state,
    authRequestPending: true,
  };
};

export default authRequestStartReducer;
