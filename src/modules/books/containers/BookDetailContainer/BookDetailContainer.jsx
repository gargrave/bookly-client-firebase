// @flow
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { localUrls } from '../../../../globals/urls';
import { bookModel } from '../../models';

import { actions } from '../../actions';
import { actions as snackbarActions } from '../../../snackbar/actions';

import BookDetailPage from '../../views/BookDetailPage/BookDetailPage';
import AuthenticatedRoute from '../../../common/components/hocs/AuthenticatedRoute/AuthenticatedRoute';

const mapStateToProps = (state, ownProps) => {
  const bookId = ownProps.match.params.id;
  const book = state.books.data.find(
    (a) => a.id === bookId
  ) || bookModel.empty();

  return {
    authors: state.authors.data,
    book,
    bookId,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
  snackbarActions: bindActionCreators(snackbarActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  AuthenticatedRoute(BookDetailPage, localUrls.login)
);
