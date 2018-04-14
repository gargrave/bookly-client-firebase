import { AUTHORS } from '../../actionTypes';

import { sortByLastName } from './helpers';

const createAuthorReducer = (state, action) => {
  if (action.type !== AUTHORS.CREATE_SUCCESS) {
    return state;
  }

  return {
    ...state,
    data: sortByLastName([
      ...state.data,
      action.payload.author,
    ]),
  };
};

export default createAuthorReducer;
