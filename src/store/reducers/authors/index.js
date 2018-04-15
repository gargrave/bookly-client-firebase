import { AUTH, AUTHORS } from '../../actionTypes';

import { actionContainer } from '../helpers';

import defaultState from './defaultState';

import authorRequestEnd from './authorRequestEnd';
import authorRequestStart from './authorRequestStart';
import clearAuthors from './clearAuthors';
import clearPreselected from './clearPreselected';
import createAuthor from './createAuthor';
import deleteAuthor from './deleteAuthor';
import fetchAuthors from './fetchAuthors';
import setPreselected from './setPreselected';
import updateAuthor from './updateAuthor';

const actions = {
  [AUTH.LOGOUT]: clearAuthors,
  [AUTHORS.CLEAR_PRESELECTED]: clearPreselected,
  [AUTHORS.CREATE_SUCCESS]: createAuthor,
  [AUTHORS.DELETE_SUCCESS]: deleteAuthor,
  [AUTHORS.FETCH_SUCCESS]: fetchAuthors,
  [AUTHORS.REQUEST_END]: authorRequestEnd,
  [AUTHORS.REQUEST_START]: authorRequestStart,
  [AUTHORS.SET_PRESELECTED]: setPreselected,
  [AUTHORS.UPDATE_SUCCESS]: updateAuthor,
};

export default actionContainer(defaultState, actions);
