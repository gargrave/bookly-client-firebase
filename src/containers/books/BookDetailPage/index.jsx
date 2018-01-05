// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { array, func, object, shape, string } from 'prop-types';

import type { Author, Book, BookErrors } from '../../../constants/flowtypes';

import { localUrls } from '../../../constants/urls';
import { parseError } from '../../../globals/errors';
import { bookHasAllFields, booksMatch, validateBook } from '../../../globals/validations';
import { bookModel } from '../../../models/Book.model';
import { fetchBooks, updateBook } from '../../../store/actions/bookActions';

import BookDetailView from '../../../components/bookly/books/BookDetailView';
import BookEditView from '../../../components/bookly/books/BookEditView';
import RequiresAuth from '../../../components/common/hocs/RequiresAuth';

type Props = {
  authors: Author[],
  book: Book,
  createBook: Function,
  fetchBooks: Function,
  history: Object,
  updateBook: Function,
};

type State = {
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
      editableBook: bookModel.empty(),
      editing: false,
      errors: bookModel.emptyErrors(),
      formDisabled: true,
      submitDisabled: false,
      topLevelError: '',
    };

    const _this: any = this;
    _this.onAuthorChange = _this.onAuthorChange.bind(this);
    _this.onInputChange = _this.onInputChange.bind(this);
    _this.onSubmit = _this.onSubmit.bind(this);
    _this.onEditClick = _this.onEditClick.bind(this);
    _this.onCancel = _this.onCancel.bind(this);
    _this.onBackClick = _this.onBackClick.bind(this);
  }

  componentDidMount() {
    this.refreshBooks();
  }

  async refreshBooks() {
    try {
      await this.props.fetchBooks();
      if (!this.props.book.id) {
        this.props.history.push(localUrls.authorsList);
      } else {
        this.setState({
          formDisabled: false,
        });
      }
    } catch (err) {
      this.setState({
        topLevelError: parseError(err),
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

  render() {
    const {
      authors,
      book,
    } = this.props;
    const {
      editableBook,
      editing,
      errors,
      formDisabled,
      submitDisabled,
      topLevelError,
    } = this.state;

    return (
      <div>
        {!editing && (
          <BookDetailView
            book={book}
            onEditClick={this.onEditClick}
            onBackClick={this.onBackClick}
          />
        )}
        {editing && (
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
      </div>
    );
  }
}

BookDetailPage.propTypes = {
  authors: array.isRequired,
  book: shape({
    author: object,
    title: string,
  }).isRequired,
  fetchBooks: func.isRequired,
  history: object,
  updateBook: func.isRequired,
};

/* eslint-disable no-unused-vars */
const mapStateToProps = (state, ownProps) => {
  const bookID = ownProps.match.params.id;
  const book = state.books.data.find(
    (a) => a.id === bookID
  ) || bookModel.empty();

  return {
    authors: state.authors.data,
    book,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchBooks() {
    return dispatch(fetchBooks());
  },

  updateBook(book) {
    return dispatch(updateBook(book));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RequiresAuth(BookDetailPage, localUrls.login));
