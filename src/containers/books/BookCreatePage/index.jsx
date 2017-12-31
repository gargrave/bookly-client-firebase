// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { array, func, object } from 'prop-types';

import type { Author, Book } from '../../../constants/flowtypes';

import { localUrls } from '../../../constants/urls';
import { fetchAuthors } from '../../../store/actions/author-actions';
import { createBook, fetchBooks } from '../../../store/actions/book-actions';
import { bookModel } from '../../../models/Book.model';

import BookForm from '../../../components/bookly/books/BookForm';
import Card from '../../../components/common/Card';
import RequiresAuth from '../../../components/common/hocs/RequiresAuth';

type Props = {
  authors: Author[],
  createBook: Function,
  fetchAuthors: Function,
  fetchBooks: Function,
  history: Object,
};

type State = {
  book: Book,
  formDisabled: boolean,
};

class BookCreatePage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      book: bookModel.empty(),
      formDisabled: true,
    };

    const _this: any = this;
    _this.onAuthorChange = _this.onAuthorChange.bind(this);
    _this.onInputChange = _this.onInputChange.bind(this);
    _this.onSubmit = _this.onSubmit.bind(this);
    _this.onCancel = _this.onCancel.bind(this);
  }

  async componentDidMount() {
    try {
      await this.props.fetchAuthors();
      await this.props.fetchBooks();
      this.setState({
        formDisabled: false,
      });
    } catch (err) {
      console.log('TODO: deal with this error!');
      console.log(err);
    }
  }

  onAuthorChange(event) {
    const authorId = event.target.value;
    const author = this.props.authors.find((a) => a.id === authorId);

    if (author) {
      this.setState({
        book: Object.assign({}, this.state.book, { author }),
      });
    }
  }

  onInputChange(event) {
    const key = event.target.name;
    const book = Object.assign({}, this.state.book);

    if (key in book) {
      book[key] = event.target.value;
      this.setState({ book });
    }
  }

  async onSubmit(event) {
    event.preventDefault();
    const book = bookModel.toAPI(this.state.book);
    const tempValidate = () => {
      return !!book.title.length && !!book.authorId;
    };

    if (tempValidate()) {
      try {
        await this.props.createBook(book);
        this.props.history.push(localUrls.booksList);
      } catch (err) {
        console.log('deal with this error:');
        console.dir(err.message);
      }
    }
  }

  onCancel(event) {
    event.preventDefault();
    this.props.history.push(localUrls.booksList);
  }

  render() {
    const { authors } = this.props;
    const {
      book,
      formDisabled,
    } = this.state;

    return (
      <Card
        classes={['card--top-margin-med']}
        header={"New Book"}
        hoverable={false}
      >
        <BookForm
          authors={authors}
          book={book}
          disabled={formDisabled}
          onAuthorChange={this.onAuthorChange}
          onInputChange={this.onInputChange}
          onSubmit={this.onSubmit}
          onCancel={this.onCancel}
        />
      </Card>
    );
  }
}

BookCreatePage.propTypes = {
  authors: array.isRequired,
  createBook: func.isRequired,
  fetchAuthors: func.isRequired,
  fetchBooks: func.isRequired,
  history: object,
};

/* eslint-disable no-unused-vars */
const mapStateToProps = (state, ownProps) => {
  return {
    authors: state.authors.data,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  createBook(book) {
    return dispatch(createBook(book));
  },

  fetchAuthors() {
    return dispatch(fetchAuthors());
  },

  fetchBooks() {
    return dispatch(fetchBooks());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RequiresAuth(BookCreatePage, localUrls.login));
