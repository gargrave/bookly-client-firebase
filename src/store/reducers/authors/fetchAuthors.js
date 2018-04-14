import { AUTHORS } from '../../actionTypes';

import { sortByLastName } from './helpers';

const fetchAuthorsReducer = (state, action) => {
  if (action.type !== AUTHORS.FETCH_SUCCESS) {
    return state;
  }

  return {
    ...state,
    data: sortByLastName(action.payload.authors),
  };
};

export default fetchAuthorsReducer;
