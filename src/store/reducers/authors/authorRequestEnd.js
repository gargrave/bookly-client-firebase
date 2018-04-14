import { AUTHORS } from '../../actionTypes';

const authorRequestEndReducer = (state, action) => {
  if (action.type !== AUTHORS.REQUEST_END) {
    return state;
  }

  return {
    ...state,
    authorRequestPending: false,
  };
};

export default authorRequestEndReducer;
