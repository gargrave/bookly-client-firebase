// @flow
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import type { Book } from '../../../books/flowtypes';

import { localUrls } from '../../../../globals/urls';

import { actions } from '../../actions';
import { actions as snackbarActions } from '../../../snackbar/actions';

import AuthorDetailPage from '../../views/AuthorDetailPage/AuthorDetailPage';
import AuthenticatedRoute from '../../../common/components/hocs/AuthenticatedRoute/AuthenticatedRoute';

const mapStateToProps = (state: any, ownProps: any) => {
  const authorId = ownProps.match.params.id;
  const author = state.authors.data.find(
    (a) => a.id === authorId
  ) || {};

  const booksForAuthor = state.books.data
    .filter((book: Book) => book.author.id === authorId);

  return {
    author,
    authorId,
    booksForAuthor,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(actions, dispatch),
  snackbarActions: bindActionCreators(snackbarActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  AuthenticatedRoute(AuthorDetailPage, localUrls.login)
);
