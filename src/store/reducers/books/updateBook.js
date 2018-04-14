import { BOOKS } from '../../actionTypes';

import { sortByAuthorLastName } from './helpers';

const updateBookReducer = (state, action) => {
  if (action.type !== BOOKS.UPDATE_SUCCESS) {
    return state;
  }

  return {
    ...state,
    data: sortByAuthorLastName([
      ...state.data.filter((book) => book.id !== action.payload.book.id),
      action.payload.book,
    ]),
  };
};

export default updateBookReducer;
