import { APP } from '../actionTypes';

const defaultState = Object.freeze({
  initialized: false,
  apiError: null,
});

export default function app(state = defaultState, action) {
  switch (action.type) {
    case APP.INITIALIZED:
      return {
        ...state,
        initialized: true,
      };

    case APP.API_ERROR:
      return {
        ...state,
        apiError: {
          code: action.payload.err.code,
          message: action.payload.err.message,
          name: action.payload.err.name,
        },
      };

    default:
      return state;
  }
}
