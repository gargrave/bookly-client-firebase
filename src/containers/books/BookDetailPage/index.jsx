// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { array, date, func, object, shape, string } from 'prop-types';

import type { Author, Book } from '../../../constants/flowtypes';

import { localUrls } from '../../../constants/urls';
import { fetchBooks, updateBook } from '../../../store/actions/book-actions';
import { bookModel } from '../../../models/Book.model';

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
};

class BookDetailPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      editableBook: bookModel.empty(),
      editing: false,
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
    } catch (err) {
      console.log('TODO: deal with this error!');
      console.log(err);
    }
  }

  onAuthorChange(event) {
    const authorId = Number(event.target.value);
    const author = this.props.authors.find((a) => a.id === authorId);
    const editableBook = Object.assign({}, this.state.editableBook, { author });

    if (author) {
      this.setState({
        editableBook,
      });
    }
  }

  onInputChange(event) {
    const key = event.target.name;
    if (key in this.state.editableBook) {
      let editableBook = Object.assign({}, this.state.editableBook);
      editableBook[key] = event.target.value;
      this.setState({ editableBook });
    }
  }

  async onSubmit(event) {
    event.preventDefault();
    const book = bookModel.toAPI(this.state.editableBook);
    const tempValidate = () => {
      return !!book.title.length && !!book.authorId && Number.isInteger(book.authorId) && book.authorId >= 0;
    };

    if (tempValidate()) {
      try {
        await this.props.updateBook(book);
        this.setState({ editing: false });
      } catch (err) {
        console.log('deal with this error:');
        console.dir(err.message);
      }
    }
  }

  /**
   * Enables 'editing' state and sets the editable book's value
   * to the current book from the store.
   */
  onEditClick() {
    this.setState({
      editing: true,
      editableBook: Object.assign(this.props.book),
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
    const { authors } = this.props;
    const { editing } = this.state;
    return (
      <div>
        {!editing && (
          <BookDetailView
            book={this.props.book}
            onEditClick={this.onEditClick}
            onBackClick={this.onBackClick}
          />
        )}
        {editing && (
          <BookEditView
            authors={authors}
            book={this.state.editableBook}
            onAuthorChange={this.onAuthorChange}
            onInputChange={this.onInputChange}
            onSubmit={this.onSubmit}
            onCancel={this.onCancel}
          />
        )}
      </div>
    );
  }
}

BookDetailPage.propTypes = {
  authors: array.isRequired,
  book: shape({
    id: string,
    title: string,
    author: shape({
      name: string,
    }),
    createdAt: date,
    updatedAt: date,
  }),
  fetchBooks: func.isRequired,
  history: object,
  updateBook: func.isRequired,
};

/* eslint-disable no-unused-vars */
const mapStateToProps = (state, ownProps) => {
  const bookID = ownProps.match.params.id;
  const book = state.books.data.find((a) => a.id === bookID) || bookModel.empty();

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
