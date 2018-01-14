import { SETTINGS } from '../actionTypes';

function _toggleGroupBooksByAuthor() {
  return {
    type: SETTINGS.GROUP_BOOKS_BY_AUTHOR,
  };
}

function toggleGroupBooksByAuthor() {
  return async (dispatch) => {
    dispatch(_toggleGroupBooksByAuthor());
  };
}

export {
  toggleGroupBooksByAuthor,
};
