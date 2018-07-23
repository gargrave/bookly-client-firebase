// @flow
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import type { Book } from '../../../books/flowtypes';

import { localUrls } from '../../../../globals/urls';

import { actions } from '../../actions';
import { actions as snackbarActions } from '../../../snackbar/actions';

import AuthorDetailPage from '../../views/AuthorDetailPage/AuthorDetailPage';
import RequiresAuth from '../../../common/components/hocs/RequiresAuth/RequiresAuth';

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
  RequiresAuth(AuthorDetailPage, localUrls.login)
);
