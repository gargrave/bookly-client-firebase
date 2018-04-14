import { AUTHORS } from '../../actionTypes';

import { sortByLastName } from './helpers';

const deleteAuthorReducer = (state, action) => {
  if (action.type !== AUTHORS.DELETE_SUCCESS) {
    return state;
  }

  return {
    ...state,
    data: sortByLastName(
      state.data.filter((a) => a.id !== action.payload.author.id),
    ),
  };
};

export default deleteAuthorReducer;
