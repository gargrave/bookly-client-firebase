import { AUTH, BOOKS } from '../action-types';

import bookModel from '../../models/Book.model';

const defaultState = {
  bookRequestPending: false,
  data: [],
};

export default function books(state = defaultState, action) {
  switch (action.type) {
    case BOOKS.REQUEST_START:
      return Object.assign({}, state, {
        bookRequestPending: true,
      });

    case BOOKS.REQUEST_END:
      return Object.assign({}, state, {
        bookRequestPending: false,
      });

    case BOOKS.FETCH_SUCCESS:
      return Object.assign({}, state, {
        data: action.payload.books.map((book) => bookModel.fromAPI(book)),
      });

    case BOOKS.CREATE_SUCCESS:
      return Object.assign({}, state, {
        data: [...state.data, bookModel.fromAPI(action.payload.book)],
      });

    case BOOKS.UPDATE_SUCCESS:
      return Object.assign({}, state, {
        data: [...state.data.filter((a) => a.id !== action.payload.book.id), bookModel.fromAPI(action.payload.book)],
      });

    case AUTH.LOGOUT:
      return Object.assign({}, defaultState);

    default:
      return state;
  }
}
