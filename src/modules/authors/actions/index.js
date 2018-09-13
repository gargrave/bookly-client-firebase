import { reducerContainer } from '../../../store/helpers'

import { clearAuthorsReducer } from './clearAuthors'
import {
  clearPreselectedAuthor,
  clearPreselectedAuthorReducer,
} from './clearPreselectedAuthor'
import { createAuthor, createAuthorReducer } from './createAuthor'
import { deleteAuthor, deleteAuthorReducer } from './deleteAuthor'
import { fetchAuthors, fetchAuthorsReducer } from './fetchAuthors'
import {
  setPreselectedAuthor,
  setPreselectedAuthorReducer,
} from './setPreselectedAuthor'
import { requestEndReducer } from './requestEnd'
import { requestStartReducer } from './requestStart'
import { updateAuthor, updateAuthorReducer } from './updateAuthor'

import authTypes from '../../auth/actions/types'
import types from './types'

const defaultState = () => ({
  authorsRequestPending: false,
  data: [],
})

export default reducerContainer(defaultState(), {
  [authTypes.LOGOUT]: clearAuthorsReducer,
  [types.CLEAR_PRESELECTED]: clearPreselectedAuthorReducer,
  [types.CREATE]: createAuthorReducer,
  [types.DELETE]: deleteAuthorReducer,
  [types.FETCH]: fetchAuthorsReducer,
  [types.SET_PRESELECTED]: setPreselectedAuthorReducer,
  [types.REQUEST_END]: requestEndReducer,
  [types.REQUEST_START]: requestStartReducer,
  [types.UPDATE]: updateAuthorReducer,
})

export const actions = {
  clearPreselectedAuthor,
  createAuthor,
  deleteAuthor,
  fetchAuthors,
  setPreselectedAuthor,
  updateAuthor,
}
