import { PROFILE } from '../../actionTypes';

const profileRequestStartReducer = (state, action) => {
  if (action.type !== PROFILE.REQUEST_START) {
    return state;
  }

  return {
    ...state,
    profileRequestPending: true,
  };
};

export default profileRequestStartReducer;
