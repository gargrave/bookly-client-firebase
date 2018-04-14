import { BOOKS } from '../../actionTypes';

import { sortByAuthorLastName } from './helpers';

const fetchBooksReducer = (state, action) => {
  if (action.type !== BOOKS.FETCH_SUCCESS) {
    return state;
  }

  return {
    ...state,
    data: sortByAuthorLastName(action.payload.books),
  };
};

export default fetchBooksReducer;
