import { PROFILE } from '../../actionTypes';

const profileRequestEndReducer = (state, action) => {
  if (action.type !== PROFILE.REQUEST_END) {
    return state;
  }

  return {
    ...state,
    profileRequestPending: false,
  };
};

export default profileRequestEndReducer;
