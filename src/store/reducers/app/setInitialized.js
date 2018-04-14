import { APP } from '../../actionTypes';

const setInitializedReducer = (state, action) => {
  if (action.type !== APP.INITIALIZED) {
    return state;
  }

  return {
    ...state,
    initialized: true,
  };
};

export default setInitializedReducer;
