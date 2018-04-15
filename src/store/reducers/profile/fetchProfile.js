import { PROFILE } from '../../actionTypes';

const fetchProfileReducer = (state, action) => {
  if (action.type !== PROFILE.FETCH_SUCCESS) {
    return state;
  }

  return {
    ...state,
    data: action.payload,
  };
};

export default fetchProfileReducer;
