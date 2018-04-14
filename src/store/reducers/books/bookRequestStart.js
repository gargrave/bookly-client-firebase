import { BOOKS } from '../../actionTypes';

const bookRequestStartReducer = (state, action) => {
  if (action.type !== BOOKS.REQUEST_START) {
    return state;
  }

  return {
    ...state,
    bookRequestPending: true,
  };
};

export default bookRequestStartReducer;
