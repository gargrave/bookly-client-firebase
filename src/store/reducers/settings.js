import { SETTINGS } from '../actionTypes';

const defaultState = Object.freeze({
  view: {
    groupBooksByAuthor: false,
  },
});

export default function app(state = defaultState, action) {
  switch (action.type) {
    case SETTINGS.GROUP_BOOKS_BY_AUTHOR:
      return {
        ...state,
        view: {
          groupBooksByAuthor: !(state.view.groupBooksByAuthor),
        },
      };

    default:
      return state;
  }
}
