import { SNACKBAR } from '../actionTypes';

const defaultState = Object.freeze({
  queue: [],
});

export default function snackbar(state = defaultState, action) {
  switch (action.type) {
    case SNACKBAR.SNACKBAR_CREATE:
      return {
        ...state,
        queue: [
          ...state.queue,
          {
            message: action.payload.message,
          },
        ],
      };

    case SNACKBAR.SNACKBAR_POP:
      return {
        ...state,
        queue: state.queue.slice(1),
      };

    default:
      return state;
  }
}
