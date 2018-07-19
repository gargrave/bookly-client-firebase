// @flow
import { connect } from 'react-redux';

import type { Author } from '../../flowtypes';
import type { Book } from '../../../books/flowtypes';

import { localUrls } from '../../../../globals/urls';
import { createSnackbar } from '../../../../store/actions';

import {
  deleteAuthor,
  fetchAuthors,
  setPreselectedAuthor,
  updateAuthor,
} from '../../../../store/actions';

import AuthorDetailPage from '../../components/AuthorDetailPage/AuthorDetailPage';
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
  createSnackbar(message: string) {
    return dispatch(createSnackbar(message));
  },

  deleteAuthor(author: Author) {
    return dispatch(deleteAuthor(author));
  },

  fetchAuthors() {
    return dispatch(fetchAuthors());
  },

  setPreselectedAuthor(author: Author) {
    return dispatch(setPreselectedAuthor(author));
  },

  updateAuthor(author) {
    return dispatch(updateAuthor(author));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(
  RequiresAuth(AuthorDetailPage, localUrls.login)
);
