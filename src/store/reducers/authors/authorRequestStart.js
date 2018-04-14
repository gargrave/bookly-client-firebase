import { AUTHORS } from '../../actionTypes';

const authorRequestStartReducer = (state, action) => {
  if (action.type !== AUTHORS.REQUEST_START) {
    return state;
  }

  return {
    ...state,
    authorRequestPending: true,
  };
};

export default authorRequestStartReducer;
