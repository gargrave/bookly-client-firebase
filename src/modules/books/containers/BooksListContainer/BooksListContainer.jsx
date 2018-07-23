// @flow
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { localUrls } from '../../../../globals/urls';

import { actions } from '../../actions';

import BooksListPage from '../../views/BooksListPage/BooksListPage';
import RequiresAuth from '../../../common/components/hocs/RequiresAuth/RequiresAuth';

const mapStateToProps = (state) => ({
  books: state.books.data,
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  RequiresAuth(BooksListPage, localUrls.login)
);
