import { AUTH } from '../../actionTypes';

const logoutReducer = (state, action) => {
  if (action.type !== AUTH.LOGOUT) {
    return state;
  }

  return {
    ...state,
    user: null,
  };
};

export default logoutReducer;
