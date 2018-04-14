import { SNACKBAR } from '../../actionTypes';

const popSnackbarReducer = (state, action) => {
  if (action.type !== SNACKBAR.POP_SNACKBAR) {
    return state;
  }

  return {
    ...state,
    queue: state.queue.slice(1),
  };
};

export default popSnackbarReducer;
