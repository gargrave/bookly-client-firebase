import { BOOKS } from '../../actionTypes';

const deleteBookReducer = (state, action) => {
  if (action.type !== BOOKS.DELETE_BY_AUTHOR_SUCCESS) {
    return state;
  }

  return {
    ...state,
    data: state.data.filter(
      (book) => book.author.id !== action.payload.author.id
    ),
  };
};

export default deleteBookReducer;
