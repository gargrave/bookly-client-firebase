import { AUTH } from '../../actionTypes';

const authRequestEndReducer = (state, action) => {
  if (action.type !== AUTH.REQUEST_END) {
    return state;
  }

  return {
    ...state,
    userRequestPending: false,
  };
};

export default authRequestEndReducer;
