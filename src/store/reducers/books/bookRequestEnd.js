import { BOOKS } from '../../actionTypes';

const bookRequestEndReducer = (state, action) => {
  if (action.type !== BOOKS.REQUEST_END) {
    return state;
  }

  return {
    ...state,
    bookRequestPending: false,
  };
};

export default bookRequestEndReducer;
