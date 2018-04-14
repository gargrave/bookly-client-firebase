import { SNACKBAR } from '../../actionTypes';

const createSnackbarReducer = (state, action) => {
  if (action.type !== SNACKBAR.CREATE_SNACKBAR) {
    return state;
  }

  return {
    ...state,
    queue: [
      ...state.queue,
      {
        message: action.payload.message,
      },
    ],
  };
};

export default createSnackbarReducer;
