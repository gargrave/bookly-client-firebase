// @flow
import { connect } from 'react-redux';

import { localUrls } from '../../../../globals/urls';

import { actions } from '../../actions';

import BooksListPage from '../../views/BooksListPage/BooksListPage';
import RequiresAuth from '../../../common/components/hocs/RequiresAuth/RequiresAuth';

const { fetchBooks } = actions;

const mapStateToProps = (state) => ({
  books: state.books.data,
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  fetchBooks() {
    return dispatch(fetchBooks());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(
  RequiresAuth(BooksListPage, localUrls.login)
);
