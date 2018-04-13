import { SNACKBAR } from '../actionTypes';

const defaultState = Object.freeze({
  queue: [],
});

export default function snackbar(state = defaultState, action) {
  switch (action.type) {
    case SNACKBAR.CREATE_SNACKBAR:
      return {
        ...state,
        queue: [
          ...state.queue,
          {
            message: action.payload.message,
          },
        ],
      };

    case SNACKBAR.POP_SNACKBAR:
      return {
        ...state,
        queue: state.queue.slice(1),
      };

    default:
      return state;
  }
}
