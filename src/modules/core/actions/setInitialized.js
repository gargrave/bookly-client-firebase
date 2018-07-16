// @flow
import types from './types';

export const setInitialized = () =>
  (dispatch: any) => dispatch({
    type: types.INITIALIZED,
  });

export const setInitializedReducer =
  (state: any) => ({
    ...state,
    initialized: true,
  });
