// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { array, func, object, shape, string } from 'prop-types';

import type { Author } from '../../../../modules/authors/flowtypes';
import type { Book, BookErrors } from '../../../../modules/books/flowtypes';

import { localUrls } from '../../../../globals/urls';
import { bookHasAllFields, booksMatch, validateBook } from '../../../../modules/books/validators';
import { bookModel } from '../../../../modules/books/models';
import { deleteBook, fetchBooks, updateBook } from '../../../../store/actions';
import { createSnackbar } from '../../../../store/actions';

import Alert from '../../../../modules/common/components/Alert/Alert';
import BookDetailView from '../../../bookly/books/BookDetailView';
import BookEditView from '../../../bookly/books/BookEditView';
import CardList from '../../../common/CardList';
import Modal from '../../../../modules/common/components/Modal/Modal';
import RequiresAuth from '../../../common/hocs/RequiresAuth';

type Props = {
  authors: Author[],
  book: Book,
  bookId: string,
  createSnackbar: Function,
  deleteBook: Function,
  fetchBooks: Function,
  history: Object,
  updateBook: Function,
};

type State = {
  deleteDialogShowing: boolean,
  editableBook: Book,
  editing: boolean,
  errors: BookErrors,
  formDisabled: boolean,
  submitDisabled: boolean,
  topLevelError: string,
};

class BookDetailPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      deleteDialogShowing: false,
      editableBook: bookModel.empty(),
      editing: false,
      errors: bookModel.emptyErrors(),
      formDisabled: true,
      submitDisabled: false,
      topLevelError: '',
    };

    const _this: any = this;
    _this.hideDeleteDialog = _this.hideDeleteDialog.bind(this);
    _this.onAuthorChange = _this.onAuthorChange.bind(this);
    _this.onBackClick = _this.onBackClick.bind(this);
    _this.onCancel = _this.onCancel.bind(this);
    _this.onDeleteDialogConfirm = _this.onDeleteDialogConfirm.bind(this);
    _this.onEditClick = _this.onEditClick.bind(this);
    _this.onInputChange = _this.onInputChange.bind(this);
    _this.onSubmit = _this.onSubmit.bind(this);
    _this.showDeleteDialog = _this.showDeleteDialog.bind(this);
  }

  componentDidMount() {
    this.refreshBooks();
  }

  async refreshBooks() {
    try {
      await this.props.fetchBooks();
      this.setState({
        formDisabled: false,
      });
    } catch (err) {
      this.setState({
        formDisabled: false,
        topLevelError: err,
      });
    }
  }

  onAuthorChange(event) {
    const authorId = event.target.value;
    const author = this.props.authors.find((a) => a.id === authorId);
    const editableBook = {
      ...this.state.editableBook,
      author,
    };
    const submitDisabled =
      !bookHasAllFields(editableBook) ||
      booksMatch(this.props.book, editableBook);

    if (author) {
      this.setState({
        editableBook,
        submitDisabled,
      });
    }
  }

  onInputChange(event) {
    const key = event.target.name;
    if (key in this.state.editableBook) {
      let editableBook = { ...this.state.editableBook};
      editableBook[key] = event.target.value;
      const submitDisabled =
        !bookHasAllFields(editableBook) ||
        booksMatch(this.props.book, editableBook);

      this.setState({
        editableBook,
        submitDisabled,
      });
    }
  }

  async onSubmit(event) {
    event.preventDefault();
    const errors = validateBook(this.state.editableBook);
    if (errors.found) {
      this.setState({
        errors,
      });
    } else {
      this.setState({
        errors: bookModel.emptyErrors(),
        formDisabled: true,
        topLevelError: '',
      }, async () => {
        try {
          const book = bookModel.toAPI({
              ...this.props.book,
              ...this.state.editableBook,
          });

          await this.props.updateBook(book);
          this.setState({
            editing: false,
            formDisabled: false,
          });
        } catch (err) {
          this.setState({
            formDisabled: false,
            topLevelError: err,
          });
        }
      });
    }
  }

  /**
   * Enables 'editing' state and sets the editable book's value
   * to the current book from the store.
   */
  onEditClick() {
    const {
      book,
    } = this.props;

    this.setState({
      editing: true,
      editableBook: bookModel.editable(book),
      submitDisabled: true,
    });
  }

  /**
   * Disables 'editing' state.
   */
  onCancel(event) {
    event.preventDefault();
    this.setState({ editing: false });
  }

  onBackClick() {
    this.props.history.push(localUrls.booksList);
  }

  showDeleteDialog() {
    this.setState({
      deleteDialogShowing: true,
    });
  }

  hideDeleteDialog() {
    this.setState({
      deleteDialogShowing: false,
    });
  }

  async onDeleteDialogConfirm() {
    this.setState({
      topLevelError: '',
    }, async () => {
      try {
        await this.props.deleteBook(this.props.book);
        this.props.createSnackbar('Book successfully deleted.');
        this.props.history.push(localUrls.booksList);
      } catch (err) {
        this.setState({
          deleteDialogShowing: false,
          topLevelError: err,
        });
      }
    });
  }

  render() {
    const {
      authors,
      book,
      bookId,
    } = this.props;
    const {
      deleteDialogShowing,
      editableBook,
      editing,
      errors,
      formDisabled,
      submitDisabled,
      topLevelError,
    } = this.state;

    return (
      <CardList>
        {!book.id &&
          <Alert
            message={`No book found with id: ${bookId}`}
            type={'info'}
          />
        }
        {book.id && !editing && (
          <BookDetailView
            book={book}
            onBackClick={this.onBackClick}
            onDeleteClick={this.showDeleteDialog}
            onEditClick={this.onEditClick}
            topLevelError={topLevelError}
          />
        )}
        {book.id && editing && (
          <BookEditView
            authors={authors}
            book={editableBook}
            disabled={formDisabled}
            errors={errors}
            onAuthorChange={this.onAuthorChange}
            onCancel={this.onCancel}
            onInputChange={this.onInputChange}
            onSubmit={this.onSubmit}
            submitDisabled={submitDisabled}
            topLevelError={topLevelError}
          />
        )}
        {deleteDialogShowing &&
          <Modal
            message={'Are you sure you want to delete this book?'}
            onCancel={this.hideDeleteDialog}
            onConfirm={this.onDeleteDialogConfirm}
            title="Confirm Deletion"
          />
        }
      </CardList>
    );
  }
}

BookDetailPage.propTypes = {
  authors: array.isRequired,
  book: shape({
    author: object,
    title: string,
  }).isRequired,
  bookId: string,
  createSnackbar: func.isRequired,
  deleteBook: func.isRequired,
  fetchBooks: func.isRequired,
  history: object,
  updateBook: func.isRequired,
};

/* eslint-disable no-unused-vars */
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

const mapDispatchToProps = (dispatch, ownProps) => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(RequiresAuth(BookDetailPage, localUrls.login));
