import { BOOKS } from '../../actionTypes';

import { sortByAuthorLastName } from './helpers';

const createBookReducer = (state, action) => {
  if (action.type !== BOOKS.CREATE_SUCCESS) {
    return state;
  }

  return {
    ...state,
    data: sortByAuthorLastName([
      ...state.data,
      action.payload.book,
    ]),
  };
};

export default createBookReducer;
