import { AUTH } from '../../actionTypes';

const loginReducer = (state, action) => {
  if (action.type !== AUTH.LOGIN) {
    return state;
  }

  return {
    ...state,
    user: action.payload.user,
  };
};

export default loginReducer;
