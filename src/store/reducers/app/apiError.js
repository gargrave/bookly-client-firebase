import { APP } from '../../actionTypes';

const apiErrorReducer = (state, action) => {
  if (action.type !== APP.API_ERROR) {
    return state;
  }

  return {
    ...state,
    apiError: {
      code: action.payload.err.code,
      message: action.payload.err.message,
      name: action.payload.err.name,
    },
  };
};

export default apiErrorReducer;
