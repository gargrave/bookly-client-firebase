// @flow
import { connect } from 'react-redux';

import { localUrls } from '../../../../globals/urls';

import { actions } from '../../actions';
import { actions as authorActions } from '../../../authors/actions';

import BookCreatePage from '../../views/BookCreatePage/BookCreatePage';
import RequiresAuth from '../../../common/components/hocs/RequiresAuth/RequiresAuth';

const { createBook, fetchBooks } = actions;
const { clearPreselectedAuthor, fetchAuthors } = authorActions;

const mapStateToProps = (state) => {
  return {
    authors: state.authors.data,
    preselectedAuthor: state.authors.preselectedAuthor,
  };
};

const mapDispatchToProps = (dispatch) => ({
  clearPreselectedAuthor() {
    return dispatch(clearPreselectedAuthor());
  },

  createBook(book) {
    return dispatch(createBook(book));
  },

  fetchAuthors() {
    return dispatch(fetchAuthors());
  },

  fetchBooks() {
    return dispatch(fetchBooks());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(
  RequiresAuth(BookCreatePage, localUrls.login)
);
