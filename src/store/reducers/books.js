import { AUTH, BOOKS } from '../actionTypes';

const defaultState = {
  bookRequestPending: false,
  data: [],
};

// TODO: implement better sort handling (including letting the user choose)
function sortByAuthorLastName(books) {
  return books
    .sort((a, b) => {
      return a.title > b.title ? 1 : -1;
    })
    .sort((a, b) => {
      return a.author.lastName.toLowerCase() > b.author.lastName.toLowerCase() ? 1 : -1;
    });
}

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
        data: sortByAuthorLastName(action.payload.books),
      });

    case BOOKS.CREATE_SUCCESS:
      return Object.assign({}, state, {
        data: sortByAuthorLastName([
          ...state.data,
          action.payload.book,
        ]),
      });

    case BOOKS.UPDATE_SUCCESS:
      return Object.assign({}, state, {
        data: sortByAuthorLastName([
          ...state.data.filter((a) => a.id !== action.payload.book.id),
          action.payload.book,
        ]),
      });

    case BOOKS.DELETE_BY_AUTHOR_SUCCESS:
      return {
        ...state,
        data: state.data.filter(
          (book) => book.author.id !== action.payload.author.id
        ),
      };

    case AUTH.LOGOUT:
      return Object.assign({}, defaultState);

    default:
      return state;
  }
}
