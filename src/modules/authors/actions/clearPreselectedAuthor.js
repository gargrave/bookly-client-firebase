// @flow
import types from './types';

export const clearPreselectedAuthor = () => ({
  type: types.CLEAR_PRESELECTED,
});

export const clearPreselectedAuthorReducer =
  (state: any) => ({
    ...state,
    preselectedAuthor: null,
  });
