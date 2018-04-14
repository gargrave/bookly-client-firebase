import { AUTHORS } from '../../actionTypes';

const clearPreselectedAuthorReducer = (state, action) => {
  if (action.type !== AUTHORS.CLEAR_PRESELECTED) {
    return state;
  }

  return {
    ...state,
    preselectedAuthor: null,
  };
};

export default clearPreselectedAuthorReducer;
