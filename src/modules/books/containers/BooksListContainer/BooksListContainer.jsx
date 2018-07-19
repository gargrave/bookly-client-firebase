// @flow
import { connect } from 'react-redux';

import { localUrls } from '../../../../globals/urls';
import { fetchBooks } from '../../../../store/actions';

import BooksListPage from '../../components/BooksListPage/BooksListPage';
import RequiresAuth from '../../../common/components/hocs/RequiresAuth/RequiresAuth';

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
