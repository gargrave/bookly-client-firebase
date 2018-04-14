import { AUTHORS } from '../../actionTypes';

const setPreselectedAuthorReducer = (state, action) => {
  if (action.type !== AUTHORS.SET_PRESELECTED) {
    return state;
  }

  return {
    ...state,
    preselectedAuthor: action.payload.author,
  };
};

export default setPreselectedAuthorReducer;
