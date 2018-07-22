// @flow
import type { ReduxAction } from '../../common/flowtypes';
import type { Author } from '../flowtypes';

import types from './types';

export const setPreselectedAuthor = (author: Author) => ({
  type: types.SET_PRESELECTED,
  payload: { author },
});

export const setPreselectedAuthorReducer =
  (state: any, action: ReduxAction) => ({
    ...state,
    preselectedAuthor: action.payload.author,
  });

