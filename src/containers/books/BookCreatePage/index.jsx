// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { array, func, object } from 'prop-types';

import type { Author, Book, BookErrors } from '../../../constants/flowtypes';

import { localUrls } from '../../../constants/urls';
import { bookHasAllFields, validateBook } from '../../../globals/validations';
import { bookModel } from '../../../models/Book.model';
import { fetchAuthors } from '../../../store/actions/authorActions';
import { createBook, fetchBooks } from '../../../store/actions/bookActions';

import BookForm from '../../../components/bookly/books/BookForm';
import Card from '../../../components/common/Card';
import CardList from '../../../components/common/CardList';
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
  errors: BookErrors,
  formDisabled: boolean,
  submitDisabled: boolean,
  topLevelError: string,
};

class BookCreatePage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      book: bookModel.empty(),
      errors: bookModel.emptyErrors(),
      formDisabled: true,
      submitDisabled: true,
      topLevelError: '',
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
    const book = { ...this.state.book, author };
    const submitDisabled = !bookHasAllFields(book);

    if (author) {
      this.setState({
        book,
        submitDisabled,
      });
    }
  }

  onInputChange(event) {
    const key = event.target.name;
    if (key in this.state.book) {
      const book = { ...this.state.book };
      book[key] = event.target.value;
      const submitDisabled = !bookHasAllFields(book);

      this.setState({
        book,
        submitDisabled,
      });
    }
  }

  async onSubmit(event) {
    event.preventDefault();
    const errors = validateBook(this.state.book);
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
          const book = bookModel.toAPI(this.state.book);
          await this.props.createBook(book);
          this.props.history.push(localUrls.booksList);
        } catch (err) {
          this.setState({
            formDisabled: false,
            topLevelError: err,
          });
        }
      });
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
      errors,
      formDisabled,
      submitDisabled,
      topLevelError,
    } = this.state;

    return (
      <CardList>
        <Card
          classes={['card--top-margin-med']}
          header={'New Book'}
          hoverable={false}
        >
          <BookForm
            authors={authors}
            book={book}
            disabled={formDisabled}
            errors={errors}
            onAuthorChange={this.onAuthorChange}
            onCancel={this.onCancel}
            onInputChange={this.onInputChange}
            onSubmit={this.onSubmit}
            submitDisabled={submitDisabled}
            topLevelError={topLevelError}
          />
        </Card>
      </CardList>
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
