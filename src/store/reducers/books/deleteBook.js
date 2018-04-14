import { BOOKS } from '../../actionTypes';

import { sortByAuthorLastName } from './helpers';

const deleteBookReducer = (state, action) => {
  if (action.type !== BOOKS.DELETE_SUCCESS) {
    return state;
  }

  return {
    ...state,
    data: sortByAuthorLastName(
      state.data.filter((book) => book.id !== action.payload.book.id),
    ),
  };
};

export default deleteBookReducer;
