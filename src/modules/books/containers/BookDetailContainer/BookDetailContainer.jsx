// @flow
import { connect } from 'react-redux';

import type { Book } from '../../flowtypes';

import { localUrls } from '../../../../globals/urls';
import { deleteBook, fetchBooks, updateBook } from '../../../../store/actions';
import { createSnackbar } from '../../../../store/actions';

import { bookModel } from '../../models';

import BookDetailPage from '../../views/BookDetailPage/BookDetailPage';
import RequiresAuth from '../../../common/components/hocs/RequiresAuth/RequiresAuth';

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
  createSnackbar(message: string) {
    return dispatch(createSnackbar(message));
  },

  deleteBook(book: Book) {
    return dispatch(deleteBook(book));
  },

  fetchBooks() {
    return dispatch(fetchBooks());
  },

  updateBook(book) {
    return dispatch(updateBook(book));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(
  RequiresAuth(BookDetailPage, localUrls.login)
);
