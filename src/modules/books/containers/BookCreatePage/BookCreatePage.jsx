// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { array, func, object } from 'prop-types';

import type { Author } from '../../../authors/flowtypes';
import type { Book, BookErrors } from '../../flowtypes';

import { localUrls } from '../../../../globals/urls';
import { clearPreselectedAuthor, fetchAuthors } from '../../../../store/actions';
import { createBook, fetchBooks } from '../../../../store/actions';
import { buildClasses } from '../../../../globals/utils/cssHelpers';

import { bookModel } from '../../models';
import { bookHasAllFields, validateBook } from '../../validators';

import BookForm from '../../components/BookForm/BookForm';
import Card from '../../../common/components/Card/Card';
import CardList from '../../../common/components/CardList/CardList';
import RequiresAuth from '../../../common/components/hocs/RequiresAuth/RequiresAuth';

type Props = {
  authors: Author[],
  clearPreselectedAuthor: Function,
  createBook: Function,
  fetchAuthors: Function,
  fetchBooks: Function,
  history: Object,
  preselectedAuthor: Author,
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

      if (this.props.preselectedAuthor) {
        this.updateAuthor(this.props.preselectedAuthor.id);
        this.props.clearPreselectedAuthor();
      }

      this.setState({
        formDisabled: false,
      });
    } catch (err) {
      console.log('TODO: deal with this error!');
      console.log(err);
    }
  }

  updateAuthor(authorId: string) {
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

  onAuthorChange(event) {
    const authorId = event.target.value;
    this.updateAuthor(authorId);
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
      }, async() => {
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
    const {
      authors,
      preselectedAuthor,
    } = this.props;
    const {
      book,
      errors,
      formDisabled,
      submitDisabled,
      topLevelError,
    } = this.state;

    return (
      <div className={buildClasses(['create-view', 'book-create-view'])}>
        <CardList>
          <Card
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
              preselectedAuthor={preselectedAuthor}
              submitDisabled={submitDisabled}
              topLevelError={topLevelError}
            />
          </Card>
        </CardList>
      </div>
    );
  }
}

BookCreatePage.propTypes = {
  authors: array.isRequired,
  clearPreselectedAuthor: func.isRequired,
  createBook: func.isRequired,
  fetchAuthors: func.isRequired,
  fetchBooks: func.isRequired,
  history: object,
  preselectedAuthor: object,
};

/* eslint-disable no-unused-vars */
const mapStateToProps = (state, ownProps) => {
  return {
    authors: state.authors.data,
    preselectedAuthor: state.authors.preselectedAuthor,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  clearPreselectedAuthor() {
    return dispatch(clearPreselectedAuthor());
  },

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
