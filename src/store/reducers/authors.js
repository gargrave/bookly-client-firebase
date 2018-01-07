import { AUTH, AUTHORS } from '../actionTypes';

const defaultState = Object.freeze({
  authorRequestPending: false,
  data: [],
});

// TODO: implement better sort handling (including letting the user choose)
function sortByLastName(authors) {
  return authors.sort((a, b) => {
    return a.lastName.toLowerCase() > b.lastName.toLowerCase() ? 1 : -1;
  });
}

export default function authors(state = defaultState, action) {
  switch (action.type) {
    case AUTHORS.REQUEST_START:
      return {
        ...state,
        authorRequestPending: true,
      };

    case AUTHORS.REQUEST_END:
      return {
        ...state,
        authorRequestPending: false,
      };

    case AUTHORS.FETCH_SUCCESS:
      return {
        ...state,
        data: sortByLastName(action.payload.authors),
      };

    case AUTHORS.CREATE_SUCCESS:
      return {
        ...state,
        data: sortByLastName([
          ...state.data,
          action.payload.author,
        ]),
      };

    case AUTHORS.UPDATE_SUCCESS:
      return {
        ...state,
        data: sortByLastName([
          ...state.data.filter((a) => a.id !== action.payload.author.id),
          action.payload.author,
        ]),
      };

    case AUTHORS.DELETE_SUCCESS:
      return {
        ...state,
        data: sortByLastName(
          state.data.filter((a) => a.id !== action.payload.author.id),
        ),
      };

    // clear authors data on logout
    case AUTH.LOGOUT:
      return {
        ...defaultState,
      };

    default:
      return state;
  }
}
