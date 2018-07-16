import { reducerContainer } from '../../../store/helpers';

import { createBook, createBookReducer } from './createBook';
import { requestEndReducer } from './requestEnd';
import { requestStartReducer } from './requestStart';

import types from './types';

const defaultState = () => ({
  booksRequestPending: false,
  data: [],
});

export default reducerContainer(
  defaultState(),
  {
    [types.CREATE]: createBookReducer,
    [types.REQUEST_END]: requestEndReducer,
    [types.REQUEST_START]: requestStartReducer,
  }
);

export const actions = {
  createBook,
};
