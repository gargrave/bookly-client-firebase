// @flow
import React, { Component } from 'react';
import { array, func, object } from 'prop-types';

import type { Author, Book, BookErrors } from '../../../../globals/flowtypes';

import { bookHasAllFields, validateBook } from '../../../../globals/validations';
import { bookModel } from '../../../../models/Book.model';
import { buildClasses } from '../../../../globals/utils/cssHelpers';

import BookForm from '../../../bookly/books/BookForm/BookForm';
import Card from '../../../common/Card/Card';
import CardList from '../../../common/CardList';

type Props = {
  authors: Author[],
  clearPreselectedAuthor: Function,
  createBook: Function,
  fetchAuthors: Function,
  fetchBooks: Function,
  onCancel: Function,
  onSuccess: Function,
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
  static propTypes = {
    authors: array.isRequired,
    clearPreselectedAuthor: func.isRequired,
    createBook: func.isRequired,
    fetchAuthors: func.isRequired,
    fetchBooks: func.isRequired,
    onCancel: func.isRequired,
    onSuccess: func.isRequired,
    preselectedAuthor: object,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      book: bookModel.empty(),
      errors: bookModel.emptyErrors(),
      formDisabled: true,
      submitDisabled: true,
      topLevelError: '',
    };

    (this: any).onStartedOnDateChange = this.onDateChange.bind(this, 'startedOn');
    (this: any).onFinishedOnDateChange = this.onDateChange.bind(this, 'finishedOn');
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

  onAuthorChange = (e: any) => {
    const authorId = e.target.value;
    this.updateAuthor(authorId);
  }

  onDateChange(name: string, value: any) {
    this.onInputChange({ target: { name, value } });
  }

  onInputChange = (e: any) => {
    const key = e.target.name;
    if (key in this.state.book) {
      const book = { ...this.state.book };
      book[key] = e.target.value;
      const submitDisabled = !bookHasAllFields(book);

      this.setState({
        book,
        submitDisabled,
      });
    }
  }

  onSubmit = async (e: any) => {
    e.preventDefault();
    const errors = validateBook(this.state.book);
    if (errors.found) {
      this.setState({ errors });
      return;
    }

    this.setState({
      errors: bookModel.emptyErrors(),
      formDisabled: true,
      topLevelError: '',
    }, async () => {
      try {
        const book = bookModel.toAPI(this.state.book);
        await this.props.createBook(book);
        this.props.onSuccess();
      } catch (err) {
        this.setState({
          formDisabled: false,
          topLevelError: err,
        });
      }
    });
  }

  render() {
    const self: any = this; // work around for nonsense Flow errors
    return (
      <div className={buildClasses(['create-view', 'book-create-view'])}>
        <CardList>
          <Card
            header={'New Book'}
            hoverable={false}
          >
            <BookForm
              authors={this.props.authors}
              book={this.state.book}
              disabled={this.state.formDisabled}
              errors={this.state.errors}
              onAuthorChange={this.onAuthorChange}
              onCancel={this.props.onCancel}
              onFinishedOnDateChange={self.onFinishedOnDateChange}
              onInputChange={this.onInputChange}
              onStartedOnDateChange={self.onStartedOnDateChange}
              onSubmit={this.onSubmit}
              preselectedAuthor={this.props.preselectedAuthor}
              submitDisabled={this.state.submitDisabled}
              topLevelError={this.state.topLevelError}
            />
          </Card>
        </CardList>
      </div>
    );
  }
}

export default BookCreatePage;
