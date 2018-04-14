import { AUTHORS } from '../../actionTypes';

import { sortByLastName } from './helpers';

const updateAuthorReducer = (state, action) => {
  if (action.type !== AUTHORS.UPDATE_SUCCESS) {
    return state;
  }

  return {
    ...state,
    data: sortByLastName([
      ...state.data.filter((a) => a.id !== action.payload.author.id),
      action.payload.author,
    ]),
  };
};

export default updateAuthorReducer;
