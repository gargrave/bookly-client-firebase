import { PROFILE } from '../../actionTypes';

const updateProfileReducer = (state, action) => {
  if (action.type !== PROFILE.UPDATE_SUCCESS) {
    return state;
  }

  return {
    ...state,
    data: action.payload.profile,
  };
};

export default updateProfileReducer;
